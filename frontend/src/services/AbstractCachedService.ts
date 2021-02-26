import { setup } from "axios-cache-adapter";
import localforage from "localforage";
const memoryDriver = require("localforage-memoryStorageDriver");

export default abstract class AbstractCachedService {
  protected static timeout: number = 60 * 1000; // 60 segundos
  protected static cacheTime: number = 15 * 60 * 1000; // 15 minutos

  /**
   * get
   * Generic method to get information from API.
   *
   * @param path
   * @param query
   * @param decode
   */
  public static async get(
    path: string,
    ignoreCache: boolean,
    readOnError: boolean,
    query?: any
  ) {
    if (!navigator.onLine) {
      ignoreCache = false;
      if (process.env.VUE_APP_DEBUG === "true")
        console.log("Modo Offline\n Cache habilitado");
    }
    const client = await this.buildClient(ignoreCache, readOnError);

    let response: any;

    try {
      if (query) query.format = "json";
      else query = { format: "json" };
      response = await client.get(path, { params: query });
      if (response.status >= 200 && response.status < 300) {
        if (response.status == 204) return null;
        return response.data;
      }
    } catch (error) {
      console.log(this.getResponseMessage(error.response));
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error.response);
      throw error.response?.status || 500;
      try {
        console.log(this.getResponseMessage(error.response));
        console.log(error.response.data);
        // console.error(error);
        throw new Error("erro");
      } catch (e) {
        throw new Error("erro");
        console.error(error);
      }
    }
  }

  /**
   * post
   * Generic method to post information on API.
   *
   * @param path
   * @param query
   * @param decode
   */
  public static async post(path: string, query?: any) {
    const client = await this.buildClient(true, false);

    let response: any;

    try {
      response = await client.post(path, query);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      console.log(this.getResponseMessage(error.response));
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error.response);
      throw error.response?.status || 500;
    }
  }

  /**
   * put
   * Generic method to put information on API.
   *
   * @param path
   * @param query
   * @param decode
   */
  public static async put(path: string, query?: any) {
    const client = await this.buildClient(true, false);

    let response: any;

    try {
      response = await client.put(path, query);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      console.log(this.getResponseMessage(error.response));
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error.response);
      throw error.response?.status || 500;
    }
  }

  /**
   * patch
   * Generic method to put information on API.
   *
   * @param path
   * @param query
   * @param decode
   */
  public static async patch(path: string, query?: any) {
    const client = await this.buildClient(true, false);

    let response: any;

    try {
      response = await client.patch(path, query);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      console.log(this.getResponseMessage(error.response));
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error.response);
      throw error.response?.status || 500;
    }
  }

  /**
   * delete
   *
   *
   * @param path
   * @param query
   */
  public static async delete(path: string, query?: any) {
    const client = await this.buildClient(true, false);

    let response: any;

    try {
      response = await client.delete(path, { params: query });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      console.log(this.getResponseMessage(error.response));
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error.response);
      throw error.response?.status || 500;
    }
  }

  /**
   * buildClient
   * Base method to create a axios instance
   *
   * @return Axios
   */
  protected static async buildClient(ignoreCache = false, readOnError = false) {
    // Register the custom `memoryDriver` to `localforage`
    await localforage.defineDriver(memoryDriver);
    if (process.env.VUE_APP_DEBUG === "true")
      console.log("Ignora cache: ", ignoreCache);

    // Create `localforage` instance
    const forageStore = localforage.createInstance({
      // List of drivers used
      driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        memoryDriver._driver
      ],
      // Prefix all storage keys to prevent conflicts
      name: "sigelu-obras-cache"
    });

    // Create `axios` instance with pre-configured `axios-cache-adapter` using a `localforage` store
    return setup({
      // `axios` options
      baseURL: this.getBaseUri(),
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      withCredentials: false,
      timeout: this.timeout,

      // `axios-cache-adapter` options
      cache: {
        maxAge: this.cacheTime,
        store: forageStore, // Pass `localforage` store to `axios-cache-adapter`
        // Attempt reading stale cache data when response status is either 4xx or 5xx
        readOnError: readOnError,
        // Deactivate `clearOnStale` option so that we can actually read stale cache data
        clearOnStale: false,
        debug: process.env.VUE_APP_DEBUG === "true" || false,
        // Tell adapter to attempt using response headers
        // readHeaders: true,
        exclude: {
          query: false
        },
        ignoreCache
      }
    });
  }

  /**
   * getBaseUri
   * Base method to retrieve api base url (abstract)
   *
   * @return string
   */
  protected static getBaseUri(): string {
    return process.env.VUE_APP_API_URL || "/api/";
  }

  /**
   * getResponseMessage
   * Resgata mensagem de erro
   *
   * @param response
   */
  protected static getResponseMessage(response: any) {
    let message = "";
    if (response?.data?.code == 410) {
      try {
        console.log(JSON.parse(response.data.api_message));
        message = JSON.parse(response.data.api_message).message;
      } catch (e) {
        message = response?.data?.message;
      }
    } else {
      try {
        console.log(JSON.parse(response.data.message));
        message = JSON.parse(response.data.message).message;
      } catch (e) {
        message = response?.data?.message;
      }
    }
    return message;
  }
}
