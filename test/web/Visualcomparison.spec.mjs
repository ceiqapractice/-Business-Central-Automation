import fs from "fs"
import path from "path"
import {test,expect} from "@playwright/test"
import {testConfig} from "../../baseConfig.js";
let links=[];
const foldertobetested=testConfig.visualComparisonDate;
let baseURL=testConfig.baseURL;
console.log(foldertobetested);
console.log(baseURL);

async function comparepage(filepath,page){
    try{
        await expect(await page.screenshot({fullPage:true})).toMatchSnapshot([filepath]);
    }
    catch(err){
      console.log(err);
    }}

test.skip('@Visual_comparison',async ({ page }) => {  
    const link = await import("linkinator");
    const results = await link.check({
      path: baseURL,
      linksToSkip: testConfig.linksToSkip
    });
await results
  let array1=results.links
  for(let i=0;i<array1.length;i++){  
  let jsonobj=array1[i];
  if(jsonobj.state=="OK" && jsonobj.status==200  && !(jsonobj.url.endsWith(".png") || jsonobj.url.endsWith(".svg") )){
    links.push(jsonobj.url)
  }  
  }
  let uniqueurls=[...new Set(links)];
  let length1=baseURL.length;
  try{
      for(let i=0 ;i<uniqueurls.length;i++){
      let str=uniqueurls[i];          
      await page.goto(str);
      await page.waitForLoadState('networkidle');
      await page.waitForLoadState('domcontentloaded');
      let filename1=str.substring(length1).replace(/[^a-zA-Z0-9]/g,'');
      if(filename1=="")
      {
        filename1=str.substring(8).replace(/[^a-zA-Z0-9]/g,'');  
      }
      let filename2=filename1+"-win32.png";
      let screenshtplace="Visualcomparisonscreenshots/"+foldertobetested+"/"+filename2;
      let screenshotdest="test/web/visualcomparison.spec.mjs-snapshots/"+filename2;
      if(fs.existsSync(path.join(process.cwd(),screenshtplace))){
        await fs.copyFileSync(screenshtplace,screenshotdest);
        await comparepage(filename1+".png",page);
      }
      else{        
      await page.screenshot({path:path.join(process.cwd(),screenshtplace),fullPage:true});
      }
    }}
  catch(err){
        console.log(err);
  }});


