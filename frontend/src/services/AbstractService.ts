import axios from "axios";

export default abstract class AbstractService {
  protected static timeout: number = 60 * 1000; // 60 segundos

  /**
   * get
   * Generic method to get information from API.
   *
   * @param path
   * @param query
   * @param decode
   */
  public static async get(path: string, query?: any) {
    const client = this.buildClient();

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
   * get
   * Generic method to get information from API.
   *
   * @param url
   * @param query
   */
  public static async rawGet(url: string, query?: any) {
    const client = this.buildClient(true);

    let response: any;

    try {
      if (query) query.format = "json";
      else query = { format: "json" };
      response = await client.get(url, { params: query });
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
    const client = this.buildClient();

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
    const client = this.buildClient();

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
    const client = this.buildClient();

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
    const client = this.buildClient();

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
  protected static buildClient(ignoreBaseURL = false) {
    return axios.create({
      baseURL: ignoreBaseURL ? undefined : this.getBaseUri(),
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      withCredentials: false,
      timeout: this.timeout
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
