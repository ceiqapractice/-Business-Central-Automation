const { selectors } = require("@playwright/test");
const { testConfig } = require("../../../baseConfig");


class webActions
{
    constructor(page) 
    {
        this.page = page;
    }
    async navigateToURL() 
    {
        await this.page.goto(testConfig.dev);
     }

     async clickElement(locator) 
     {  
        await this.page.click(locator);
     }

    async enterText(locator, text)
    {
        await this.page.fill(locator, text);
    } 

    async selectOptionByText(locator, option)
    {
        const dropdown=this.page.locator(locator);
        await dropdown.selectOption(option);
    }
    
    async selectOptionByIndex(locator, index)
    {
        const dropdown=this.page.locator(locator);
        await dropdown.selectOption(index);
    }
    
    async pageRefresh()
    {
        await this.page.reload();
    }
    
    async pageBack()
    {
        await this.page.goBack()
    }

    async pageForward()
    {
        await this.page.goForward()
    }
   
    async checkBoxCheck(locator)
    {
        await this.page.locator(locator).check();
    }

    async checkBoxCheckIsChecked(locator)
    {
        await this.page.locator(locator).isChecked().toBeTruthy()
    }

    async checkBoxCheckUnChecked(locator)
    {
        await this.page.locator(locator).uncheck()
    }
    async acceptAlert(alertText, verificationlocator, verficationText) {

        this.page.on('dialog', async (dialog) => {
            expect(dialog.message()).toEqual(alertText)
            await dialog.accept()
        })
        await expect(this.page.locator(verificationlocator)).toHaveText(verficationText)
    }

    async dismiss_Alert(alertMessage) {

        this.page.on('dialog', async dialog => {
            expect(dialog.message()).toEqual(alertMessage);
            await dialog.dismiss();
        });


    }
    async clickOnCheckbox(locator) {

        const element = this.page.locator(locator)
        if (element.isVisible()) {
            element.click()
        }

    }

    async clickOnRadiobutton(locator) {

        const element = this.page.locator(locator)
        if (element.isVisible()) {
            element.click()
        }

    }
    async countOfElement(elementLocator) {

        const dropdownlocator = this.page.locator(elementLocator);
        const count = await dropdownlocator.count()
        console.log("Number of elements" + count)

    }
    async availableOptionsfromElement(elementLocator) {

        const dropdownlocator = this.page.locator(elementLocator);
        const count = await dropdownlocator.count()
        console.log("Number of elements" + count)

    }
    async countOfWindows() {

        const contextLocal = await this.page.context();
        contextLocal.on('page', async page => {
            await page.waitForLoadState();
        })

        const allPages = await contextLocal.pages();
        for (let i = 0; i < allPages.length; i++) {
            const title = await allPages[i].title();
            console.log("Title - > " + title);
        }
        console.log("no.of windows: " + allPages.length);
        return allPages.length;

    }
    async getTitleOfWindow() {

        const contextLocal = await this.page.context();
        contextLocal.on('page', async page => {
            await page.waitForLoadState();
        })

        const allPages = await contextLocal.pages();
        for (let i = 0; i < allPages.length; i++) {
            const title = await allPages[i].title();
            console.log("Title - > " + title);
        }
        console.log("no.of windows: " + allPages.length);
        return allPages.length;

    }
    async switchWindowByTitle(title) {
        const contextLocal = await this.page.context();
        contextLocal.on('page', async page => {
            await page.waitForLoadState();
        })

        const allPages = await contextLocal.pages();
        //const allwindows = await this.page.context().pages();

        let targetPage;
        for (let i = 0; i < allPages.length; i++) {

            let pageTitle = await (allPages[i]).title()
            if (pageTitle == title) {
                targetPage = allPages[i];
                break;
            }
        }
        await targetPage.bringToFront()

        return allPages.length;



    }
    async getSelectedElements(loc, textValueExpect) {

        await this.page.locator(loc).click();
        const count = await this.page.locator(loc).count()
        for (let i = 0; i < count; i++) {


            const textValueActual = await this.page.locator(loc).nth(i).textContent()
            console.log(" i = " + i + " value : " + textValueActual);
            if (textValueActual == textValueExpect) {
                await this.page.locator(loc).nth(i).click()
                break;
            }

        }

    }
    async hoverOnElement(hoverelement) {
        await this.page.hover(hoverelement);

    }

