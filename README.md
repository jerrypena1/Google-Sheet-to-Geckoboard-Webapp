# Google-Sheet-to-Geckoboard-Webapp
This is an example of how easy it is to send Google Sheet data to Geckoboard using their Dataset API.

Looking at the documentation on the Geckoboard website they have examples of using Curl, Node and Ruby to make use of the Dataset API. 

This API is how you can manage a dataset and includes the ability to create, update and delete datasets. You can then use the datasets to visualize data using their service. Pretty sweet!

I chose to create this webapp using G Suite for a couple reasons, mainly because its super easy to setup and almost everyone has a Google account. Another reason is that I thought it would be interesting to show how easy the authentication to the Dataset API can be; if you wanted to do it yourself in any other language. 

In my case, I started by creating a Google Form in order to capture user input. You can view the form here. It's just an example, but you can use upto 10 fields when creating a dataset and each dataset can hold upto 5000 records. That's a lot of records, but keep in mind that the purpose of the service is to visualize data and not to store data. 

Another reason I chose a Google Form is that it stores its responses in a Google Sheet. I could have added my script to that spreadsheet which would have allowed me to trigger my code upon form submission, but I chose not to because I wanted to show that the data could have came from anywhere. 

My next step was to create a standalone webapp. By itself apps scripts give you a wonderful triggering system that allows me to run a particular function in my code at intervals. I chose to run my function every hour. This is akin to setting up a cron-job on a linux system. 
