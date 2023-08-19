import * as global from './global.js';

import { mainMenu } from './main.js';

let req = global.chalk.hex('#8974F2')('\nRequisitando URL:');

export async function action_account(user_logged, estatus_mensage) {
  global.prompt.message = '';
  global.prompt.delimiter = '';

  global.clearConsole();
  await global.printAsciiArt();
  await global.sleep(200);
  console.log(` \n  Olá! ${global.chalk.bold.hex('#9396E6')(user_logged)}, ${estatus_mensage} `)
  console.log(`\n 1 - Online in Game`);
  await global.sleep(100);
  console.log(` 2 - Online`);
  await global.sleep(100);
  console.log(` 3 - Invisible`);
  await global.sleep(100);
  console.log(` 4 - Cancelar`);

    const { choice } = await global.prompt.get({
      properties: {
        choice: {
          description: `${global.chalk.cyan('\n•-►')}`,
          required: true,
        }
      }
    });
    const input = choice.trim();
    if (input > '4') {
      console.log(`Escolha uma opção válida (1, 2, 3 ou 4)!`);
      await global.sleep(140);
      action_account(estatus_mensage, estatus_mensage);
    }
    if (input === '4') {
      await mainMenu(user_logged);
    }
    try {
      const page = global.getPageInstance();
  
      const url = `https://warframe.market`;
      console.log(await global.loadingAnimation());
      console.error(req, url, '\x1B[1m\x1B[3m(Fazendo ação...)\x1B[23m\x1B[22m', '\n');
      await global.loadingAnimation();
      await global.axios.head(url);

      if (input === '1') {
        //* Online in game
        const elementXPath = '/html/body/section/section/nav[2]/div/ul/li[4]/ul/li[2]';
        const elementHandle = await page.waitForXPath(elementXPath);
        await page.evaluate(element => element.click(), elementHandle);
        console.log('\n\x1B[1m\x1B[3m(Agora você esta "Online in Game"!)\x1B[23m\x1B[22m');
        await global.sleep(2000);

      } else if (input === '2') {
         //* Online
        const elementXPath = '/html/body/section/section/nav[2]/div/ul/li[4]/ul/li[1]';
        const elementHandle = await page.waitForXPath(elementXPath);
        await page.evaluate(element => element.click(), elementHandle);
        console.log('\n\x1B[1m\x1B[3m(Agora você esta "Online"!)\x1B[23m\x1B[22m');
        await global.sleep(2000);

      } else if (input === '3') {
        //* Invisible
        const elementXPath = '/html/body/section/section/nav[2]/div/ul/li[4]/ul/li[3]';
        const elementHandle = await page.waitForXPath(elementXPath);
        await page.evaluate(element => element.click(), elementHandle);
        console.log('\n\x1B[1m\x1B[3m(Agora você esta "Invisible"!)\x1B[23m\x1B[22m');
        await global.sleep(2000);
      }

    } catch (error) {
      if (error === 'canceled') {
        process.exit();
      }
      console.log(global.chalk.hex('#F52118')('Um erro foi detectado, para mais informação olhe o arquivo "error.log".'))
      global.writeErrorLog(error);
      await global.waitForEnter();
      process.exit();
    }
}