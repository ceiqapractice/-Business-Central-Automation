var date = new Date();
var vccd =date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2);
const testConfig=
    {
        "Project":"Demo Project",
        //"dev": "https://colorlib.com/etc/regform/colorlib-regform-36/",
        "dev": "https://businesscentral.dynamics.com/5efe0d44-cf27-4653-9fab-7da5c5e002a7/sandbox",
        "username": "dganesh@ceiamerica.com ",
        "password": "Ganesh@12345",
        "baseURL":"https://www.ceiamerica.com/",
        "visualComparisonDate":"20220902135418",
        "linksToSkip":["https://www.facebook.com","https://twitter.com","https://www.linkedin.com","https://www.ceiamerica.com/wp","https://share.hsforms.com/","https://js.hs-scripts.com/","https://fonts.googleapis.com/","https://www.googletagmanager.com/"],
        "Env":"",
        "Language":"",
        "elementFinderURL":"https://colorlib.com/etc/regform/colorlib-regform-36/",
        //Mail COnfigurations
        "FromMailaddress":"gowthams6453@gmail.com",
        "FromAddressPassword":"etoitjehexyxbmos",
        "ToMailAddress":["gothamraj008@gmail.com","sgowtham@ceiamerica.com","skanimozhi@ceiamerica.com","dganesh@ceiamerica.com"],
        "TeamsWebhookURL":"https://computerenterprisesinc.webhook.office.com/webhookb2/ca7777fa-cd29-499c-b414-3036f3556b35@55e374bf-374e-49de-a716-836ce6f714d1/IncomingWebhook/810c85f546444fca8999b16e5ea807d2/7eaa33cc-ffc8-466e-a993-3569b00afe67",
        "MailServiceProvider":"Gmail",
        "MailNotification":"yes",
        "TeamsNotification":"yes",
        "Githubreportlink":"https://ceiqapractice.github.io/FORTE/32/"
    }
    module.exports={testConfig}