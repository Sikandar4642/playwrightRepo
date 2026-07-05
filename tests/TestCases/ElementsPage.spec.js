import { test, expect } from '@playwright/test';
import HomePage from '../../pageObjects/HomePage';
import ElementsPage from '../../pageObjects/ElementsPage';
import { type } from 'os';

test.skip('ElementsPageActions', async ({ page }) => {

    const homePage = new HomePage(page);
    const elementsPage = new ElementsPage(page);
    await homePage.navigateToHomePage();
    await elementsPage.validateElementsPageCards();
    await elementsPage.clickElementsCard();
    await page.locator('//ul[@class="menu-list"]//li//a//span[text()="Text Box"]').click();
    await page.getByPlaceholder('Full Name').fill('sikandar shaikh');
    await page.getByPlaceholder('name@example.com').fill('sikk@gmail.com');
    await page.getByPlaceholder('Current Address').fill('ADAD Sadaf D');
    await page.locator('#permanentAddress').fill('asfasfsafadwdc');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.waitForTimeout(5000);
})

test.skip('Print Broken Links', async ({ page }) => {

    await page.goto('https://demoqa.com/broken');

    const links = page.locator('a[href]');

    const count = await links.count();

    for (let i = 0; i < count; i++) {

        const href = await links.nth(i).getAttribute('href');

        const response = await page.request.get(href);

        if (response.status() >= 400) {
            console.log(` Broken Link : ${href} Status : ${response.status()}`);
        } else {
            console.log(`✅ Valid Link : ${href} Status : ${response.status()}`);
        }
    }
});

test.skip('Upload file', async ({ page }) => {

    await page.goto('https://demoqa.com/upload-download');

    await page.locator('#uploadFile').setInputFiles('./sampleFile.jpeg');

    await expect(page.locator('#uploadedFilePath'))
        .toContainText('sampleFile.jpeg');
    await page.waitForTimeout(5000)

    // Download-----------------------------------------------------------------
    const downloadPromise = page.waitForEvent('download');

    await page.locator('#downloadButton').click();

    const download = await downloadPromise;

    await download.saveAs(
        `downloads/${download.suggestedFilename()}`);
})

test.skip('Handle new window', async ({ page }) => {

    await page.goto('https://demoqa.com/browser-windows');

    const [newWindow] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator('#windowButton').click()
    ]);

    await newWindow.waitForLoadState();

    await expect(newWindow).toHaveURL(/sample/);

    const heading = newWindow.locator('#sampleHeading');

    await expect(heading).toHaveText('This is a sample page');

    console.log(await newWindow.title());
    console.log(newWindow.url());
})

test.skip('Scroll to element', async ({ page }) => {

    await page.goto('https://practice.expandtesting.com/large');

    const target = page.locator('text=50');

    await target.scrollIntoViewIfNeeded();

    await expect(target).toBeVisible();

    console.log("Element Found");



//     1. Scroll until a specific element is visible (Best Practice)
// Suppose you want to find "Samsung Galaxy S25" in an infinite list.
// while (true) {
//     const product = page.locator('text=Samsung Galaxy S25');

//     if (await product.isVisible()) {
//         console.log("Product Found");
//         break;
//     }

//     await page.mouse.wheel(0, 1500);
// }

});

test.skip('Select option from scrolling dropdown', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Open dropdown
    await page.locator('#comboBox').click();

    await page.waitForTimeout(5000);

    // Click visible option
    await page.getByText('Item 20', { exact: true }).click();

});

// Approach 2: Scroll inside the dropdown until the option appears

// This is the approach commonly used in real applications with custom dropdowns.

test.only('Scroll inside dropdown and select value', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Open dropdown
    await page.locator('#comboBox').click();

    const option = page.getByText('Item 95', { exact: true });

    while (!(await option.isVisible())) {

        await page.locator('.option-list').evaluate((el) => {
            el.scrollTop += 200;
        });

        await page.waitForTimeout(300);
    }

    await option.click();
});