const { dataHandler } = require("../../../Helpers/dataHandler");
const { locatorFinder } = require("../../../Helpers/locatorFinder");
const { webActions } = require("../commonFunctions/webActions");



//Login page functionality test
class LoginPage{
    constructor(page) 
    {
        this.page = page;
        this.webActionsObj=new webActions(page);
    }  
    async LoginToApps()
    {
        let DataHandlertest=new dataHandler("LoginPage","web");
        let LocatorFinderObj= new locatorFinder("LoginPage",this.page);
        await this.webActionsObj.enterText(await LocatorFinderObj.getelement("email"),DataHandlertest.logindata.Username);
        await this.webActionsObj.clickElement(await LocatorFinderObj.getelement("submit"));
        await this.webActionsObj.enterText(await LocatorFinderObj.getelement("password"),DataHandlertest.logindata.Password);
        await this.webActionsObj.clickElement(await LocatorFinderObj.getelement("submit"));
        await this.webActionsObj.clickElement(await LocatorFinderObj.getelement("Yes"));
    }
}
module.exports={LoginPage}