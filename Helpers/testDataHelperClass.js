const { testConfig } = require("../baseConfig");
const fs=require("fs")
const path=require("path")

let Testdatapath;

class testDataHelperClass{
loadobject(filepath){
    try{
        if(fs.existsSync(path.join(process.cwd(),filepath))){
            console.log("path " + path.join(process.cwd(),filepath));
        let defaultrawdata = fs.readFileSync(path.join(process.cwd(),filepath),'utf-8');

        if(defaultrawdata === 'undefined')
        console.log("is undefined");

        const defaultobject=JSON.parse(defaultrawdata);
        console.log("default object --> " + defaultobject);   
        return defaultobject; 
        }
        else
        {
            let def={};
            console.log("Data File not Present for this module in the specified path :" +filepath);
            return def;
        }    
    }
    catch(err){
        console.log(err);
    }
}

jsonreader(module,testType){
    try {   

        let Envobject={};
        let Langobject={};
        let defaultobject={};

        if (testType.toLocaleLowerCase() == 'web'){
             Testdatapath="./testData/webTestData/"
        }
        else if(testType.toLocaleLowerCase() == 'api')
        {
             Testdatapath="./testData/apiTestData/"

        }
        var filepath= Testdatapath + module +"/"+module+".json";
        console.log(filepath);
        defaultobject=this.loadobject(filepath);
        if(testConfig.Env!=""){
            var Envfilepath= Testdatapath + module +"/"+module+"."+testConfig.Env+".json";
            Envobject=this.loadobject(Envfilepath);            
        }
        if(testConfig.Language!=""){
            var Langfilepath= Testdatapath + module +"/"+module+"."+testConfig.Language+".json";
            Langobject=this.loadobject(Langfilepath);            
        }
        const Finalobject=this.combine(defaultobject,Envobject);
        const Finalobject1=this.combine(Finalobject,Langobject);

        return Finalobject1;
         }
    catch(err){
        console.log(err);
    }   
}

combine(object1,object2){
    try{
    if(Object.keys(object2).length>0){
    let array=Object.keys(object2);
    for (let index = 0; index < array.length; index++) {
        let fieldname=array[index];
        let value=object2[fieldname];
        object1[fieldname]=value;
    }
    return object1;
    }
    else{
    return object1;
    }
}
catch(err){
    console.log(err);
}
}
}
module.exports={testDataHelperClass}