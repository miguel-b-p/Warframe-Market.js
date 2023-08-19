import * as global from './global.js';
import { mainMenu } from './main.js';

export async function post_item(user_logged) {
    global.clearConsole();
    await global.printAsciiArt();
    let req = global.chalk.hex('#8974F2')('Requesting URL:');

    try {
        const page = global.getPageInstance();
        const url = `https://warframe.market/`;
        await global.axios.head(url);
        await global.loadingAnimation();
        await page.goto(url);

        const elementXPath = '/html/body/section/section/section[2]/div[2]';
        const element = await page.$x(elementXPath);
        if (element.length > 0) {
            await element[0].click();
        } else {
            console.error('Element not found using XPath:', elementXPath);
        }
        await page.waitForSelector('.opened--LfN_k');
        console.log(global.chalk.hex('#7fa6eb')(`Digite o nome do item...`))
        const { nome_item } = await global.prompt.get({
            properties: {
                nome_item: {
                description: `${global.chalk.cyan('\n•-►')}`,
                required: true,
              }
            }
          });
        console.log('\n')
        await global.loadingAnimation();
        const ItemNameXPath = '//*[@id="warframe_react"]/section/section[2]/div[1]/div/div[2]/div[2]/div[2]/div/div/section/span/input';
        const inputItemNameXPath = await page.$x(ItemNameXPath);
        if (inputItemNameXPath.length > 0) {
            await inputItemNameXPath[0].type(nome_item);
        } else {
            console.error('Element not found using XPath:', ItemNameXPath);
        }

        global.clearConsole();
        await global.printAsciiArt();
        await global.loadingAnimation();
        console.log(global.chalk.bold(` Nome do Item:`), global.chalk.hex('#95f0b8')(`${nome_item} ${String.fromCodePoint(0x1F4DC)}`)); //📜 U+1F4DC
        console.log(global.chalk.hex('#7fa6eb')(`\nDigite a quantidade...`))
        const { quantidade_item } = await global.prompt.get({
            properties: {
                quantidade_item: {
                description: `${global.chalk.cyan('\n•-►')}`,
                required: true,
              }
            }
          });
          console.log('\n');
          await global.loadingAnimation();
          const ItemQuantityXPath = '//*[@id="orderQuantity"]';
          const inputItemQuantityXPath = await page.$x(ItemQuantityXPath);
          if (inputItemQuantityXPath.length > 0) {
              await inputItemQuantityXPath[0].type(quantidade_item);
          } else {
              console.error('Element not found using XPath:', ItemQuantityXPath);
          }

          global.clearConsole();
          await global.printAsciiArt();
          await global.loadingAnimation();
          console.log(global.chalk.bold(` Nome do Item:`), global.chalk.hex('#95f0b8')(`${nome_item} ${String.fromCodePoint(0x1F4DC)}`)); //📜 U+1F4DC
          console.log(global.chalk.bold(` Quantidade:`), global.chalk.hex('#919596')(`${quantidade_item} ${String.fromCodePoint(0x1F4E6)}`)); //📦 U+1F4E6
          console.log(global.chalk.hex('#7fa6eb')(`\nDigite o preço por unidade...`))
          const { preco_item } = await global.prompt.get({
              properties: {
                  preco_item: {
                  description: `${global.chalk.cyan('\n•-►')}`,
                  required: true,
                }
              }
            });
            console.log('\n');
            await global.loadingAnimation();
            const ItemPriceXPath = '//*[@id="orderItemPrice"]';
            const inputItemPriceXPath = await page.$x(ItemPriceXPath);
            if (inputItemPriceXPath.length > 0) {
                await inputItemPriceXPath[0].type(preco_item);
            } else {
                console.error('Element not found using XPath:', ItemPriceXPath);
            }

            global.clearConsole();
            await global.printAsciiArt();
            await global.loadingAnimation();
            console.log(global.chalk.bold(` Nome do Item:`), global.chalk.hex('#95f0b8')(`${nome_item} ${String.fromCodePoint(0x1F4DC)}`)); //📜 U+1F4DC
            console.log(global.chalk.bold(` Quantidade:`), global.chalk.hex('#919596')(`${quantidade_item} ${String.fromCodePoint(0x1F4E6)}`)); //📦 U+1F4E6
            console.log(global.chalk.bold(` Preço:`), global.chalk.hex('#cb4a9e')(`${preco_item} ${String.fromCodePoint(0x1F4B8)}`)); //💸 U+1F4B8
            console.log(global.chalk.hex('#7fa6eb')(`\nVocê quer vender ou comprar? `, global.chalk.hex('#ACCEC0')(`(1, Vender) `), global.chalk.hex('#CEACBA')(`(2, Comprar)`)))
            const { tipo } = await global.prompt.get({
                properties: {
                    tipo: {
                    description: `${global.chalk.cyan('\n•-►')}`,
                    required: true,
                  }
                }
            });
            console.log('\n');
            await global.loadingAnimation();

              //* Vender
            if (tipo === '1'){
                const ItemOrderTypeXPath = '/html/body/section/section/section[2]/div[1]/div/div[2]/div[2]/div[1]/div/div[1]/div/div/label[1]';
                const inputItemOrderTypeXPath = await page.$x(ItemOrderTypeXPath);
                if (inputItemOrderTypeXPath.length > 0) {
                    await inputItemOrderTypeXPath[0].click(ItemOrderTypeXPath);
                } else {
                    console.error('Element not found using XPath:', ItemOrderTypeXPath);
                }
            } else {
                //* Comprar
                const ItemOrderTypeXPath = '/html/body/section/section/section[2]/div[1]/div/div[2]/div[2]/div[1]/div/div[1]/div/div/label[2]';
                const inputItemOrderTypeXPath = await page.$x(ItemOrderTypeXPath);
                if (inputItemOrderTypeXPath.length > 0) {
                    await inputItemOrderTypeXPath[0].click(ItemOrderTypeXPath);
                } else {
                    console.error('Element not found using XPath:', ItemOrderTypeXPath);
                }
            }
            console.error(req, url, '\x1B[1m\x1B[3m(Postando item...)\x1B[23m\x1B[22m', '\n');
            const ItemPostXPath = '/html/body/section/section/section[2]/div[1]/div/div[2]/div[3]/div/button';
            const inputItemPostXPath = await page.$x(ItemPostXPath);
            if (inputItemPostXPath.length > 0) {
                await inputItemPostXPath[0].click(ItemPostXPath);
            } else {
                console.error('Element not found using XPath:', ItemPostXPath);
            }
            console.log('\n\x1B[1m\x1B[3m(Item postado!)\x1B[23m\x1B[22m');
            global.sleep(2000)
            await mainMenu(user_logged);
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