const puppeteer = require('puppeteer');

const { HOST } = process.env;

const screenshotPath = './e2e/__screenshots__';

describe('base', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      defaultViewport: {
        width: 600,
        height: 400,
      },
    });
    page = await browser.newPage();
    await page.goto(HOST);
    await page.waitFor(1000);
    await page.screenshot({path: screenshotPath + '/base--00.png'});
  });

  afterAll(async () => {
    await browser.close();
  });

  it('adds a new point to the list', async () => {
    const input = await page.$('input[name="title"]');
    await input.type('Title 1');
    await page.screenshot({path: screenshotPath + '/base--11.png'});
    await input.press('Enter');
    await page.waitFor(200);
    const item1Title = await page.$eval('.list--item:nth-child(1) .list--content', el => el.innerText);
    expect(item1Title).toEqual('Title 1');
    await page.screenshot({path: screenshotPath + '/base--12.png'});
  });

  it('puts a new point in the center of the map', async () => {
    await page.mouse.move(350, 0);
    await page.mouse.down();
    await page.mouse.move(300, 0);
    await page.waitFor(200);
    await page.mouse.up();
    await page.screenshot({path: screenshotPath + '/base--21.png'});
    const input = await page.$('input[name="title"]');
    await input.type('Title 2');
    await page.screenshot({path: screenshotPath + '/base--22.png'});
    await input.press('Enter');
    await page.waitFor(200);
    const item2Title = await page.$eval('.list--item:nth-child(2) .list--content', el => el.innerText);
    expect(item2Title).toEqual('Title 2');
    await page.screenshot({path: screenshotPath + '/base--23.png'});
  });

  it('moves a point on the map to a new place', async () => {
    await page.mouse.move(300, 200);
    await page.mouse.down();
    await page.mouse.move(350, 250);
    await page.mouse.up();
    await page.screenshot({path: screenshotPath + '/base--30.png'});
  });

  it('opens balloon when click on a point', async () => {
    await page.mouse.click(350, 250);
    await page.waitFor(200);
    await page.screenshot({path: screenshotPath + '/base--40.png'});
  });

  it('removes item when click on a remove button', async () => {
    const item1RemoveButton = await page.$('.list--item:nth-child(1) .list--button');
    item1RemoveButton.click();
    await page.waitFor(200);
    const item1Title = await page.$eval('.list--item:nth-child(1) .list--content', el => el.innerText);
    expect(item1Title).not.toEqual('Title 1');
    await page.screenshot({path: screenshotPath + '/base--50.png'});
  });
});
