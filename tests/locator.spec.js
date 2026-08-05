const{test, expect} = require('@playwright/test');

test('Locator verification', async({page}) =>{
    // await page.goto('https://leetcode.com/');
    // await page.getByRole('link', { name: 'Create Account' }).click();
    // await page.waitForTimeout(5000);
    // await page.getByRole('link', { name: 'Problems' }).click();

    await page.goto('https://www.google.com/');
    await page.getByLabel('Search',{exact:true}).fill('api testing by testers talk');
    await page.getByLabel('Search',{exact:true}).press('Enter');
    await page.waitForTimeout(5000);

    
})