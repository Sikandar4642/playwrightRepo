import { expect,test } from "playwright/test";
import HomePage from "../../pageObjects/HomePage.js";


test('DemoQA login page', async({page})=>{
    
    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();

    //verify the page title

    await expect(page).toHaveTitle('demosite');
    

})