const fs=require("fs")
const axios = require('axios'); 
const path = require('path');
const {testConfig}=require("./baseConfig.js")
const pwconfig=require("./playwright.config.js")
const mailer = require('nodemailer');


const webhookURL = testConfig.TeamsWebhookURL
const subject=testConfig.Project+"_Test Execution Report"
const HTMLmessage=getMessage("HTML");
const Textmessage=getMessage("TEXT");

const smtpProtocol = mailer.createTransport({
    service: testConfig.MailServiceProvider,
    auth: {
        user: testConfig.FromMailaddress,
        pass: testConfig.FromAddressPassword
    }
});

var mailoption = {
    from: testConfig.FromMailaddress,
    to: testConfig.ToMailAddress,
    subject: subject,
    html: HTMLmessage
}

function getMessage(type){
  let HTMLmessage2;
  if(fs.existsSync(path.join(process.cwd(),"./result.json"))){
    let defaultrawdata =  fs.readFileSync(path.join(process.cwd(),"./result.json"),'utf-8');
    let defaultobject= JSON.parse(defaultrawdata);
    const passedcount=Number(defaultobject.Passedcount)
    const failedcount=Number(defaultobject.Failedcount)
    const Totalcount=Number(defaultobject.Passedcount)+Number(defaultobject.Failedcount)
    const Passpercentage=(passedcount/Totalcount*100).toFixed(2)
    const Failpercentage=(failedcount/Totalcount*100).toFixed(2)
    if(type=="HTML"){
    if(pwconfig.reporter!=undefined){
      const reporterarray=pwconfig.reporter;
      for(let i=0;i<reporterarray.length;i++){
          const insidearray=reporterarray[i];
          const reportname=insidearray[0]
          if(reportname=="allure-playwright"){
           HTMLmessage2="<html>"+"<style>table{position: absolute;z-index: 2;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 100%;"+
            "border-collapse: collapse;border-spacing: 0;box-shadow: 0 2px 15px rgba(64,64,64,.7);border-radius: 12px 12px 0 0; overflow: hidden;}"+
            "td , th{padding: 15px 20px;text-align: center;}"+"th{background-color: #271980;font-size:12;color: #f0f0f2;font-family: 'Open Sans',Sans-serif;font-weight: 200;text-transform: uppercase;}"+
            "tr{width: 100%;background-color: #bedafa;font-size:12;font-family: 'Montserrat', sans-serif;}"+"tr:nth-child(even){background-color: #eeeeee;}"
            +"</style>"+"<body><p>Hi Team, <br><br>Test Execution for the project " +testConfig.Project+" is conducted in " +testConfig.Env+ 
            " Environment and its succesfully completed.<br>PFB the link and data table for the Test Execution Status.<br></p>" +
            "<p> Link : " +testConfig.Githubreportlink+ "<br>"+
            "<table><tr><th>Total Number of Test Cases Executed</th> <th>Total Number of Test Cases Passed</th>  <th> Total Number of Test Cases Failed</th> <th>Test Cases Pass Percentage</th> <th>Test Cases Fail Percentage</th></tr>"+
            "<tr><td ALIGN=CENTER>"+Totalcount+"</td><td ALIGN=CENTER>"+passedcount+"</td><td ALIGN=CENTER>"+failedcount+"</td><td ALIGN=CENTER>"+Passpercentage+"</td><td ALIGN=CENTER>"+Failpercentage+"</td></tr></table></body></html>"
              break;
          }
          else{
            HTMLmessage2="<html>"+"<style>table{position: absolute;z-index: 2;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 100%;"+
            "border-collapse: collapse;border-spacing: 0;box-shadow: 0 2px 15px rgba(64,64,64,.7);border-radius: 12px 12px 0 0; overflow: hidden;}"+
            "td , th{padding: 15px 20px;text-align: center;}"+"th{background-color: #271980;font-size:12;color: #f0f0f2;font-family: 'Open Sans',Sans-serif;font-weight: 200;text-transform: uppercase;}"+
            "tr{width: 100%;background-color: #bedafa;font-size:12;font-family: 'Montserrat', sans-serif;}"+"tr:nth-child(even){background-color: #eeeeee;}"
            +"</style>"+"<body><p>Hi Team, <br><br>Test Execution for the project " +testConfig.Project+" is conducted in " +testConfig.Env+ 
            " Environment and its succesfully completed.<br>PFB the data table for the Test Execution Status.<br></p>" +
            "<table><tr><th>Total Number of Test Cases Executed</th> <th>Total Number of Test Cases Passed</th>  <th> Total Number of Test Cases Failed</th> <th>Test Cases Pass Percentage</th> <th>Test Cases Fail Percentage</th></tr>"+
            "<tr><td ALIGN=CENTER>"+Totalcount+"</td><td ALIGN=CENTER>"+defaultobject.Passedcount+"</td><td ALIGN=CENTER>"+defaultobject.Failedcount+"</td><td ALIGN=CENTER>"+Passpercentage+"</td><td ALIGN=CENTER>"+Failpercentage+"</td></tr></table></body></html>"
          }
      }
  }
  else{
      console.log("Reporter is not defined in the configuration")    
}return HTMLmessage2;  
}
if(type="TEXT"){
  const Textmessage="Hi Team,"+
  "\n Test Execution for the project " +testConfig.Project+" is conducted in " +testConfig.Env+ " Environment and its succesfully completed."+
  "\nPFB the link and data for the Test Execution Report."+
  "\n Link :" +testConfig.Githubreportlink+ "\n" +
  "Total Number of Test Cases Executed : " +Totalcount+ "\n"+
  "Total Number of test cases Passed : " +passedcount+ "\n"+
  "Total Number of test cases Failed : " +failedcount+ "\n"+
  "Test cases Pass Percentage : " +Passpercentage+ "\n"+
  "Test cases Fail Percentage : " +Failpercentage+ "\n"
  return Textmessage;
}
}}

async function mailsender(){
    return new Promise((resolve,reject) =>smtpProtocol.sendMail(mailoption, function(err, response){
      if(err) {
          console.log(err);
          reject("Promise Rejected")
      } 
      console.log('Message Sent' + response.message);
      smtpProtocol.close();
      resolve("Promise Resolved")
  }))
}

async function postMessageToTeams(){
    const card = {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      "themeColor": "0072C6",
      "summary": "Summary description",
      "sections": [
        {
          "activityTitle": subject,
          "text": Textmessage
        }
      ]
    };

    try {
      const response = await axios.post(webhookURL, card, {
        headers: {
          'content-type': 'application/vnd.microsoft.teams.card.o365connector'
        },
      });
      return `${response.status} - ${response.statusText}`;
    } catch (err) {
      console.log(err)
      return err;
    }
  }


async function mailSend(){
  await new Promise(resolve => setTimeout(resolve, 10000));
    if(testConfig.MailNotification.toLocaleLowerCase()=="yes"){
      await mailsender()}
    if(testConfig.TeamsNotification.toLocaleLowerCase()=="yes"){
      await postMessageToTeams()
    }
}

 export default mailSend;