    async verifyEneteredText(locator, testdata) {
        const enterdata = await this.page.locator(locator).inputValue()

        if (enterdata != null && enterdata == testdata && enterdata != null) {
            console.log("you have entered", enterdata)
        } else {
            console.log("you not have entered", enterdata)

        }
    }

    async selectDropdown(dropdownlocator, options, text) {

        if (options == "value") {
            await dropdownlocator.selectOption({
                value: text
            });
        } else if (options == "label") {
            await dropdownlocator.selectOption({
                label: text
            });

        } else if (options == "index") {
            await dropdownlocator.selectOption({
                index: text
            });

        }

    }
    async pageScroll(directionType, speedControl) {

        let scroll = async (args) => {
            const {
                direction,
                speed
            } = args;
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            const scrollHeight = () => document.body.scrollHeight;
            const start = (direction === "down") ? 0 : scrollHeight();
            const shouldStop = (position) => direction === "down" ? position > scrollHeight() : position < 0;
            const increment = direction === "down" ? 100 : -100;
            const delayTime = speed === "slow" ? 50 : 10;
            console.error(start, shouldStop(start), increment)
            for (let i = start; !shouldStop(i); i += increment) {
                window.scrollTo(0, i);
                await delay(delayTime);
            }
        };
        await this.page.evaluate(scroll, {
            direction: directionType,
            speed: speedControl
        });

    }
    async dragAndDrop(originSelector, destinationSelector) {

        await originSelector.dragTo(this.page.locator(destinationSelector));

    }

    async dragAndDropdSecond(originSelector, destinationSelector) {


        // Seems like locator.dragTo is not reliable sometimes and following code is the suggested workaround
        // From https://github.com/microsoft/playwright/discussions/12454 


        const originElement = await this.page.waitForSelector(originSelector);
        const destinationElement = await this.page.waitForSelector(destinationSelector);

        await originElement.hover();
        await this.page.mouse.down();
        const box = !(await destinationElement.boundingBox());
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await destinationElement.hover();
        await this.page.mouse.up();
    }

    async rightClickOnElement(locatorEl) {

        await this.page.locator(locatorEl).click({
            button: 'right'
        });
    }
    async clickOnVisibleElement(locatorEl) {

        if (await this.page.locator(locatorEl).isVisible()) {
            await this.page.locator(locatorEl).type("Hello")
        }
    }

    async doubleClickOnElement(locatorEl) {

        await this.page.locator(locatorEl).dblclick();
    }
    async clickOnElement(locatorEl) {

        await this.page.locator(locatorEl).click();
    }
    async enterTestData(locatorEl, data) {
        await this.page.locator(locatorEl).type(data);
    }
    async switchToFrame(frameElement) {
        await this.page.frame(frameElement)
    }
    async switchToFrameByLocator(frameElement, locatorEl, testdata) {

        await this.page.frameLocator(frameElement).locator(locatorEl).type(testdata)

    }

    async switchToParentFrame() {
        await this.page.frame.parent_frame()
    }

    async clearText(locatorEl) {

        await this.page.locator(locatorEl).fill(" ");
    }

    async keyboardActions(actionsofkeyboard) {
        switch (actionsofkeyboard) {

            case "type":

                await this.page.locator(locatorEl).focus();
                await this.page.keyboard.type(testdata);
                break;

            case "backspace":

                await this.page.locator(locatorEl).focus();
                await this.page.keyboard.press('Backspace')
                break;

            case "escape":

                await this.page.locator(locatorEl).focus();
                await this.page.keyboard.press('Escape')
                break;

            case "tab":

                await this.page.locator(locatorEl).focus();
                await this.page.keyboard.press('Tab')
                break;
            case "shiftDelete":
                await this.page.locator(locatorEl).focus();
                await this.page.keyboard.press('Shift+Delete');

            default:

                break;
        }
    }

    async getCookiesByparametermatching(url,value){
        const cookiesList = await context.cookies(url);
       
        for(let i= 0; i < cookiesList.length - 1;i++){
       if(cookiesList[i].name == "__gads" ){
            console.log("Name of the cookie " + cookiesList[i].name );
           break;
        
    }
    
    }
}
    async getCookiesByValue(url){
        const contextLocal = await this.page.context();
      
        const cookiesList = await contextLocal.cookies(url);
        

        for(let i= 0; i < cookiesList.length - 1;i++){
            console.log("Name of the cookie " + cookiesList[i].name );
        }
    
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

module.exports={webActions}
