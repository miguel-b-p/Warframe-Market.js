import crypto from 'crypto';
import fs from 'fs/promises';

export async function createKeys() {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const keys = { key: key.toString('hex'), iv: iv.toString('hex') };
  await fs.writeFile('project\\keys.json', JSON.stringify(keys, null, 2), 'utf-8');
}

export function encrypt(data, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

export function decrypt(encryptedData, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return decryptedData;
}