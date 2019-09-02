import { Injectable } from "@angular/core";
import { createClient, Entry } from "contentful";

const CONFIG = {
  space: "xofor6t276q8",
  accessToken: "Dbw9S4BO-79LLwhMpRx4vvZXFhSAbZA4RfpbvJNLR4o",

  contentTypeIds: {
    cheeseType: "cheeseType",
    category: "category",
    product: "product"
  }
};

@Injectable({
  providedIn: "root"
})
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() {}

  getCheeseTypes(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            include: 3,
            content_type: CONFIG.contentTypeIds.cheeseType
          },
          query
        )
      )
      .then(res => res.items);
  }

  getCheeseType(categoryId: string): Promise<Entry<Entry<any>>> {
    return this.getCheeseTypes({ "fields.slug": categoryId }).then(
      items => items[0]
    );
  }

  getProducts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            // include: 3,
            content_type: CONFIG.contentTypeIds.product
          },
          query
        )
      )
      .then(res => res.items);
  }

  getProduct(productId: string): Promise<Entry<any>> {
    return this.getProducts({ "fields.slug": productId }).then(
      items => items[0]
    );
  }
}
