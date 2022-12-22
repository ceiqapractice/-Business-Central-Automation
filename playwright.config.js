const { devices } = require('@playwright/test');
var date = new Date();
var ReportDate =date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2);
const config = {
  testDir: './test/web',
  testMatch: '**spec.js',
  timeout: 100 * 1000,
  fullyParallel: false,
  expect: {
    timeout: 30000,
    toMatchSnapshot:{threshold:0.05}
  },
 // retries:2,
  
 reporter: [['allure-playwright']],

 use: {
  viewport:{ width: 1280, height: 720 },
  //viewport:null,
  browserName :  'chromium',    
  headless : false,
  ignoreHTTPSErrors: true,
  screenshot : 'on',
  trace : 'off',
  launchOptions : {
      args : ["--start-maximized"]
  },
  contextOptions: {
    recordVideo: {
      dir: './test-results/videos/'
    }
  }
}  
};

module.exports = config;