# Charity Project

by Samir Sundar, Jade Guo, Jennie Chang, Sanaz Shahbazian, Jack Oremus

## Project Overview

<p align="center">
  <img width="760" height="200" src="readmeimages/charitynavigator.png">
</p>


Our goal: Build a website to improve charity transparency through visualizations. We want donors to make informed decisions so they can have confidence in the charities of their choice.
- Composed of four pages
  * Main Page
  * Charity Navigation Table 
  * Charity Financial Information
  * National Charity Distribution and Variety of Ratings

## EXTRACT
Data Sources found on Kaggle:
- Charity Navigator Scores Expenses Dataset by Katy Qian
  
Dataset was in CSV format. Webscraped in 2019 with rating details from 2017. API had numerous nested objects/issues.

## TRANSFORM - What data cleaning/transformation was required?
- Cleaning
   - Excluded charities without ratings.
   - Renamed columns involving expenses, percentages, and ambiguous "scores".
   >  Includes: "tot_exp", "admin_exp_p", "fund_exp_p", "program_exp_p", "leader_comp", "leader_compensation_percentage",                       "program_exp", "fund_exp","admin_exp", "ascore","fscore", "tot_rev", "leader"
   - Dropped "description" column to cut down file size by over 50%.
   - Note that the csv was composed of objects and float64 dtypes.
   - No joining required because of single csv.
  
   

## LOAD
 - Load the final table to Mongo Atlas DB - ready for connection to our Flask app.py.
 
## HOME PAGE
 - This shows the landing page of our site.
 - Introduces what the project is about, the mission, Oprah, and our team.
 
 <p align="center">
 <img src="readmeimages/index.gif" width="900" height="550" />
 </p>
 
## CHARITY DETAILS
 - Allows users to browse a table with the complete database of charities. 
 - Filter options available for name, cause, and state.
 - Gives description of charity name, cause, subcategory, state, and mission statement.
 
 <p align="center">
 <img src="readmeimages/charitydetails.gif" width="900" height="550" />
 </p>
 
## FINANCIAL DASHBOARD
 - Bubble chart allows users to see what charities are fundraising the most efficiently.
 - Tool tip shows organization name, organization size, total contributions, total expenses, financial score, accountability score, and total score.
 - Hover over category to see bubble distribution among charities in that category vs rest.
 - Charity financial tool gives a dropdown of all charities in database.
 - Shows breakdown of total revenue, breakdown of total expenses, and ceo compensation.
 
 <p align="center">
 <img src="readmeimages/financialdashboard.gif" width="900" height="550" />
 </p>
 
## US CHARITY INFO
 - Shows the distribution of charities across the United States. 
 - Allows users to see how many charities exist within a state of interest.
 - Average Score per Cause Category shows overall scores for categories. Gives general idea of charity types-encourages further exploration.
 
 <p align="center">
  <img width="900" height="550" src="readmeimages/uscharityinfo.gif">
</p>
 
## Sources
  - "How To Check Out A Charity Before Giving" by William P. Barrett (https://www.forbes.com/sites/williampbarrett/2018/12/11/charities-to-donate/#2937d7d76f29)
 
