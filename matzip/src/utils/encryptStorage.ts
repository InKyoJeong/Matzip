import EncryptedStorage from 'react-native-encrypted-storage';

async function setEncryptStorage<T>(key: string, data: T) {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
}

async function getEncryptStorage(key: string) {
  const storedData = await EncryptedStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : null;
}

async function removeEncryptStorage(key: string) {
  const data = await getEncryptStorage(key);

  if (data) {
    await EncryptedStorage.removeItem(key);
  }
}

export {setEncryptStorage, getEncryptStorage, removeEncryptStorage};
