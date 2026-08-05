const{test, expect} = require('@playwright/test');

test('Taking screenshot', async({page})=>{
    await page.goto('https://www.youtube.com/@testerstalk');
    //element screesnhot
    await page.locator('//*[@id="page-header"]/yt-page-header-renderer/yt-page-header-view-model').screenshot({path : './screenshots/element.png'});
    await page.waitForTimeout(5000);
    
    //page screenshot
    await page.screenshot({path:'./screenshots/page.png'});

    //full page screenshot
    await page.screenshot({path : './screenshots/fullpage.png', fullPage : true});
})