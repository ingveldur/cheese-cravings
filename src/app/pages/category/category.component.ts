import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "src/app/services/contentful.service";
import * as _ from "lodash";
import { Product } from "src/app/models/Product";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Options } from "ng5-slider";
import { Constants } from "../../../constants";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  public loading = true;
  public categoryId: string;
  public cheeseTypes: any = [];
  public categories: any = [];
  public productsInCateogory: Product[] = [];

  // Filters
  public categoryFilter = "";
  public sortByFilter = "price,asc";

  public sortByOptions = [
    {
      name: "Name ascending",
      value: "name,asc"
    },
    {
      name: "Name descending",
      value: "name,desc"
    },
    {
      name: "Price ascending",
      value: "price,asc"
    },
    {
      name: "Price descending",
      value: "price,desc"
    }
  ];

  minValue = 0;
  maxValue = 10; // todo get price range from products...

  options: Options = {
    floor: 0,
    ceil: 10,
    translate: (value: number): string => {
      return "$" + value;
    },
    getSelectionBarColor: (): string => {
      return "#DDCE9B";
    },
    getPointerColor: (): string => {
      return "#DDCE9B";
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentfulService: ContentfulService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.categoryId = params.get("categoryId");
          return this.contentfulService.getCheeseType(params.get("categoryId"));
        })
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
              console.log(p);
              const product = new Product();
              product.slug = p.fields.slug;
              product.name = p.fields.name;
              product.price = p.fields.price;
              product.currency = p.fields.currency;
              product.image = p.fields.image.fields.file.url;
              product.category = category.fields.slug;
              product.description =
                p.fields.description.content[0].content[0].value;
              product.url = Constants.WEBSITE_URL + p.fields.url;
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

  goToProduct(product: Product): void {
    console.log("product clicked: ", product);
    this.router.navigate([this.router.url, product.slug], {
      state: { product }
    });
  }
}
