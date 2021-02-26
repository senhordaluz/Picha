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
}
