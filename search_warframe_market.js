import * as global from './global.js';

import { mainMenu } from './main.js';

export async function searchProduct(productName, user_logged) {
    global.clearConsole();
    await global.printAsciiArt();
    let req = global.chalk.hex('#8974F2')('Requisitando URL:');
  
    try {
      const page = global.getPageInstance();
      const item = global.formatVariableName(productName);
  
      const url = `https://warframe.market/items/${productName}`;
      await global.loadingAnimation()
      console.error(req, url,'\x1B[1m\x1B[3m(Verificando Existência)\x1B[23m\x1B[22m\n');
      await global.loadingAnimation()
      await global.axios.head(url);
      await page.goto(url);
      //* userSeller_
      await page.waitForSelector('div.order-row--Alcph:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > span:nth-child(2)');
      //* onlinestatus_
      await page.waitForSelector('div.order-row--Alcph:nth-child(1) > div:nth-child(2) > div:nth-child(1)');
      //* userReputation_
      await page.waitForSelector('div.order-row--Alcph:nth-child(1) > div:nth-child(3) > div:nth-child(1)');
      //* platinumPrice_
      await page.waitForSelector('div.order-row--Alcph:nth-child(1) > div:nth-child(4) > div:nth-child(1) > b:nth-child(1)');
  
      const searchResult = await page.evaluate((item) => {
        const userSeller_ = document.querySelector(
          'div.order-row--Alcph:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > span:nth-child(2)'
        );
        const onlinestatus_ = document.querySelector(
          'div.order-row--Alcph:nth-child(1) > div:nth-child(2) > div:nth-child(1)'
        );
        const userReputation_ = document.querySelector(
          'div.order-row--Alcph:nth-child(1) > div:nth-child(3) > div:nth-child(1)'
        );
        const platinumPrice_ = document.querySelector(
          'div.order-row--Alcph:nth-child(1) > div:nth-child(4) > div:nth-child(1) > b:nth-child(1)'
        );
  
        const userSeller = userSeller_ ? userSeller_.innerText : 'Não encontrado';
        const onlinestatus = onlinestatus_ ? onlinestatus_.innerText : 'Não encontrado';
        const userReputation = userReputation_ ? userReputation_.innerText : 'Não encontrado';
        const platinumPrice = platinumPrice_ ? platinumPrice_.innerText : 'Não encontrado';
  
        return {
          userSeller,
          onlinestatus,
          userReputation,
          platinumPrice,
          item,
        };
      }, item);
  
      let mem_warframe = global.chalk.hex('#EBE289')(`[ ${String.fromCodePoint(0x2728)} \x1B[1m\x1B[3mWarframe\x1B[23m\x1B[22m ${String.fromCodePoint(0x2728)} ]`); //✨ U+2728
      let warframes = [
        'Ash', 'Atlas', 'Banshee', 'Baruuk', 'Chroma', 'Ember', 'Equinox',
        'Frost', 'Gara', 'Garuda', 'Gauss', 'Grendel', 'Harrow', 'Hildryn', 'Hydroid',
        'Inaros', 'Ivara', 'Khora', 'Lavos', 'Limbo', 'Loki', 'Mag', 'Mesa', 'Mirage',
        'Nekros', 'Nezha', 'Nidus', 'Nova', 'Nyx', 'Oberon', 'Octavia', 'Protea', 'Revenant',
        'Rhino', 'Saryn', 'Sevagoth', 'Titania', 'Trinity', 'Valkyr', 'Vauban', 'Volt',
        'Wisp', 'Wukong', 'Xaku', 'Zephyr'
      ];
      let item_ = searchResult.item;
      
      if (typeof item_ === 'string' && warframes.some(warframe => item_.includes(warframe))) {
        item_ = global.chalk.hex('#EBD237')(`${item_} ${mem_warframe}`);
      } else {
        item_ = global.chalk.hex('#6AF5AF')(`${item_} ${String.fromCodePoint(0x1F4E6)}`); //📦 U+1F4E6
      }
  
      let correct_vault = `${productName}`;
      correct_vault = correct_vault.replace(/_set/g, "_blueprint");
      let vault;
  
      if (correct_vault.includes("prime")) {
        const vault_url = `https://warframe.market/items/${correct_vault}/dropsources`;
        await global.loadingAnimation()
        console.error(req, vault_url, '\x1B[1m\x1B[3m(Verificando Vault)\x1B[23m\x1B[22m\n');
        await global.axios.head(vault_url);
        await page.goto(vault_url);
        vault = await page.evaluate(() => {
          const vault_ = document.querySelector('.relic-vaulted--OSuN8');
          const vault_check = vault_ ? vault_.innerText : '1';
  
          let emoji_vault = String.fromCodePoint(0x1F30C); //🌌 U+1F30C
          let hexcolor_vault;
          let vault_mensagem;
  
          if (vault_check === '1') {
            hexcolor_vault = '#54F080';
            vault_mensagem = `O item não está em vault!`;
          } else {
            hexcolor_vault = '#F05555';
            vault_mensagem = `O item está em vault!`;
          }
  
          return {
            vault_check,
            vault_mensagem,
            emoji_vault,
            hexcolor_vault,
          };
        });
      }
  
      let emoji_estatus;
      let hexcolor_estatus;
      switch (searchResult.onlinestatus) {
        case "ONLINE IN GAME":
          emoji_estatus = String.fromCodePoint(0x1F3AE); //🎮 U+1F3AE
          hexcolor_estatus = '#795fb5';
          break;
        case "ONLINE":
          emoji_estatus = String.fromCodePoint(0x1F7E2); //🟢 U+1F7E2
          hexcolor_estatus = '#006400';
          break;
        case "OFFLINE":
          emoji_estatus = String.fromCodePoint(0x1F534); //🔴 U+1F534
          hexcolor_estatus = '#8b0000';
          break;
        default:
          emoji_estatus = String.fromCodePoint(0x2753); //❓ U+2753
          break;
      }
  
      let emoji_reputacao;
      let hexcolor_reputacao;
  
      if (searchResult.userReputation > 5) {
        emoji_reputacao = String.fromCodePoint(0x1F604); //😀 U+1F604
        hexcolor_reputacao = '#01a067';
      } else {
        emoji_reputacao = String.fromCodePoint(0x1F610); //😐 U+1F610
        hexcolor_reputacao = '#6d8890';
      }
  
      const vendedor = global.chalk.hex('#3c879c')(`${searchResult.userSeller} ${String.fromCodePoint(0x1F464)}`); //👤 U+1F464
      const estatus = global.chalk.hex(`${hexcolor_estatus}`)(`${searchResult.onlinestatus} ${emoji_estatus}`);
      const reputacao = global.chalk.hex(`${hexcolor_reputacao}`)(`${searchResult.userReputation} ${emoji_reputacao}`);
      const platinum = global.chalk.hex('#cb4a9e')(`${searchResult.platinumPrice} ${String.fromCodePoint(0x1F4B8)}`); //💸 U+1F4B8
      const vault_ = correct_vault.includes("prime") ? `Vault: ${global.chalk.hex(`${vault.hexcolor_vault}`)(`${vault.vault_mensagem} ${vault.emoji_vault}`)}` : '';
      
      console.log(`  Vendedor: ${vendedor}
  Estatus: ${estatus}
  Reputação: ${reputacao}
  Preço: ${platinum}
  Item: ${item_}
  ${vault_}`);
      
      const message = `/w ${searchResult.userSeller} Hi! I want to buy: "${searchResult.item}" for ${searchResult.platinumPrice} platinum. (warframe.market)`;
      console.log(global.chalk.hex('#00CC66')('\n• Contato: ', message));
      console.log(global.chalk.hex('#9933FF')('\n(Escreva "Y" para copiar!)\n'));
  
      const { confirm } = await global.prompt.get({
        properties: {
          confirm: {
            description: `${global.chalk.cyan('\n•-►')}`,
            required: false,
          }
        }
      });
      const input = confirm.toLowerCase();
  
      if (input === "y") {
        global.clipboardy.write(message);
        console.log('\n\x1B[1m\x1B[3m(Mensagem Copiada!)\x1B[23m\x1B[22m');
        await global.sleep(2000);
        await mainMenu(user_logged);
      } else {
        await mainMenu(user_logged);
      }
    } catch (error) {
      if(error === 'canceled') {
        process.exit();
      }
      console.log(global.chalk.hex('#F52118')('Um erro foi detectado, para mais informação olhe o arquivo "error.log".'))
      global.writeErrorLog(error);
      await global.waitForEnter();
      await mainMenu(user_logged);
    }
}