const {test}=require("@playwright/test");
const { log } = require("util");
const { webActions } = require("../../main/web/commonFunctions/webActions");
const { LoginPage } = require("../../main/web/pageFunctions/LoginPage");


//test.describe.configure({mode: 'parallel'});
test("Test 6 -> @Regression", async ({page})=>
  {
    const webActionObj =new webActions(page);
    const loginPageObj=new LoginPage(page);
    console.log("Regression Example1");
    await webActionObj.navigateToURL();
    console.log("Page navigation");
    await loginPageObj.LoginToApps();
  })
  
  test("Test 1 -> @Smoke", async ({page})=>
  {
    const webActionObj =new webActions(page);
    const loginPageObj=new LoginPage(page);
    console.log("Regression Example2");
    await webActionObj.navigateToURL();
    console.log("Page navigation");
    await loginPageObj.LoginToApps();
  })
  test("Test 2 ->  @Smoke", async ({page})=>
  {
    const webActionObj =new webActions(page);
    const loginPageObj=new LoginPage(page);
    console.log("Regression Example3");
    await webActionObj.navigateToURL();
    console.log("Page navigation");
    await loginPageObj.LoginToApps();
  })
  
  test("Test 3 -> @Smoke", async ({page})=>
  {
    const webActionObj =new webActions(page);
    const loginPageObj=new LoginPage(page);
    console.log("Regression Example4");
    await webActionObj.navigateToURL();
    console.log("Page navigation");
    await loginPageObj.LoginToApps();
  })
  test("Test 4 -> @Smoke", async ({page})=>
  {
    const webActionObj =new webActions(page);
    const loginPageObj=new LoginPage(page);
    console.log("Regression Example5");
    await webActionObj.navigateToURL();
    console.log("Page navigation");
    await loginPageObj.LoginToApps();
  })
  test("Test 5 -> @Smoke", async ({page})=>
  {
    const webActionObj =new webActions(page);
    const loginPageObj=new LoginPage(page);
    console.log("Regression Example5");
    await webActionObj.navigateToURL();
    console.log("Page navigation");
    await loginPageObj.LoginToApps();
  })