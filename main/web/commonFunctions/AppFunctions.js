class AppFunctions{

    constructor(page) 
    {
        this.page = page;
    }

    async getinputfield(name){
        let locator="//a[normalize-space()='"+name+"']/parent::div/div/input";
        return locator;
    }

    async NavigatetoPage(name){
        await this.page.locator("//button[normalize-space()='"+name+"']").click();
    }

    async EnterText(locator,data){
        await this.page.locator(locator).fill(data);
    }

    async ClickElement(locator){
        await this.page.locator(locator).click();
    }

}

module.exports={AppFunctions}