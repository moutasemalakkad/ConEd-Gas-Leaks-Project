import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine



# Initilaize an instance
app = Flask(__name__)



# Database Setup
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/coned.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()


# reflect the tables
Base.prepare(db.engine, reflect=True)



# Save references to each table
coned_data = Base.classes.sample_metadata


@app.route("/")
def index():