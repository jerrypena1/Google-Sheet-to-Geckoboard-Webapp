/*
 This is the heart of the code and is a Javascript object that helps to abstract much of the communication 
 needed to use the Dataset API. 
 
 You'll notice that after I declare the Geckobaord object I then create an instance of the Geckoboard object 
 at the end and storing it in a global variable called gb. The only thing you really need to do here is to 
 put in your API Key which you can find from the Account Details page on the Geckoboard website and the name 
 of the dataset you want to use. This is just raw code here, but in my working example I used a dataset name 
 of 'team.interest'. Since you can have more than one dataset, this makes it easy to know what type of data 
 is being used. 
*/

var Geckoboard = function(apiKey, datasetName) {
  var urlBase = 'https://api.geckoboard.com/datasets/';
  var headers = {
    'Authorization': "Basic " + Utilities.base64Encode(apiKey + ':')
  };
  var params = function (method) {
    return { "method":method, "headers":headers, "contentType":'application/json' };
  };
  this.createDataset = function(myDataset) {
    var newParams = params('put');
    newParams.payload = JSON.stringify(myDataset);
    return UrlFetchApp.fetch(urlBase + datasetName, newParams);
  };
  this.sendData = function(myData) {
    var newParams = params('put');
    newParams.payload = JSON.stringify(myData);
    Logger.log(newParams);
    return UrlFetchApp.fetch(urlBase + datasetName + '/data', newParams);
  };
};
var gb = new Geckoboard('YOURAPIKEYFROMGECKOBOARD', 'YOURDATASETNAME'); // YOU MUST UPDATE THIS CALL WITH YOUR INFO


/*
 This function only needs to be run once manually to get things going, so there is no need to trigger this 
 function to run at intervals like the next/last function in this example. In the Apps Script code editor 
 just choose this function from the Run dropdown list to run it. Once it completes choose View>Logs in order 
 to make sure it ran without errors. 
 
 The first time you run this script it will ask you for permission to connect to Geckoboard as a data source. 
 
 This function is what sets up the dataset schema/structure. The example below matches the records in the 
 Google Sheet that is coming from my Google Form, so you MUST change the fields and unique_by to 
 match your Google Sheet. The field types you have to pick from are: 
 * date (YYYY-MM-DD)
 * datetime (YYYY-MM-DDThh:mm:ssTZD) aka ISO 8601
 * number 
 * percentage (0 to 1)
 * string (limited to 100 characters only)
 * money (1000 = $10.00 if currency_code = USD) see ISO 4217 for currency codes
 
 The Dataset API requires JSON, but when using this script its being taken care of by our Geckoboard object 
 above. That means when setting up your fields, just make it a javascript object and it will get turned into 
 JSON when the Geckoboard object sends the request. 

 The last block of code in this function will let you view the response you are getting back from the Geckoboard 
 server in the editor logs (View>logs). Great for troubleshooting.
*/

function createDataset() {
  var myDataset = {
    fields: {
      timestamp: { type: 'datetime', name: 'Timestamp' },
      name: { type: 'string', name: 'Name' },
      email: { type: 'string', name: 'Email' },
      reason: { type: 'string', name: 'Reason' },
      location: { type: 'string', name: 'Location' }
    }, 
    unique_by: ['timestamp']
  };
  var response = gb.createDataset(myDataset)

  Utilities.sleep(1000);
  var html = response.getContentText();
  var responseCode = response.getResponseCode();
  var headers = response.getAllHeaders();
  Logger.log(responseCode);
  Logger.log(html); 
  Logger.log(headers);
}


/*
 Just like the previous function, you MUST modify this function to match your Google Sheet. There is also a great 
 example of turning the timestamps that Google generates into datetime fields that Gechoboard datasets use. 
 
 You also MUST modify the Google Sheet ID and Google Sheet name (the name of the tab at the bottom of your spreadsheet) 
 in order to link up to your Google Sheet. This is part of the Google Sheet API. 
 
 The first time you run this function, do it manually as it will ask you for permission to access the Google Sheet. 
 
 One thing to note is that since this example code is just a test, everytime this function is run ALL of the records 
 in my Google Sheet are being sent to the Geckoboard server. There is a 500 record limit when sending records to a
 dataset, so you would need to account for this in your implementation of this script. 
 
 Another thing to note is that I'm using the PUT method to send this data via the Dataset API which replaces all 
 the data in my dataset each time I run this function. In order to append/update records you simply need to change 
 the request to a POST instead of a PUT. You can do this on line 27 of this code.  

 The last block of code in this function will let you view the response you are getting back from the Geckoboard 
 server in the editor logs (View>logs) if you run the function manually. Great for troubleshooting as well.
*/

function sendToDataset() {
  var teamInterestData = SpreadsheetApp.openById('YOURGOOGLESHEETID').getSheetByName("YOURGOOGLESHEETNAME").getDataRange().getValues();
  var max = teamInterestData.length;
  var myDataset = { data: [] };
  for (var i = 1; i < max; i++ ) {
    myDataset.data.push({
      'timestamp': (new Date(teamInterestData[i][0])).toISOString(),
      'name': teamInterestData[i][1].substr(0,100),
      'email': teamInterestData[i][2].substr(0,100),
      'reason': teamInterestData[i][3].substr(0,100),
      'location': teamInterestData[i][4].substr(0,100)
    });
  }
  var response = gb.sendData(myDataset);
  
  Utilities.sleep(1000);
  var html = response.getContentText();
  var responseCode = response.getResponseCode();
  var headers = response.getAllHeaders();
  Logger.log(responseCode);
  Logger.log(html); 
  Logger.log(headers);
}
