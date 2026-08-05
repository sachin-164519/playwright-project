//inlclude playwright module
const {test, expect} = require('@playwright/test');

//Write a test
test('Validate youtube title', async({page})=>{
    //Go to URL
    await page.goto('https://www.youtube.com/');
    //Search with keywords
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByPlaceholder('Search').fill('cypress by testers talk');
    await expect(page.getByRole('button', { name: 'Search', description: 'Search' })).toBeEnabled();
    await page.getByRole('button', { name: 'Search', description: 'Search' }).click();
    await page.waitForTimeout(5000);
    //Click on playlist
    await page.getByRole('link', { name: 'Cypress by Testers Talk☑️' }).click();
    await page.waitForTimeout(5000);
    //Vlaidate title
    await expect(page).toHaveTitle('Cypress Tutorial Full Course | Cypress Automation | Learn Cypress in 5 Hrs - YouTube');
})
 

