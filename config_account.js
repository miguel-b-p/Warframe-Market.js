import * as global from './global.js';
import { encrypt, createKeys } from './Crypt.js';
import fs from 'fs/promises';

const configPath = 'project\\config.json';

export async function getConfigData() {
    try {
        const configData = await fs.readFile(configPath, 'utf8');
        return JSON.parse(configData);
    } catch (error) {
        console.error('Error reading configuration file:', error);
        return null;
    }
}

export async function config_account() {
  global.prompt.message = ' ';
  global.prompt.delimiter = ' ';
  await global.printAsciiArt();
  try {
    console.log(`\n${global.chalk.hex('#4853b8')('Enter your email to log in to Warframe Market!')}`);
    const { email } = await new Promise((resolve) => {
      global.prompt.get({
        properties: {
          email: {
            description: `${global.chalk.cyan('\n•-►')}`,
            required: true,
          }
        }
      }, (error, result) => {
        if (error) {
          console.error('\nError obtaining configuration information:', error);
          throw error;
        } else {
          resolve(result);
        }
      });
    });

    console.log(`${global.chalk.hex('#4853b8')('\nEnter the password!')}`);
    const { password } = await new Promise((resolve) => {
      global.prompt.get({
        properties: {
          password: {
            description: `${global.chalk.cyan('\n•-►')}`,
            required: true,
            hidden: true
          }
        }
      }, (error, result) => {
        if (error) {
          console.error('\nError obtaining configuration information:', error);
          throw error;
        } else {
          resolve(result);
        }
      });
    });

    const config = await getConfigData();
    await createKeys();
    
    const keysData = await fs.readFile('project\\keys.json', 'utf8');
    const { key, iv } = JSON.parse(keysData);

    const encryptedEmail = encrypt(email, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    const encryptedPassword = encrypt(password, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));

    config.database.email = encryptedEmail;
    config.database.password = encryptedPassword;

    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
  } catch (error) {
    if (error === 'canceled') {
      process.exit();
    }
    console.log(global.chalk.hex('#F52118')('An error was detected, for more information, check the "error.log" file.'));
    global.writeErrorLog(error);
    await global.waitForEnter();
    await mainMenu(user_logged, user_status);
  }
}
