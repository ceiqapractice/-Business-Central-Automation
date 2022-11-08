const { playAudit } = require('playwright-lighthouse');
const http=require('http');
const chromeLauncher = require('chrome-launcher');
const opn = require('opn');
const os = require('os');
const fs = require('fs');
const path = require('path')
const portscanner = require('portscanner')
class lightHouseMain
{
    constructor(page) 
    {
        this.page = page;
    }

    async lrAudit(page)
    {
        let urlData=await page.url();
        let pageName=urlData.substring(urlData.lastIndexOf('/') + 1);
        let auditPageName=pageName+".html";
        await playAudit({
            page: page,
            port: 9222,
            thresholds: {
                performance: 60,
                accessibility: 60,
                'best-practices': 60,
                seo:60
            },
            reports: {
                formats: {
                    html: true
                },
                name: auditPageName
            }
    });
   /* const hostname = '127.0.0.1'; 
    const port = 3000; 
    console.log(auditPageName);
    // Render page 
    fs.readFile('./lighthouse/'+auditPageName, function (err, html) { 
     if (err) { 
       throw err;  
     }  
     const server = http.createServer(function(request, response) {  
       response.writeHeader(200, {"Content-Type": "text/html"});  
       response.write(html);  
       response.end();  
     }).listen(port, hostname, () => { 
        console.log(`Server running at http://${hostname}:${port}/  to stop press ctl+c`);
        portscanner.checkPortStatus(port, hostname).then(status => {
            // Status is 'open' if currently in use or 'closed' if available
            console.log(status);
          });
        }); 
    }); */
        
              
        
    // `.lhr` is the Lighthouse Result as a JS object
    
}   
}

module.exports={lightHouseMain}