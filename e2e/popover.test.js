import puppeteer from "puppeteer";
jest.setTimeout(60000)
describe("Page start", () => {
    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
            devtools: true,
        });
        page = await browser.newPage();
    });

    test('Открытие и закрытие формы', async () => {
        await page.goto('http://localhost:9000');
        await page.click('.btn-danger');
        await page.waitForSelector('.popover')
        await page.click('.btn-danger');
        await page.$('.popover');
    });
    afterEach(async () => {
        await browser.close();
    });
});