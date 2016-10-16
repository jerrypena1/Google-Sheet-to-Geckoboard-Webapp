# Google-Sheet-to-Geckoboard-Webapp
This script is an example of how easy it is to send Google Sheet data to Geckoboard using the Dataset API.

<h2>The Why</h2>
Looking at the documentation on the Geckoboard website they have examples of using Curl, Node and Ruby to make use of the Dataset API. This API is how you can manage a dataset and includes the ability to create, update and delete datasets. You can then use the datasets to visualize data using their service. Pretty sweet!

I chose to create this webapp using G Suite for a couple reasons, mainly because its super easy to setup and almost everyone has a Google account. Another reason is that I thought it would be interesting to show how easy the authentication to the Dataset API can be; if you wanted to do it yourself in any other language. 

Another reason I chose a Google Form is that it stores its responses in a Google Sheet. I could have added my script to that spreadsheet which would have allowed me to trigger my code upon form submission, but I chose not to because I wanted to show that the data could have came from anywhere. 

<h2>The How</h2>
<h4>Step 1</h4>
In my case, I started by creating a Google Form in order to capture user input. You can view the form <a href="https://docs.google.com/forms/d/e/1FAIpQLSd94Vvv8PRQfTAKkF4dTcKehbmusZBevA6A7u1h8xqdHYdvXA/viewform" target="_blank">here</a>. It's just an example, but you can use upto 10 fields when creating a dataset and each dataset can hold upto 5000 records. That's a lot of records, but keep in mind that the purpose of the service is to visualize data and not to store data. Also note that you can only send upto 500 records at a time using the Geckoboard Dataset API.

<h4>Step 2</h4>
My next step was to create a standalone webapp. By itself apps scripts give you a wonderful triggering system that allows me to run a particular function in my code at intervals. I chose to run my function every hour. This is akin to setting up a cron-job on a linux system. 

<h4>Step 3</h4>
Everything in this script is what you need to create a dataset as well as the function to send the data to Geckoboard. The last step was to create widgets in my Geckoboard dashboard using my new dataset. I created two very simple ones just to test things out, but there is a lot of power behind dashboards and widgets. 

<h2>See My Dashboard</h2>
You can see my dashboard example <a href="https://app.geckoboard.com/dashboards/DGUKGXDRVWAYKDJD" target="_blank">here</a>
