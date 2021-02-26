import { collect, Collection } from "collect.js";

import { Pagination, Photo } from "@/models";
import { PhotoService } from "@/services";

export default abstract class PhotoRepository {

  /**
   * Resgata uma lista de Imagens
   */
  public static async list(params: any = null): Promise<Pagination<Photo>> {
    const response = await PhotoService.list(params);
    const results: Collection<Photo> = collect(response.results).map<Photo>(
      value => new Photo(value)
    );
    return {
        ...response,
        results,
    };
  }

  /**
   * Resgata próxima página
   */
  public static async next(pagination: Pagination<Photo>, params: any = null): Promise<Pagination<Photo>> {
    const response = await PhotoService.next(pagination.next!, params);
    const results: Collection<Photo> = collect(response.results).map<Photo>(
      value => new Photo(value)
    );
    return {
        ...response,
        results,
    };
  }

  /**
   * Resgata página anterior
   */
  public static async previous(pagination: Pagination<Photo>, params: any = null): Promise<Pagination<Photo>> {
    const response = await PhotoService.previous(pagination.previous!, params);
    const results: Collection<Photo> = collect(response.results).map<Photo>(
      value => new Photo(value)
    );
    return {
        ...response,
        results,
    };
  }

  /**
   * Serviço para resgatar informações completas de uma determinada Imagem
   * @param id ID da Imagem
   * @param ignoreCache Flag para ignorar resultados em cache
   * @param readOnError Flag para forçar leitura de cache em caso de falha na requisição
   */
  public static async get(
    id: bigint,
    ignoreCache = false,
    readOnError = false
  ): Promise<Photo> {
    const response = await PhotoService.get(id, ignoreCache, readOnError);
    return new Photo(response);
  }
}
