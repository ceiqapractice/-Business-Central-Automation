const {test, expect}=require("@playwright/test");
const { log } = require("util");
const { dataHandler } = require("../../Helpers/dataHandler");
const { webActions } = require("../../main/web/commonFunctions/webActions");
const { LoginPage } = require("../../main/web/pageFunctions/LoginPage");



//test.describe.configure({mode: 'parallel'});
let CustomerNo;
test("Test 1 -> @Create", async ({page})=>
  {
    const webActionObj =new webActions(page);
    await webActionObj.navigateToURL();
    let DataHandlertest=new dataHandler("CustomerCreation","web");

    //Login
    await webActionObj.enterText("//*[@type='email']","dganesh@CRMbc647947.onmicrosoft.com")
    await webActionObj.clickElement("//*[@type='submit']");
    await webActionObj.enterText("//*[@type='password']","Xag30915")
    await webActionObj.clickElement("//*[@type='submit']");
    await webActionObj.clickElement("//*[@id='idBtn_Back']");

    //Customer Creation
    const topframe =page.frameLocator("//iframe[@title='Main Content']")
    await topframe.locator("//button[normalize-space()='Customers']").click();
    await topframe.locator("//button[normalize-space()='New']").click();
    await topframe.locator("//button[normalize-space()='OK']").click();
    await topframe.locator("//div[@controlname='Name']//input").fill(DataHandlertest.getdata().CustomerName);
    await topframe.locator("//div[@controlname='Address']//input").fill(DataHandlertest.getdata().CustomerAddress);
    await topframe.locator("//div[@controlname='Phone No.']//input").fill(DataHandlertest.getdata().CustomerPhone);
    await topframe.locator("//a[text()='Email']/parent::div/div/input").fill(DataHandlertest.getdata().CustomerEmail);
    await topframe.locator("//a[text()='State']/parent::div/div/input").fill(DataHandlertest.getdata().CustomerState);
    CustomerNo= await topframe.locator("//div[@controlname='No.']//input").inputValue();
    await webActionObj.sleep(2000);
    await topframe.locator("//span[@aria-label='More options']").click();
    await topframe.locator("//span[@aria-label='Related']").click();
    await topframe.locator("//div[normalize-space()='Customer']").click();
    await topframe.locator("//div[normalize-space()='Homologations']/parent::div/div").click();
    await topframe.locator("//td[@controlname='Item category code']//input").fill(DataHandlertest.getdata().CustomerItemCate);
    await topframe.locator("//td[@controlname='Expiration date']//input").fill(DataHandlertest.getdata().ItemExpiryDate);
    await webActionObj.sleep(2000);
    await topframe.locator("(//i[@data-icon-name='Back'])[2]").click();
    await webActionObj.sleep(3000);
    await topframe.locator("//i[@data-icon-name='Back']").click();

    //Customer Edit Code

   /* await topframe.locator("//i[@data-icon-name='Search']").click();
    await topframe.locator("//input[@aria-label='Search Customers']").fill(CustomerNo);
    await webActionObj.sleep(2000);
    await topframe.locator("//a[@title='Show more options']").click();
    await webActionObj.sleep(5000);
    await topframe.locator("//span[normalize-space()='Edit']").click();
    await webActionObj.sleep(2000);
    await topframe.locator("//div[@controlname='Name']//input").fill("Update Name");
    await webActionObj.sleep(2000);
    await topframe.locator("//i[@data-icon-name='Back']").click();
    await webActionObj.sleep(2000);  */



    //Customer Deletion Code
  /*  await topframe.locator("//i[@data-icon-name='Search']").click();
    await topframe.locator("//input[@aria-label='Search Customers']").fill(CustomerNo);
    await webActionObj.sleep(2000);
    await topframe.locator("//button[normalize-space()='Delete']").click();
    await topframe.locator("//button[normalize-space()='Yes']").click();
    await webActionObj.sleep(2000);*/
  }) 


  test("Test 2 -> @Delete", async ({})=>
  {
     
   //const topframe =page.frameLocator("//iframe[@title='Main Content']")
  // await topframe.locator("//input[@aria-label='Search Customers']").click();
  // await topframe.locator("//input[@aria-label='Search Customers']").fill(CustomerNo);
   console.log(CustomerNo);

  })