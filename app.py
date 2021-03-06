import sqlalchemy
import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, inspect
from sqlalchemy.orm import Session, Mapper
from sqlalchemy import create_engine


# <<<<<<< HEA
from flask_sqlalchemy import SQLAlchemy

# =======
from flask import render_template, Flask,url_for, send_from_directory, send_file, jsonify
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
# <<<<<<< HEAD
# from wtforms import StringField, PasswordField, BooleanField
# from wtforms.validators import InputRequired, Email, Length
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

# =======
# >>>>>>> 9f1bd067bc7e709914f0574e14cd7344b22d2f29
# >>>>>>> ad254cd25d9abbbe405cb5704f151bae0a3b457d


# Initilaize an instance
app = Flask(__name__, template_folder="build", static_url_path='/build')

# Database Setup
app.config['SECRET_KEY'] = 'Thisissupposedtobesecret!'
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
    



#login
# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'login'

# class User(UserMixin, db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(15), unique=True)
#     email = db.Column(db.String(50), unique=True)
#     password = db.Column(db.String(80))

# class LoginForm(FlaskForm):
#     username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
#     password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])
#     remember = BooleanField('remember me')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if check_password_hash(user.password, form.password.data):
                login_user(user, remember=form.remember.data)
                return redirect(url_for('dashboard'))

        return '<h1>Invalid username or password</h1>'
        #return '<h1>' + form.username.data + ' ' + form.password.data + '</h1>'

    return render_template('login.html', form=form)



@app.route('/logged-out')
# @login_required
def logout():
    logout_user()
    return redirect(url_for('index'))






@app.route('/static/<path:path>')
def send_js(path):
    return send_file("build/static/" + path)


if __name__ == "__main__":
    app.run(debug=True)