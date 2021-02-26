const { encrypt, decrypt } = require("encrypt-laravel-5");

export default class LocalStorage {
  /**
   * Salva objeto criptografado no local storage
   * @param key Chave de acesso ao item
   * @param value Objeto para salvar
   */
  public static setItem(key: string, value: any) {
    // let secret_key = encrypt(JSON.stringify(key), process.env.VUE_APP_KEY);
    const secret_value = encrypt(
      JSON.stringify(value),
      process.env.VUE_APP_KEY
    );
    localStorage.setItem(key, secret_value);
  }

  /**
   * Resgata objeto criptografado no local storage
   * @param key Chave de acesso ao item
   */
  public static getItem(key: string): any {
    // let secret_key = encrypt(JSON.stringify(key), process.env.VUE_APP_KEY);
    const ecrypted = localStorage.getItem(key);
    if (ecrypted == null) return null;
    try {
      const decrypted = decrypt(ecrypted, process.env.VUE_APP_KEY);
      if (decrypted == "") return null;
      return JSON.parse(decrypted);
    } catch (error) {
      return null;
    }
  }

  /**
   * Remove item do Local Storage
   * @param key Chave de acesso ao item
   */
  public static removeItem(key: string) {
    // let secret_key = encrypt(JSON.stringify(key), process.env.VUE_APP_KEY);
    localStorage.removeItem(key);
  }
}
