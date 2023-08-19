import * as global from './global.js';

import { login_account } from './login_warframe_market.js';
import { searchProduct } from './search_warframe_market.js';
import { action_account } from './action_warframe_market.js';
import { post_item } from './post_warframe_market.js';
import { config_account, getConfigData } from './config_account.js';

let emoji_estatus;
let hexcolor_estatus;
let estatus_mensage;

async function status_check() {
  try {
    const page = global.getPageInstance();

    const url = `https://warframe.market`;
    await global.axios.head(url);

    await page.waitForSelector('#warframe_react > section > nav.menu--GTxoN > ul.menu-section--U34dF.grow > li:nth-child(7) > div > div > div');
    await global.sleep(2300);
    let user_status = await page.$eval('#warframe_react > section > nav.menu--GTxoN > ul.menu-section--U34dF.grow > li:nth-child(7) > div > div > div', element => element.textContent);
    
      switch (user_status.toUpperCase()) {
        case "ONLINE IN GAME":
          emoji_estatus = String.fromCodePoint(0x1F3AE); //🎮 U+1F3AE
          hexcolor_estatus = '#795fb5';
          estatus_mensage = global.chalk.hex(hexcolor_estatus)(`ONLINE IN GAME ${emoji_estatus}`);
          break;
        case "ONLINE":
          emoji_estatus = String.fromCodePoint(0x1F7E2); //🟢 U+1F7E2
          hexcolor_estatus = '#006400';
          estatus_mensage = global.chalk.hex(hexcolor_estatus)(`ONLINE ${emoji_estatus}`);
          break;
        case "INVISIBLE":
          emoji_estatus = String.fromCodePoint(0x1F47B); //👻 é U+1F47B.
          hexcolor_estatus = '#8b0000';
          estatus_mensage = global.chalk.hex(hexcolor_estatus)(`INVISIBLE ${emoji_estatus}`);
          break;
        default:
          emoji_estatus = String.fromCodePoint(0x2753); //❓ U+2753
          hexcolor_estatus = '#F52118';
          estatus_mensage = global.chalk.hex(hexcolor_estatus)(`ERROR ${emoji_estatus}`);
          break;
      }
  } catch (error) {
    if (error === 'canceled') {
      process.exit();
    }
    console.log(global.chalk.hex('#F52118')('Um erro foi detectado, para mais informação olhe o arquivo "error.log".'))
    global.writeErrorLog(error);
    await global.waitForEnter();
    await mainMenu(user_logged);
  }
}


export async function mainMenu(user_logged) {
  global.clearConsole();
  global.prompt.message = '';
  global.prompt.delimiter = '';
  await global.printAsciiArt();
  await global.sleep(200);
  console.log(`   Olá! ${global.chalk.bold.hex('#9396E6')(user_logged)}, ${estatus_mensage} `)
  console.log(`\n 1 - Pesquisar Itens`, global.chalk.hex('#ACCEC0')(`(Aqui você pode pesquisar alguns itens)`));
  await global.sleep(100);
  console.log(` 2 - Fazer encomenda`, global.chalk.hex('#ACCEC0')('(Aqui você pode postar itens que você quer vender ou comprar)'));
  await global.sleep(100);
  console.log(` 3 - Ações`, global.chalk.hex('#ACCEC0')('(Aqui você pode mudar o estatus de usuário)'));
  await global.sleep(100);
  console.log(` 4 - Mudar configurações de conta`);
  await global.sleep(100);
  console.log(` 5 - Sair\n`);

  try {
    const { choice } = await global.prompt.get({
        properties: {
          choice: {
            description: `${global.chalk.cyan('\n•-►')}`,
            required: true,
          }
        }
      });
    const input = choice.trim();

    if (input === '1') {
      global.clearConsole();
      await global.printAsciiArt();
      console.log(global.chalk.hex('#5253FA')('\nDigite o nome do item para buscar!\n'));
      const { productName } = await global.prompt.get({
        properties: {
          productName: {
            description: `${global.chalk.cyan('\n•-►')}`,
            required: true,
          }
        }
      });
      await searchProduct(global.formatInput(productName), user_logged);
    } else if (input === '2') {
      await post_item(user_logged);

    } else if (input === '3') {
      await action_account(user_logged, estatus_mensage);
      await status_check();
      await mainMenu(user_logged);
    } else if (input === '4') {
      console.log(global.chalk.red('\nVocê tem certeza? escreva Y para sim.'));
      const { confirm } = await global.prompt.get({
        properties: {
          confirm: {
            description: `${global.chalk.cyan('\n•-►')}`,
            required: false,
          }
        }
      });
      const input = confirm.toLowerCase();
      if (input === 'y' || input === 'yes') {
        global.clearConsole();
        await config_account();
        await mainMenu(user_logged);
      } else {
        await mainMenu(user_logged);
      }

    } else if (input === '5') {
      process.exit();
    } else {
      console.log(`Escolha uma opção válida (1, 2, 3, 4 ou 5)!`);
      await global.sleep(140);
      await mainMenu(user_logged);
    }

  } catch (error) {
    if(error === 'canceled') {
      process.exit();
    }
    console.log(global.chalk.hex('#F52118')('Um erro foi detectado, para mais informação olhe o arquivo "error.log".'))
    global.writeErrorLog(error);
    await global.waitForEnter();
    process.exit();
  }
}

async function startApp() {
  let config = await getConfigData();
  await global.startBrowser();
  try {
    global.clearConsole();
    process.stdout.write('\x1B]0;Ξ Warframe Market.js Ξ\x07');
    if (!config.database.email || !config.database.password) {
      await config_account();
      const { user_logged } = await login_account();
      await status_check();
      await mainMenu(user_logged);
    } else {
      const { user_logged } = await login_account();
      await status_check();
      await mainMenu(user_logged);
    }
  } catch (error) {
    if(error === 'canceled') {
      process.exit();
    }
    console.log(global.chalk.hex('#F52118')('Um erro foi detectado, para mais informação olhe o arquivo "error.log".'))
    global.writeErrorLog(error);
    await global.waitForEnter();
    process.exit();
  }
}

(async () => {
    await startApp();
})();