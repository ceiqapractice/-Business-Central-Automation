const {test}=require("@playwright/test");
const { log } = require("util");
const { webActions } = require("../../main/web/commonFunctions/webActions");
const { LoginPage } = require("../../main/web/pageFunctions/LoginPage");



test.describe.configure({ mode: 'parallel' });
test("@Regression", async ({page})=>
  {
    const webActionObj =new webActions(page);
    const loginPageObj=new LoginPage(page);
    console.log("Regression Example2");
    await webActionObj.navigateToURL();
    console.log("Page navigation");
    await loginPageObj.LoginToApps();
  })

  test("@Smoke", async ({page})=>
  {
    const webActionObj =new webActions(page);
    const loginPageObj=new LoginPage(page);
    console.log("Regression Example1");
    await webActionObj.navigateToURL();
    console.log("Page navigation");
    await loginPageObj.LoginToApps();
  })