const { testDataHelperClass } = require("./testDataHelperClass");


var logindata={};
class dataHandler{ 
    constructor(moduletype,testType){
    let testdatahelper=new testDataHelperClass();
    const dataset=testdatahelper.jsonreader(moduletype,testType);
    if(Object.keys(dataset).length > 0)
    {    
    let array=Object.keys(dataset);
    for (let index = 0; index < array.length; index++) {
        let fieldname=array[index];
        let value=dataset[fieldname];
        logindata[fieldname]=value;
    }
    }
    else{
        console.log("Data files are not present for this " +moduletype+ " module");
    }
    this.logindata=logindata;
    }

getdata(){
    return logindata;
}
}

module.exports={dataHandler}

