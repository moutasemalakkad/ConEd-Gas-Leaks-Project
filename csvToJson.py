import csv 
import json
import pandas as pd
# csvfile = open('data.csv', 'r')
# jsonfile = open('data.json', 'w')

# fieldnames = (IM_INCIDENT_KEY,FIRE_BOX,INCIDENT_TYPE_DESC,INCIDENT_DATE_TIME,ARRIVAL_DATE_TIME,UNITS_ONSCENE,LAST_UNIT_CLEARED_DATE_TIME,HIGHEST_LEVEL_DESC,TOTAL_INCIDENT_DURATION,ACTION_TAKEN1_DESC,ACTION_TAKEN2_DESC,ACTION_TAKEN3_DESC,PROPERTY_USE_DESC,STREET_HIGHWAY,ZIP_CODE,BOROUGH_DESC,FLOOR,CO_DETECTOR_PRESENT_DESC,FIRE_ORIGIN_BELOW_GRADE_FLAG,STORY_FIRE_ORIGIN_COUNT,FIRE_SPREAD_DESC,DETECTOR_PRESENCE_DESC,AES_PRESENCE_DESC,STANDPIPE_SYS_PRESENT_FLAG)
# reader = csv.DictReader( csvfile, fieldnames)
# for row in reader:
#     json.dump(row, jsonfile)
#     jsonfile.write('\n')

df_data = pd.read_csv('data.csv')
print(df_data.columns)
df_data_select = df_data[['INCIDENT_DATE_TIME', 'ZIP_CODE', 'BOROUGH_DESC']]
df_data_select.to_json('this_is_json.json')
print()