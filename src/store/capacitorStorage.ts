// src/capacitorStorage.ts
import { Storage } from '@capacitor/storage';

export const capacitorStorage = {
  async getItem(key: string) {
    const { value } = await Storage.get({ key });
    return value;
  },
  async setItem(key: string, item: string) {
    await Storage.set({ key, value: item });
  },
  async removeItem(key: string) {
    await Storage.remove({ key });
  }
};
