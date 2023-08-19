import * as global from './global.js';


let browserInstance;
let pageInstance;

export async function startBrowser() {
  browserInstance = await global.puppeteer.launch({
    headless: false, 
    defaultViewport: null,
  });
  
  pageInstance = await browserInstance.newPage();
  
  return browserInstance;
}

export function getBrowserInstance() {
  return browserInstance;
}

export function getPageInstance() {
  return pageInstance;
}