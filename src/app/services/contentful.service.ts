import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

@Injectable({
  providedIn: "root"
})
export class ContentfulService {
  constructor(private http: HttpClient) {}

  getAllProducts(productId?: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      "/.netlify/functions/getProducts", // todo remove the localhost, use relative in prod
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: productId ? new HttpParams().set("id", productId) : null
      }
    );
  }

  getProduct(productId: string): Observable<Product[]> {
    return this.getAllProducts(productId);
  }

  getAllCategoriesInCheeseTypes(cheeseType?: string): Observable<Category[]> {
    return this.http.get<Category[]>(
      "/.netlify/functions/getCategoriesInCheeseType", // todo remove the localhost, use relative in prod
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: cheeseType ? new HttpParams().set("id", cheeseType) : null
      }
    );
  }

  getAllCategoriesInCheeseType(cheeseType: string): Observable<Category[]> {
    return this.getAllCategoriesInCheeseTypes(cheeseType);
  }
}
