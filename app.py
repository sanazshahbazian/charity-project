from flask import Flask, render_template
import datetime
import json

# Import our pymongo library, which lets us connect to our mongo DB
import pymongo

# Create an instance of our Flask app 
app = Flask(__name__)

# Create connection variable
conn = 'mongodb+srv://falcon2020:Falcon20@charity-cluster-homax.azure.mongodb.net/test?retryWrites=true&w=majority'

# Pass connection to the pymongo instance
client = pymongo.MongoClient(conn)

# Connect to the database
db = client.charity_orgs

def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

# Set routes
## Route for Homepage
@app.route('/')
def index():
    # # Store the entire charity collection in a list 
    # index = list(db.main_info.find({}))

    # Return the template with the charities list passed in 
    return render_template('index.html')

## Route for Charity Details Page
@app.route('/charity-details.html')
def charity_details():
    # Store the entire charity collection in a list 
    charity_details = list(db.charity_data.find({},{"_id":0, "name":1, "category":1, "subcategory":1, "state":1, "motto":1}))

    clean_charity_details = [{key.strip(): str(item).strip() for key, item in row.items()} for row in charity_details]

    # Return the template with the charities list passed in 
    return render_template('charity-details.html', charity_details=json.dumps(clean_charity_details))

## Route for Expense Details Page
@app.route('/expense-details.html')
def total_expenses():
    # Store the organizations' financial info in a list
    total_expenses = list(db.charity_data.find({},{'_id': 0,'size':1, 'name':1,'total_expenses':1, 'program_expenses':1,'fundraising_expenses':1,'administrative_expenses':1,'total_revenue':1,'ceo_compensation':1, 'category':1, 'ceo': 1, 'fund_eff':1, 'score':1, 'financial_score':1, 'accountability_score':1}))

    clean_total_expenses = [{key.strip(): str(item).strip() for key, item in row.items()} for row in total_expenses]

    # Return the template with the charities list passed in 
    return render_template('expense-details.html', total_expenses=json.dumps(clean_total_expenses))

## Route for US Charity Info Page
@app.route('/us-charity-info.html')
def us_info():
    # Store the entire charity collection in a list 
    us_info = list(db.charity_data.find({},{'_id': 0,'name':1,'state':1, 'size':1,'category':1,'score':1}))

    # Return the template with the charities list passed in 
    return render_template('us-charity-info.html', us_info=json.dumps(us_info))
    
if __name__=="__main__":
    app.run(debug=True)
