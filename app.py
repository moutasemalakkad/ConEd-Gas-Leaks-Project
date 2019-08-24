import sqlalchemy
import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, inspect
from sqlalchemy.orm import Session, Mapper
from sqlalchemy import create_engine
from flask import render_template, Flask,url_for, send_from_directory, send_file, jsonify
from flask_sqlalchemy import SQLAlchemy
import pandas as pd


# Initilaize an instance
app = Flask(__name__, template_folder="build", static_url_path='/build')

# Database Setup
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/coned.sqlite"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# Base = declarative_base()

# class ConEd(Base):
#     __tablename__ = 'ConEdDB'

#     index = Column(Integer, primary_key=True)
#     borough_desc = Column(String)

# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
coned_data = Base.classes.ConEdDB

@app.route('/')
def index():

    # url =url_for('static', filename ='App.jsx')

    return render_template('index.html')
    # return 'Hi'

@app.route("/api/gas-leaks")
def gasLeaks():
    ## Use pandas to read csv
    df = pd.read_csv("final_leaks.csv")

    # Convert the Date column to correct datetime format
    df['Date'] = pd.to_datetime(df['Date'], format = '%Y-%m-%d')

    # get the data for the full year where date = 2013
    year_data = df[df['Date'].dt.year == 2013]
    year_data_zip = pd.DataFrame(year_data.groupby('ZIP_CODE').sum()['TMAX'])
    year_data_zip.rename(columns = {'TMAX': 'Total Leaks'}, inplace=True)
    year_data_dict = year_data_zip.to_dict()

    return jsonify(year_data_dict)

    # sel = [
    #     coned_data.Date,
    #     coned_data.TMAX,
    # ]
    # results = db.session.query(*sel).all()
   
    # data = {}
    # for result in results:
    #     data["Date"] = result[0]
    #     data["TMAX"] = result[1]

    # return jsonify(data)
    

@app.route('/static/<path:path>')
def send_js(path):
    return send_file("build/static/" + path)


if __name__ == "__main__":
    app.run(debug=True)