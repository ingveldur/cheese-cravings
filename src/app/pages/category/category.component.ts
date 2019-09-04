import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "src/app/services/contentful.service";
import * as _ from "lodash";
import { Product } from "src/app/models/Product";
import { ActivatedRoute, Router } from "@angular/router";
import { Options } from "ng5-slider";
import { Category } from "src/app/models/Category";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  public loading = true;
  public categoryId: string;
  public categories: any = [];
  public cheeseTypes: any = [];
  public productsInCategory: Product[] = [];

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
    this.categoryId = this.route.snapshot.paramMap.get("categoryId");
    this.cheeseTypes = this.contentfulService.getAllCheeseTypes();
  }

  ngOnInit() {
    this.contentfulService
      .getAllCategoriesInCheeseType(this.categoryId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        categories.forEach(category => {
          this.productsInCategory = this.productsInCategory.concat(
            category.products
          );
        });
        this.loading = false;
      });
  }

  filterByCategory(categoryId: string) {
    this.categoryFilter = categoryId;
  }

  goToProduct(product: Product): void {
    this.router.navigate([this.router.url, product.id], {
      state: { product }
    });
  }
}
