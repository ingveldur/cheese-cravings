import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { isDevMode } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ContentfulService {
  private functionsUrl = "";
  private cheeseTypes = [];

  constructor(private http: HttpClient) {
    this.functionsUrl = isDevMode()
      ? "http://localhost:8888/.netlify/functions"
      : "/.netlify/functions";

    // TODO get from api
    this.cheeseTypes = [
      { id: "blue-cheese", name: "Blue cheese" },
      { id: "soft-cheese", name: "Soft cheese" },
      { id: "hard-cheese", name: "Hard cheese" }
    ];
  }

  getAllCheeseTypes(): any[] {
    return this.cheeseTypes;
  }

  getCheeseType(id: string): any {
    return this.getAllCheeseTypes().find(c => (c.id = id));
  }

  getAllProducts(productId?: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.functionsUrl}/getProducts`, {
      headers: {
        "Content-Type": "application/json"
      },
      params: productId ? new HttpParams().set("id", productId) : null
    });
  }

  getProduct(productId: string): Observable<Product[]> {
    return this.getAllProducts(productId);
  }

  getAllCategoriesInCheeseTypes(cheeseType?: string): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.functionsUrl}/getCategoriesInCheeseType`,
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
