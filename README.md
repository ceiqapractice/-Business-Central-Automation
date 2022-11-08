<!-- TABLE OF CONTENTS -->
<h2>
    <details open="open">
        <summary class="normal">Table of Contents</summary>
        <h5>
          <ol>
            <li>
              <a href="#about-forte">About FORTE</a>
            </li>
            <li>
              <a href="#forte-start">FORTE Start</a>
            </li>
            <li><a href="#execution">Execution</a></li>
			   <ul>
			   <li>
			   <a href="web">Web</a>
			   </li>
			   <li>
			   <a href="api">API</a>
			   </li>
			   </ul>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#docker">Docker</a></li>
	    <li><a href="#lighthouse">LightHouse</a></li>
          </ol>
        </h5>    
    </details>
</h2>

<!-- ABOUT THE PROJECT -->

## About FORTE
PLAYWRIGHT - JAVASCRIPT 

Playwright is a Node.js library to automate Chromium, Firefox, and WebKit with a single API.
Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.
It allows testing Chromium, Firefox and WebKit with a single API. 

<h4>FORTE - FULLY OPTIMIZED RADICAL TEST ENGINE</h4>

 * FORTE is designed for Web Application and REST API Automation Testing. 
 * FORTE - Playwright has its own test runner for end-to-end tests, we call it Playwright Test. 
 * By using JSON as Test Data Management for picking up the data's by mentioning the class name from the Test Class.
 * Web Scraping - FORTE Engine will find the Web Elements according to the given URL's & it will stored in a JSON file for DATA PROCESSING 
 * Logicial Identifier for the Locators matching inside the DOM, it will locate & works on the available 1ocators   
 * Common Functions are available for the entire functional flow Activity 
 * As, FORTE supports for API Testing the CRUD Methods for the REST API's & Validating the BODY
 * For Generating the Test Data for the CRUD Operations the Common Functions will be supported with FAKER ( RANDOM TEST DATA)
 

## FORTE Start

The following software are required:

- nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```
- Install Java 8 or above, Allure Reports require Java 8 or higher.

Installation

1. Clone the repo using below URL

```sh
https://github.com/ceiqapractice/FORTE.git
```

2. Navigate to folder and install npm packages using:

```sh
npm install
```

## Execution

 **WEB** 
 
 **URL Config**</br>
 
 The URL of the application under test can be given in the <code>baseConfig.js</code> file and used through the test.
 
 ![image](https://user-images.githubusercontent.com/113173052/189847129-f3170f24-60af-4ee8-8618-9ecb49aa55ca.png)

**Web Actions**</br>

All the common web related playwright’s actions are pre-available in the path 
<strong> main > web >commonFunctions > webActions.js </strong>and these common actions can be used throughout the test.

Any update on the actions or addition of the new methods can be added over here so it can be re-used for the test.

**Element Finder**</br>

Element Finder feature allows you to find the elements of the page with the identifiers ID and Name and generate a JSON file with the page locators.</br>

Below configurations need to be done for visual regression testing in <code>baseConfig.js</code>

![image](https://user-images.githubusercontent.com/113173052/189345471-bec182d3-fef4-4c47-a2c1-54d9b31966be.png)

The JSON file with the name of the page title will be generated under the Locators folder for the element finder with locators’ identifiers.

![image](https://user-images.githubusercontent.com/113173052/189345512-15f79644-ac29-43b7-aea9-1092ee5c18bf.png)

The JSON file data will be stored in the below format.

<pre><code>Pagetitle_elementid:"#element id value" //if the element contains only ID
Pagetitle_elementName:".element name value" //if the element contains only name
Pagetitle_elementName:["#element id value",".element name value"] //if the element contains both ID and Name</code>
</pre>

Element Finder can be executed using the command :

<pre><code> npx playwright test test/web/elementFinder.spec.js </code></pre>

**Test Data Management**</br>

Test data management helps you to organize the test data based on your needs in the environment and language specific and retrieve data 
easily as required for the test case execution.

The Test data can contain three different files (Common data, Environment specific data & Language Specific data) 
and it should be saved under the folder Testdata in the JSON format.

The format of the files should be mentioned as : <strong>TestData>Modulename></strong>

<pre><code>modulename.json (Common data)
modulename.envname.json(Environment Specific data) e.g. LoginPage.QA.json /LoginPage.dev.json
modulename.Languagecode.json(Language Specific data) e.g. LoginPage.en.json/LoginPage.fr.json
</code></pre>

And the Env and Language configuration can be done in <code>Config.js file</code>

![image](https://user-images.githubusercontent.com/113173052/189368626-98f8c6e8-62f0-490c-bc08-df4bbb1fd1a8.png)


Test data Management can be used by importing the data handler file under <strong>FORTE>Helper>datahandler.js</strong> 

Importing the file and object can be created with the two parameters module type (The name of the file you have stored under test data) 
& Test type (WEB/API) to access the data from the test data location

<pre><code>e.g.,
Const Object=new dataHandler (moduletype, Testtype)
Object.getdata().Key//It will return the specified value for the JSON key 
</code></pre>

**RUN**</br>

To run the Web test cases the first configuration need to be done in <code>Playwright.config.js</code> file

<pre><code>testDir : “test/web” // The testDir should be set to WEB to run the Web test cases </code></pre>

You can run single test, multiple tests or all test using the command line and the commands shown below 

Running single test file
<pre><code> npx playwright test test/web/login-page.spec.js </code></pre>

Running a set of test files
<pre><code> npx playwright test test/web/login-page.spec.js test/web/home-page.spec.js</code></pre>

Running a file that have <strong>home</strong> or <strong>login</strong> in the filename
<pre><code> npx playwright test test/web/login-page.spec.js test/web/home-page.spec.js</code></pre>

Running Tests on Specific browsers
<pre><code> npx playwright test test/web/login-page.spec.js --project=chromium</code></pre>

Running all Tests
<pre><code> npx playwright test </code></pre>

**PARALLEL EXECUTION**</br>
Parallel Execution works along with workers based on the tags of execution from the package.json file 

![image](https://user-images.githubusercontent.com/109504306/190432356-e54d07bd-25f2-4ce2-b600-775e76915079.png)

All tests run in worker processes. These processes are OS processes, running independently, orchestrated by the test runner. All workers have identical environments and each starts its own browser.
Note that parallel tests are executed in separate worker processes and cannot share any state or global variables. Each test executes all relevant hooks just for itself

for eg., from the above image, tag of smoketest will be executed in parallel with 5 workers along with the mentioned tags in the tests in firefox env
In the below image of the Regression execution there is no environment mentioned so it will be executed based on the browsers mentioned in the PROJECTS -> playwright.config.js
![image](https://user-images.githubusercontent.com/109504306/190434055-fd80da93-782f-47dd-9417-930c24052172.png)


**locator Finder**</br>
Locator Finder, Which is used to filter the available elements from the list of elements in a DOM 

The list of available elements will be mentioned in the JSON File
![image](https://user-images.githubusercontent.com/109504306/190428910-40a209e3-d230-4df9-a796-42b5766b35b8.png)

It will accept in the form of Array as well as String of element. It will search according to the logicial finder of elements in the DOM 
When the element is available and visible it will pick from the DOM and perform the actions 

NOTE : It will accept String of DATA and Array of an elements 

 **Visual Comparison**<br/>
 
Visual comparison is an feature that navigates through every pages of the application and takes screenshot for visual regression of the application.

Below configurations need to be done for visual regression testing in 
<code> baseConfig.js</code>

![image](https://user-images.githubusercontent.com/113173052/189321445-21396034-e808-4c5e-a935-88ad1d2556e0.png)

Program navigates to each page of the application and checks whether the screenshot for the page is present in the folder that is specified in the 
foldertobestested configuration. If the screenshot is present, then it will be compared with the actual page or else screenshot of the page will be
taken and placed in the folder mentioned in the configuration.

Threshold and Pixel difference ratio can be configured in the <code>playwright.config.js</code>

![image](https://user-images.githubusercontent.com/113173052/189321800-5ae57720-b632-49e4-97dd-9435fe07f954.png)

The name of the screenshot will be saved in the format of the “url-win32.png” followed by the trimmed base URL. E.g., The screenshot name 
of the URL (https://www.ceiamerica.com/about-us/) is aboutus-win32.png.

Folder to be tested should be placed under the structure FORTE > Visualcomparisonscreenshots> Foldername

![image](https://user-images.githubusercontent.com/113173052/189322893-8760e562-dfa0-4c3a-a5cc-465d84c131f2.png)

Visual Regression can be executed using the command :

<pre><code> npx playwright test test/web/Visualcomparison.spec.mjs </code></pre>

**API** 
  <h4>FORTE - Application Programming Interface </h4>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Configuration<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		
 * From the TestData Folder the API Modules will be decalred for eg., -> TestData->LoginPage->LoginPage.json
	 Inside the JSON file the "BASEURL","PATH PARAMETER","QUERY PARAMETER","TOKEN",etc .. will be configured 
		 
		 Config :
	      {
          "baseURL": "https://gorest.co.in/public-api/users/",
          "getUserListURL": "https://gorest.co.in/public/v2/users",
          "accesstoken": "?access-token=",
          "auth": {
            "TOKEN": "c4f17a80e91c5a9368535ff65f17bad328fc3191b4892dae81a60340bec89e5c"
            },
          "pathuser": "3396",
          "queryParameter": {
          "parameterURL": "&page=4&gender=Female&status=Active"
          },
          "count": 5,
          "updateuser": "2599"
        }
## TEST DATA 

* It will Pick the test values from the folder TestData 
* By Mentioning the Module Type and Test Type in the Data Handler it will pick up either WEB or API execution 
* Need to mention in every tests according to the module and test type 

test('API Testing', async ({request}) => {

  let DataHandlertest = new DataHandler("LoginPage", "API");
  // function 
  });

  or 
  
test('Web Testing', async ({page}) => {

  let DataHandlertest = new DataHandler("LoginPage", "WEB");
  // function 
  });

  The data will be picked from this folder structure for  eg.,-> APITestData -> LoginPage -> LoginPage.json.
  Then the Array of Data or string of data  will be retireved

## RUN
To run the API test cases the configuration need to be upadte in the  <code>Playwright.config.js</code> file

<pre><code>testDir : “test/api” // The testDir should be set to API to run the Web test cases </code></pre>

You can run single test, multiple tests or all test using the command line and the commands shown below 

## SINGLE TEST &  MULTIPLE TEST
Running single test file
<pre><code> npx playwright test .\loginPage-POST.spec.js  </code></pre>

Running a set of test files
<pre><code> npx playwright test test/api/loginPage-GET.spec.js test/api/loginPage-POST.spec.js</code></pre>

Running a file that have <strong>home</strong> or <strong>login</strong> in the filename
<pre><code> npx playwright test test/api/loginPage-POST.spec.js test/api/loginPage-POST.spec.js</code></pre>

Running all Tests
<pre><code> npx playwright test </code></pre>

# GROUPING Test : 
		 * The tags will be mentioned according to the type of testing in the package.json file. 
     The  same tags will declared in the test function 
      
      test('GET METHOD - Path Parameters -User Login with Token @smoke', async ({request}) => {
        // function
      }
		 Inside the Package.json file -> 

		 "scripts": {
			"fulltest" : "npx playwright test",
			"smoketest": "npx playwright  test --grep @smoke"
			}	
     *  In command line run with npx playwright test --grep @smoke  for tag based execution 
     * In Command line run with npx playwright test  for full test execution  

## Reports

After every test execution allure results folder will be generated in project root folder then run the below commands to generate the allure report

    npx allure generate ./allure-results --clean

Run the below command to open the allure report in the browser

    npx allure open ./allure-report

 - Overall Report
 ![Overall Report](https://user-images.githubusercontent.com/110914539/188542509-093f92b0-468b-4236-9d38-6e2d9fe63546.JPG)

 - Detailed Report
 ![Detailed Report](https://user-images.githubusercontent.com/110914539/188542617-c6fbf2a8-1ab2-459f-a784-621fd38c56fd.JPG)

 - Failed Report
 ![Failed Report](https://user-images.githubusercontent.com/110914539/188542809-b95d7289-b44e-4321-9485-3ee82683c5d9.JPG)

**Notification**<br/>
A detailed status of Test execution report with test report link and the data table will be sent to the configured mails and Teams group. To achieve that add the <strong>[“./My-Reporter.js”]</strong> to your reporter config in <code>Playwright.config.js.</code>

All the necessary config for Notification can be done in the <code>baseConfig.js file</code>.

<pre><code>//baseConfig.js
//Mail Configurations
"FromMailaddress":"abc@xyz.com",// From Mail Address should be mentioned here
"FromAddressPassword":"value",//From address password should be mentioned here
"ToMailAddress":["firstmail","Secondmail],//To Mail addresses should be mentioned here
"TeamsWebhookURL":"https://computerenterprisesinc.webhook.office.com/webhookb2/....",//Teams Channel WebHook URL should be mentioned here
"MailServiceProvider":"Gmail",//Mail service provider should be mentioned here
"MailNotification":"yes",//Yes for Mail notification enable and No for notification disable
"TeamsNotification":"yes",//Yes for Teams notification enable and No for notification disable
"Githubreportlink":"https://ceiqapractice.github.io/.." //Github report link can be added here
</code></pre>

Snapshot for notifications:
![image](https://user-images.githubusercontent.com/110914539/193258851-7903d4cb-feb0-4c36-a50d-8c78c3045916.png)

![image](https://user-images.githubusercontent.com/110914539/193258864-405c2773-0e95-4886-8d6b-4574df094d1a.png)




## Docker
**Local Execution**<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Prerequisites**<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Installation<br/>
                                                                                                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      Clone the repo using below URL
                                                                                                                  
    https://github.com/akshayp7/playwright-typescipt-playwright-test.git
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      Navigate to folder and install npm packages using:<br/>
 

    npm install

      

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Install Docker app<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Run the Docker app<br/>
     For running the tests on Docker container we have to first build a image from Dockerfile and then run the image to spawn container on which the test scripts will run.
     

  For building image from Docker run below command, where path to Dockerfile must be provided after --file tag and name of the image must be provided after -t tag.

    docker build . --file Dockerfile.focal -t crate

  Once the image is generated we can run the image to spawn container and run scrips using below command. In Below Command "playContainer" is name of the container created using "crate" image.

    docker run -it -d --name playContainer crate /bin/bash

 Execute the test script in "playContainer" , run the below command

    docker exec -it playContainer /bin/bash

Now docker container is ready, Run the test scripts using below commands,

    npx playwright test

**CI/CD Execution**<br/>

&nbsp; &nbsp;**FORTE** integrated with Github repository , after every commit to github master the **github action** will be triggered ,<br/>
&nbsp; &nbsp; &nbsp;**GitHub Action Workflow:**<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; 1.Code Check out<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; 2.Execute the docker file<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;2.1.Pull Microsoft playwright image<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;2.2.Create new directory<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;2.3. Copy and paste source code into new directory<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;2.4.Install npm and playwright<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;2.5.Run test cases<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;2.6.Generate Allure result<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; 3.Copy allure results from docker container<br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; 4. Publish Allure results as artifacts <br/>
       &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; 5. Publish Allure results to Github pages<br/>

 ![Flow](https://user-images.githubusercontent.com/110914539/188542865-f601154e-652d-4ced-9a8b-b790216658bb.JPG)
 
 ## LightHouse
 
 Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and more.
I have configure Lighthouse for Performance in my Project.
- To configure Lighthouse navigate to "Lighthouse.js" and replace base URL with desired URL to test.
- Call lsaudit() function before page navigation to audit the webpage.
- To run Lighhouse test use below command, reports will be generated in htnl format in root directory with name "LighthouseReport.html" 
```JS
npm run lighthouse
