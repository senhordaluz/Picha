import { PhotoResponse } from "@/responses";
import moment, { Moment } from "moment-timezone";

export default class Photo {
  constructor(response: PhotoResponse) {
    this.id = response.id;
    this.title = response.title;
    this.image_url = response.image_url;
    this.description = response.description;
    this.link = response.link;
    this.published = moment(response.published);
    this.created_on = moment(response.created_on);
    this.updated_on = moment(response.updated_on);
  }

  id: bigint;
  title: string;
  image_url: string;
  description: string;
  link: string;
  published: Moment;
  created_on: Moment;
  updated_on: Moment;

  get image_url_big() {
    return this.image_url.replace("_m.jpg", ".jpg");
  }

  get checkWhiteSpace(): boolean {
    return this.title.replace(/\s/g, '').length > 0;
  }

  get formatedPublishedDate(): string {
    const locale = process.env.VUE_APP_I18N_LOCALE || process.env.VUE_APP_I18N_FALLBACK_LOCALE || "pt-BR";
    switch (locale) {
      case "pt-BR":
        return this.published.locale('pt-BR').format("MMM. D, YYYY [às] h:mm A z");
      case "en":
      default:
        return this.published.locale('en').format("MMM. D, YYYY [at] h:mm A z");
    }
  }
}
