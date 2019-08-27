import sqlalchemy
import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, inspect
from sqlalchemy.orm import Session, Mapper
from sqlalchemy import create_engine
import numpy as np
from flask_sqlalchemy import SQLAlchemy
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

# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
coned_data = Base.classes.ConEdDB

@app.route('/')
def index():
    return render_template('index.html')


@app.route("/api/gas-leaks")
def gasLeaks():
    ## Use pandas to read csv
    df = pd.read_csv("final_leaks.csv")

    ## Convert the Date column to correct datetime format
    df['Date'] = pd.to_datetime(df['Date'], format = '%Y-%m-%d')

    # ## get the data for the full year where date = 2013
    # year_data = df[df['Date'].dt.year == 2013]

    # ## get data for leaks per zipcode for that given year
    # year_zip_data = pd.DataFrame(year_data.groupby('ZIP_CODE').sum()['TMAX'])
    # year_zip_data.rename(columns = {'TMAX': 'Total_Leaks'}, inplace=True)
    # year_data_dict = year_zip_data.to_dict()

    # # set variable for monthly data
    # monthly_data = year_data[year_data['Date'].dt.month == 1]
    # ## get monthly data of temperatures for given month
    # ## test to see if it filters out by month. 1 = January
    # ## monthly_temp_data = year_data[year_data['Date'].dt.month == 1]
    # monthly_temp_data = monthly_data[['Date', 'TMAX']]
    # monthly_temp_data.groupby('Date')['TMAX'].max()
    # ## put grouped data into its on DF
    # grouped_month_temp_data = pd.DataFrame(monthly_temp_data.groupby('Date')['TMAX'].max())
    # ## rename columns, then reset eindex
    # grouped_month_temp_data.rename(columns = {'TMAX': 'Temp'}, inplace=True)
    # grouped_month_temp_data.reset_index(level=0, inplace=True)
    # ## needed to change date to string because jsonify does not support datetime values
    # grouped_month_temp_data['Date'] = grouped_month_temp_data['Date'].astype(str)
    # ## made the keys for the days of the month start at 1 instead of 0
    # grouped_month_temp_data.index = np.arange(1,len(grouped_month_temp_data)+1)
    # ## converted DF to dictionary 
    # month_data_dict = grouped_month_temp_data.to_dict()
    # ## Accessed the data
    # final_month_dict = month_data_dict['Temp']

    # ## get monthly data of leak counts per day for given month
    # monthly_leaks = pd.DataFrame(monthly_data.groupby('Date')['TMAX'].count())
    # monthly_leaks.rename(columns = {'TMAX': 'Number_of_Leaks'}, inplace=True)
    # monthly_leaks.reset_index(level=0, inplace=True)
    # monthly_leaks['Date'] = monthly_leaks['Date'].ast`ype(str)
    # monthly_leaks.index = np.arange(1,len(monthly_leaks)+1)
    # monthly_leaks_dict = monthly_leaks.to_dict()
    # final_monthly_leaks_dict = monthly_leaks_dict['Number_of_Leaks']


    # # Place the dictionaries from above into final dictionary to respond to API request
    # final_dict = {
    #     "ZipData:" : year_data_dict,
    #     "TempData" : final_month_dict,
    #     "MonthlyLeaks" : final_monthly_leaks_dict
    # }

    leaks_dict = {}
    for i in range(6):
        wh_year = 2013+i
        year_data = df[df['Date'].dt.year == wh_year]
        
        ## get data for leaks per zipcode for that given year
        year_zip_data = pd.DataFrame(year_data.groupby('ZIP_CODE').sum()['TMAX'])
        year_zip_data.rename(columns = {'TMAX': 'Total_Leaks'}, inplace=True)
    #     print(i)
    #     print(year_zip_data.head())
        year_zip_data.reset_index(inplace=True)
        json = year_zip_data.to_json(orient='records')
        leaks_dict[wh_year] = json

    return jsonify(leaks_dict)


@app.route('/static/<path:path>')
def send_js(path):
    return send_file("build/static/" + path)


if __name__ == "__main__":
    app.run(debug=True)