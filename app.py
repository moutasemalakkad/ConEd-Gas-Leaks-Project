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
app.config['SECRET_KEY'] = 'secret!'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/coned.sqlite"

db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

Base.prepare(db.engine, reflect=True)

# Save references to each table
coned_data = Base.classes.ConEdDB

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/gas-leaks")
def gasLeaks():
    ## Use pandas to read csv
    df = pd.read_csv("final_leaks.csv")

    # Convert the Date column to correct datetime format
    df['Date'] = pd.to_datetime(df['Date'], format = '%Y-%m-%d')

    # get the data for the full year where date = 2013
    year_data = df[df['Date'].dt.year == 2013]

    # get data for leaks per zipcode for that given year
    year_zip_data = pd.DataFrame(year_data.groupby('ZIP_CODE').sum()['TMAX'])
    year_zip_data.rename(columns = {'TMAX': 'Total Leaks'}, inplace=True)
    year_data_dict = year_zip_data.to_dict()

    # get monthly data of temperatures for given month
    monthly_temp_data = year_data[year_data['Date'].dt.month == 1]
    monthly_temp_data = monthly_temp_data[['Date', 'TMAX']]
    monthly_temp_data.groupby('Date')['TMAX'].max()
    grouped_month_temp_data = pd.DataFrame(monthly_temp_data.groupby('Date')['TMAX'].max())
    grouped_month_temp_data.rename(columns = {'TMAX': 'Temp'}, inplace=True)
    grouped_month_temp_data.reset_index(level=0, inplace=True)
    grouped_month_temp_data['Date'] = grouped_month_temp_data['Date'].astype(str)
    month_data_dict = grouped_month_temp_data.to_dict()
    final_month_dict = month_data_dict['Temp']

    final_dict = {
        "ZipData:" : year_data_dict,
        "MonthData" : final_month_dict
    }

    return jsonify(final_dict)

@app.route('/static/<path:path>')
def send_js(path):
    return send_file("build/static/" + path)


if __name__ == "__main__":
    app.run(debug=True)