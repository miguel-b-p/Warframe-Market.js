// ...
import * as global from './global.js';
import { getConfigData } from './config_account.js';
import { decrypt } from './Crypt.js';
import fs from 'fs/promises';

export async function login_account() {
    global.clearConsole();
    await global.printAsciiArt();
    let req = global.chalk.hex('#8974F2')('Requesting URL:');

    try {
        const config = await getConfigData();
        const page = global.getPageInstance();

        const keysData = await fs.readFile('project\\keys.json', 'utf8');
        const { key, iv } = JSON.parse(keysData);
    
        const decryptedEmail = decrypt(config.database.email, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
        const decryptedPassword = decrypt(config.database.password, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));    

        const url = `https://warframe.market/auth/signin`;
        await global.loadingAnimation()
        console.error(req, url, '\x1B[1m\x1B[3m(Fazendo Login...)\x1B[23m\x1B[22m\n');
        await global.loadingAnimation()
        await global.axios.head(url);
        await page.goto(url);

        await page.waitForSelector('#LoginEmail');
        await page.waitForSelector('#LoginPassword');
        await page.waitForSelector('.login__actions > button:nth-child(1)');
        await page.type('#LoginEmail', decryptedEmail);
        await page.type('#LoginPassword', decryptedPassword);  
        await page.click('.login__actions > button:nth-child(1)');

        //* Privacy
        await page.waitForSelector('#ncmp__tool > div > div > div.ncmp__banner-actions > div.ncmp__banner-btns > button:nth-child(2)');
        await page.click('#ncmp__tool > div > div > div.ncmp__banner-actions > div.ncmp__banner-btns > button:nth-child(2)');

        //* Warframe.market is a fan site not associated with Digital Extremes
        await page.waitForSelector('#warframe_react > section > div.disclaimer--eheCu > button');
        await page.click('#warframe_react > section > div.disclaimer--eheCu > button');
        
        await page.waitForSelector('.nickname--sKj0R');
        let user_logged = await page.$eval('.nickname--sKj0R', element => element.textContent);

        return { user_logged };
    } catch (error) {
        if (error === 'canceled') {
            process.exit();
        }
        console.log(global.chalk.hex('#F52118')('An error was detected, for more information, check the "error.log" file.'));
        global.writeErrorLog(error);
        await global.waitForEnter();
        mainMenu(user_logged);
    }
}
