import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContentfulService } from "src/app/services/contentful.service";
import { Product } from "src/app/models/Product";
import { Location } from "@angular/common";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  public loading = true;
  public cheeseType;
  public productId;

  public product: Product = null;
  public quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private contentfulService: ContentfulService
  ) {
    this.productId = this.route.snapshot.paramMap.get("productId");
    this.cheeseType = this.contentfulService.getCheeseType(
      this.route.snapshot.paramMap.get("categoryId")
    );
  }

  ngOnInit() {
    if (typeof window.history.state.product === "undefined") {
      this.contentfulService.getProduct(this.productId).subscribe(response => {
        this.product = response[0];
        this.loading = false;
      });
    } else {
      this.product = window.history.state.product;
      this.loading = false;
    }
  }

  updateQuantity(value) {
    this.quantity += value;
  }

  goBack() {
    this.location.back();
  }
}
