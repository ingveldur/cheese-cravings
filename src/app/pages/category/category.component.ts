import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "src/app/services/contentful.service";
import * as _ from "lodash";
import { Product } from "src/app/models/Product";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  public loading = true;
  public categoryData: any;
  public categories: any = [];
  public productsInCateogory: Product[] = [];

  // Filters
  public categoryFilter = "";

  constructor(
    private route: ActivatedRoute,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.contentfulService.getCheeseType(params.get("categoryId"))
        )
      )
      .subscribe(cheeseType => {
        const categoryData: any = cheeseType.fields;
        categoryData.categories.forEach(category => {
          this.categories.push({
            slug: category.fields.slug,
            title: category.fields.title
          });

          if (typeof category.fields.products !== "undefined") {
            category.fields.products.forEach(p => {
              const product = new Product();
              product.name = p.fields.name;
              product.price = p.fields.price;
              product.currency = p.fields.currency;
              product.image = p.fields.image.fields.file.url;
              product.category = category.fields.slug;
              this.productsInCateogory.push(product);
            });
          }
        });
        this.loading = false;
      });
  }

  filterByCategory(categoryId: string) {
    this.categoryFilter = categoryId;
  }
}
