import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, inspect
from sqlalchemy.orm import Session, Mapper
from sqlalchemy import create_engine
from flask import render_template, Flask,url_for, send_from_directory, send_file
from flask_sqlalchemy import SQLAlchemy


# Initilaize an instance
app = Flask(__name__, template_folder="build", static_url_path='/build')

# Database Setup
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/coned.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# reflect an existing database into a new model
# Base = automap_base()
Base = declarative_base()

class ConEd(Base):
    __tablename__ = 'ConEdDB'

    index = Column(Integer, primary_key=True)
    borough_desc = Column(String)

# reflect the tables
# Base.prepare(db.engine, reflect=True)

# Save references to each table

@app.route('/')
def index():

    # url =url_for('static', filename ='App.jsx')

    return render_template('index.html')
    # return 'Hi'

@app.route("/api/gas-leaks")
def gasLeaks():
    # test = db.session.query(ConEd).all()
    return "hello"

@app.route('/static/<path:path>')
def send_js(path):
    return send_file("build/static/" + path)


if __name__ == "__main__":
    app.run()