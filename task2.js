const { Builder, By, Browser } = require('selenium-webdriver');

async function main() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
        await driver.get('http://demo-store.seleniumacademy.com/');

        // Перехід по всіх сторінках проєкту
        let links = await driver.findElements(By.css('.nav-5 a'));
        
        for (let link of links) {
            await link.click();
            await driver.sleep(2000); // Затримка для перевірки сторінки
            await driver.navigate().back();
        }

        // Реєстрація нового користувача
        await driver.navigate().to('http://demo-store.seleniumacademy.com/customer/account/create/')

        await driver.findElement(By.id('firstname')).sendKeys('John');
        await driver.findElement(By.id('lastname')).sendKeys('Doe');
        await driver.findElement(By.id('middlename')).sendKeys('Someone')
        await driver.findElement(By.id('email_address')).sendKeys('exampl@example.com');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.id('confirmation')).sendKeys('password123');
        
        await driver.findElement(By.css('button[title="Register"]')).click();
        
        console.log(await driver.getCurrentUrl());

        // Довільний функціонал - Додавання товару в кошик
        await driver.get('http://demo-store.seleniumacademy.com');
        let productLink = await driver.findElement(By.partialLinkText('View All'));
        await productLink.click();

        let addToCartButton = await driver.findElement(By.css('button[title="Add to Cart"]'));
        await addToCartButton.click();

        // Перевірка наявності товару в кошику
        let cartLink = await driver.findElement(By.className('header-minicart'));
        await cartLink.click();
        await driver.sleep(2000);
    } finally {
        //await driver.quit();
    }
}

main()