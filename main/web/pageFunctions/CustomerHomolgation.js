const {locatorFinder} = require("../../../Helpers/locatorFinder")
const {AppFunctions} = require("../../web/commonFunctions/AppFunctions")

class CustomerHomologation{
    constructor(page) 
    {
        this.page = page;
    }  
    async NewCustomerHomologation()
    {
        const AppFunctionsObj=new AppFunctions(this.page);
        let Homplogationpagelocators= new locatorFinder("CustomerHomologationPage",this.page);
        await AppFunctionsObj.ClickElement(await Homplogationpagelocators.getelement("Showtherest"));
        if(await this.page.locator(await Homplogationpagelocators.getelement("MoreOption")).count()==1)
        {
            await AppFunctionsObj.ClickElement(await Homplogationpagelocators.getelement("MoreOption"));
        }
        await AppFunctionsObj.ClickElement(await Homplogationpagelocators.getelement("Related"));
        await AppFunctionsObj.ClickElement(await Homplogationpagelocators.getelement("Customer"));
        await AppFunctionsObj.ClickElement(await Homplogationpagelocators.getelement("Homologation"));
        await AppFunctionsObj.ClickElement(await Homplogationpagelocators.getelement("FilterIcon"));
        await AppFunctionsObj.ClickElement(await Homplogationpagelocators.getelement("FilterIcon_Clearfilter"));
        await AppFunctionsObj.ClickElement(await Homplogationpagelocators.getelement("HomologationNo"));
        await AppFunctionsObj.ClickElement(await Homplogationpagelocators.getelement("New"));
    }
}
module.exports={CustomerHomologation}