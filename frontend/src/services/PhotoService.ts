import AbstractCachedService from "./AbstractCachedService";
import AbstractService from "./AbstractService";
import { PaginationResponse, PhotoResponse } from "@/responses";

export default abstract class PhotoService {
  static resource = "photo";

  /**
   * Resgata uma lista da entidade na API
   */
  public static async list(
    params: any = null
  ): Promise<PaginationResponse<PhotoResponse>> {
    const response = await AbstractService.get(this.resource, params);
    return response;
  }

  /**
   * Resgata próxima pagina na API
   */
  public static async next(
    nextUrl: string,
    params: any = null
  ): Promise<PaginationResponse<PhotoResponse>> {
    const response = await AbstractService.rawGet(nextUrl, params);
    return response;
  }

  /**
   * Resgata pagina anterior na API
   */
  public static async previous(
    previousUrl: string,
    params: any = null
  ): Promise<PaginationResponse<PhotoResponse>> {
    const response = await AbstractService.rawGet(previousUrl, params);
    return response;
  }

  /**
   * Resgata uma única entidade pela API
   * @param id ID da Entidade
   * @param ignoreCache Flag para ignorar resultados em cache
   * @param readOnError Flag para forçar leitura de cache em caso de falha na requisição
   */
  public static async get(
    id: bigint,
    ignoreCache: boolean,
    readOnError: boolean
  ): Promise<PhotoResponse> {
    return await AbstractCachedService.get(
      `${this.resource}/${id}`,
      ignoreCache,
      readOnError
    );
  }
}
