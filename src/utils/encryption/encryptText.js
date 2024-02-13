import crypto from "crypto-js";

export const getEncryptedText = (text, key) => {
  const cipher = crypto.AES.encrypt(text, key).toString();
  return cipher
};

export const getDecryptedText = (value, key) => {
  return crypto.AES.decrypt(value,key).toString(crypto.enc.Utf8);
};
