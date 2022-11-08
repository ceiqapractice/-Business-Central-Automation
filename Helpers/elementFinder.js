const {test}=require("@playwright/test")
let testdatapath="./locators/"
const fs=require("fs")
const { testConfig } = require("../baseConfig")
let id="id="
let name1="name="
let src="src="
let dataobj={}
let tagstocheck=["input","form","div"]


test('@FindElements',async ({ page }) => {
    await page.goto(testConfig.elementFinderURL);
    let pagetitle=(await page.title()).toString().replace(/\s/g,"").replace(/[^a-zA-Z0-9]/g,'');
    for(let j=0;j<tagstocheck.length;j++){
    const links=await page.$$(tagstocheck[j])
    let filepath=testdatapath+pagetitle+"page.json"
    if(fs.existsSync(filepath)){
        let data=fs.readFileSync(filepath);
        dataobj=JSON.parse(data);
    }
    for(let i=0;i<links.length;i++){
        let element=links[i]
        let idvalue=await element.getAttribute("id")
        let namevalue=await element.getAttribute("name")
    
    if(idvalue!=null & namevalue!=null){
        dataobj[pagetitle+"_"+namevalue]=["#"+idvalue,"."+namevalue]
    }
    else if(idvalue!=null){
        dataobj[pagetitle+"_"+idvalue]="#"+idvalue   
    }
    else if(namevalue!=null){
        dataobj[pagetitle+"_"+namevalue]="."+namevalue   
    }
    }
    
    fs.writeFile(filepath,JSON.stringify(dataobj,null,1),err =>{
        if(err){
            console.log(err)
        }
        else{
            console.log("File Written Successfully !")
        }
    })
}
 }
)