//const { TestDataHelper } = require("./testDataHelperClass");
const { testDataHelperClass } = require("./testDataHelperClass");
const fs=require("fs")
const path=require("path");
const { Console } = require("console");
//var webTestdatapath="./webPageObjects/"
//let webpageLocatorsBasePath = webTestdatapath +  "webPageLocators/";
let webpageLocatorsBasePath = "./locators/";

let elements;
class locatorFinder{
    

    constructor(fileName,page){
        this.page = page;
        let testDataHelper = new testDataHelperClass();
        let filePath = webpageLocatorsBasePath + fileName+ ".json";
        elements = testDataHelper.loadobject(filePath);
        // let returnObject = {};
        // for (var key in elements) {
        //     var allLocators = elements[key];
        //     //console.log(allLocators);
        //     let availableLocator = this.getavailableLocator(allLocators);
        //     returnObject[key] = availableLocator;
        // }
        // this.locators = returnObject;
    }
    async getelement(Name) {
        
        let availableLocator;
        let allLocators=elements[Name];
        if (allLocators instanceof Array) {
            for (let i = 0; i < allLocators.length; i++) {
                const count = await this.page.locator(allLocators[i]).count();
                availableLocator = allLocators[i];
                if (count > 0) {
                    availableLocator = allLocators[i];
                    break;
                }
            }
        } else {
                availableLocator = allLocators;               
        }
        return availableLocator;
    }
}
module.exports={locatorFinder}