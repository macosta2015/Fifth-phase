const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
    try {
        const browser = await puppeteer.launch({
            defaultViewport: { width: 800, height: 800 },
            headless: false,
            userDataDir: '/Users/marioacosta/Library/Application Support/Google/Chrome/Profile 1'
        });

        const newPage = await browser.newPage();

        await newPage.goto('https://cad.onshape.com/documents?resourceType=resourcecompanyowner&nodeId=65efc5e06e5bec02f57742fe', { waitUntil: 'networkidle0', timeout: 0 });

        await newPage.type('input[name="email"].form-control', process.env.EMAIL);
        await newPage.type('input[name="password"].form-control', process.env.PASSWORD);

        console.log(await newPage.$eval('input[name="email"].form-control', input => input.getBoundingClientRect()));
        console.log(await newPage.$eval('input[name="password"].form-control', input => input.getBoundingClientRect()));

        await newPage.click('button.btn.btn-primary.os-signin-button');
        console.log(await newPage.$eval('button.btn.btn-primary.os-signin-button', button => button.getBoundingClientRect()));

        await new Promise(resolve => setTimeout(resolve, 5000));

        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.documents-filter-icon')[2];
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                console.log(thirdButton.getBoundingClientRect());
            } else {
                console.error('Third button not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.documents-filter-icon')[2];
            if (thirdButton) {
                thirdButton.click();
            } else {
                console.error('Third button not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        await newPage.evaluate(() => {
            const documentNameElement = document.querySelector('span[aria-label="Document name: Scale Sketch Example - Copy - Copy"][ng-bind-html="document.resultHighlight"]');
            // const documentNameElement = document.querySelector('span[aria-label="Document name: Scale Sketch Example - Copy"][ng-bind-html="document.resultHighlight"]');
            if (documentNameElement) {
                documentNameElement.click();
            } else {
                console.error('Element with text "Scale Sketch Example - Copy - Copy" not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 3000));

        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.os-list-item-name')[2];
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                console.error('Third button not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        await newPage.evaluate(() => {
            const fifthButton = document.querySelectorAll('.os-list-item-name')[5];
            if (fifthButton) {
                fifthButton.click();
            } else {
                console.error('Fifth button not found.');
            }
        });

        await newPage.click('div[data-id="Dg4JdGx6jlZTm4XD"]', { button: 'right' });

        await new Promise(resolve => setTimeout(resolve, 10000));

        await newPage.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await newPage.waitForSelector('.context-menu-item-span', { visible: true });

        await new Promise(resolve => setTimeout(resolve, 5000));

        const editOptions = await newPage.evaluate(() => {
            const menuItems = document.querySelectorAll('.context-menu-item-span');
            return Array.from(menuItems).map(item => item.textContent.trim());
        });

        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Edit options:', editOptions);

        const desiredEditOption = 'Edit…';
        const desiredEditOptionIndex = editOptions.indexOf(desiredEditOption);
        if (desiredEditOptionIndex !== -1) {
            const editOptionElement = await newPage.evaluateHandle((index) => {
                const menuItems = document.querySelectorAll('.context-menu-item-span');
                return menuItems[index];
            }, desiredEditOptionIndex);

            if (editOptionElement) {
                await editOptionElement.click();
            } else {
                console.error(`${desiredEditOption} option element not found.`);
            }
        } else {
            console.error(`${desiredEditOption} option not found.`);
        }


        //COMMAND FOR SEARCHING TRANSFORM AND THEN CLICKING ON IT 
        console.log('//COMMAND FOR SEARCHING TRANSFORM AND THEN CLICKING ON IT ');
        await newPage.click('button.command-search-trigger');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await newPage.type('.os-search-box-input', 'transform');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await newPage.keyboard.press('Enter');
        await newPage.mouse.move(290, 311);
        await newPage.mouse.down({ button: 'left' });
        console.log('Mouse clicked and held at X:290, Y:311');
        await new Promise(resolve => setTimeout(resolve, 3000));
        const readline = require('readline');
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        console.log('Please press the Enter key to continue...');
        const enterPromise = new Promise(resolve => rl.once('line', resolve));
        await enterPromise;
        console.log('User pressed Enter to continue.');
        await newPage.evaluate(() => {
            document.addEventListener('mousemove', (event) => {
                console.log(`Mouse coordinates: X = ${event.clientX}, Y = ${event.clientY}`);
            });
        });





        console.log('Move the mouse over the page to see the coordinates...');

        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Script completed successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
