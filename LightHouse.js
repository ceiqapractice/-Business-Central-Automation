const playwright = require('playwright');
const { playAudit } = require('playwright-lighthouse');
const os = require('os');
const fs = require('fs');
const path = require('path');
const appPrefix = 'pl-lh';
const rimraf= require('rimraf');
const { lightHouseMain } = require('./main/web/commonFunctions/lightHouseMain');
(async () => {
    tmpDir = os.tmpdir()
    tmpDir = fs.mkdtempSync(path.join(tmpDir, appPrefix));
    console.log(tmpDir);
    const context = await playwright['chromium'].launchPersistentContext(tmpDir, {
        args: ['--remote-debugging-port=9222'],
        headless: false
    });
    const page = await context.newPage();
    const lightHouseMainobj =new lightHouseMain(page);
    var baseURL="https://opensource-demo.orangehrmlive.com"
    await page.goto(baseURL);
    await page.locator('//*[@name="username"]').fill('Admin')
    await page.locator('//*[@name="password"]').fill('admin123')
    await page.locator('//*[@type="submit"]').click();
    await page.locator('text="Add Employee"').click();
    await lightHouseMainobj.lrAudit(page);
    await page.locator('text="Reports"').click();
    await lightHouseMainobj.lrAudit(page);
    await context.close();
    rimraf(tmpDir, console.log);
})();