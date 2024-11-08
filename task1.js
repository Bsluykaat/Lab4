const { Builder, By, Browser } = require('selenium-webdriver');

async function main() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
        await driver.get('http://suninjuly.github.io/math.html');

        let xElement = await driver.findElement(By.id('input_value'));
        let xValue = await xElement.getText();
        let x = parseInt(xValue);

        let result = Math.log(Math.abs(12 * Math.sin(x)));

        let answerInput = await driver.findElement(By.id('answer'));
        await answerInput.sendKeys(result);

        let robotCheckbox = await driver.findElement(By.id('robotCheckbox'));
        await robotCheckbox.click();

        let robotsRuleRadioButton = await driver.findElement(By.id('robotsRule'));
        await robotsRuleRadioButton.click();

        let submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();
    } finally {
        await driver.quit();
    }
}

main()
