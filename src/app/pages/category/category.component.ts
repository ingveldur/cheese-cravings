import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "src/app/services/contentful.service";
import { Entry } from "contentful";
import * as _ from "lodash";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  public loading = true;
  public categoryData: any;
  public productsInCateogory: any = [];
  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService
      .getCheeseType("blue-cheese")
      .then(res => {
        this.categoryData = res.fields;
        console.log("categoryData", this.categoryData);

        this.categoryData.categories.forEach(element => {
          if (element.fields.products) {
            this.productsInCateogory = this.productsInCateogory.concat(
              element.fields.products
            );
          }
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
