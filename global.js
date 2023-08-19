import puppeteer from 'puppeteer';
import chalk from 'chalk';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import clipboardy from 'clipboardy';
import prompt from 'prompt';
import { startBrowser, getBrowserInstance, getPageInstance } from './puppeteerUtils.js';

export let version = '3.87 (Beta)';

export const sleep = promisify(setTimeout);

export let __filename = fileURLToPath(import.meta.url);
export let __dirname = path.dirname(__filename);

export function formatInput(input) {
  return input.toLowerCase().replace(/\s+/g, '_');
}

export function clearConsole() {
  console.clear();
}

export function formatVariableName(variableName) {
  return variableName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .replace(/\s+/g, ' ');
}

export async function printAsciiArt() {
  const colorAscii = chalk.hex('#3762ae');
  const asciiArt = `\n  ╦ ╦┌─┐┬─┐┌─┐┬─┐┌─┐┌┬┐┌─┐  ╔╦╗┌─┐┬─┐┬┌─┌─┐┌┬┐ ┬┌─┐
  ║║║├─┤├┬┘├┤ ├┬┘├─┤│││├┤   ║║║├─┤├┬┘├┴┐├┤  │  │└─┐
  ╚╩╝┴ ┴┴└─└  ┴└─┴ ┴┴ ┴└─┘  ╩ ╩┴ ┴┴└─┴ ┴└─┘ ┴o└┘└─┘\n`;
                                                                                  
  console.log(colorAscii(asciiArt));
  //                                     💻 U+1F4BB                                                    🎉 U+1F389
  console.log(` based_miguelin ${String.fromCodePoint(0x1F4BB)} | Projeto na versão ${version} ${String.fromCodePoint(0x1F389)}\n`);
}

export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function writeErrorLog(error) {
  const currentDate = getCurrentDate();
  const logText = `
[log ${currentDate}]
${error.stack}
==============================================================
  `;

  fs.appendFile(path.join(__dirname, 'error.log'), logText, (err) => {});
}

export async function waitForEnter() {
  prompt.message = '';
  prompt.delimiter = '';
  const { confirm } = await prompt.get({
    properties: {
      confirm: {
        description: chalk.cyan('\n•-► Aperte "ENTER" para continuar ◄-•\n'),
      }
    }
  });
}

export async function loadingAnimation() {
  const loadingFrames = [
    String.fromCodePoint(0x287F), // ⢿ U+287F
    String.fromCodePoint(0x28FB), // ⣻ U+28FB
    String.fromCodePoint(0x28FD), // ⣽ U+28FD
    String.fromCodePoint(0x28FE), // ⣾ U+28FE
    String.fromCodePoint(0x28F7), // ⣷ U+28F7
    String.fromCodePoint(0x28AF), // ⣯ U+28AF
];
  let i = 0;
  while (i < loadingFrames.length) {
    process.stdout.write('\r' + chalk.rgb(55, 98, 174)('Carregando ' + loadingFrames[i]));
    await sleep(100);
    i++;
  }
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  return ('');
}

export { startBrowser, getBrowserInstance, getPageInstance, prompt, chalk, puppeteer, axios, fs, path, fileURLToPath, promisify, clipboardy};