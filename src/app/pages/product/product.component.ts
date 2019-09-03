import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ContentfulService } from "src/app/services/contentful.service";
import { switchMap } from "rxjs/operators";
import { Product } from "src/app/models/Product";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  public loading = true;
  public product: Product = null;
  public quantity = 1;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit() {
    console.log(this.router.url);

    if (typeof window.history.state.product === "undefined") {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return this.contentfulService.getProduct(params.get("productId"));
          })
        )
        .subscribe(response => {
          console.log(response[0]);
          // this.product = new Product();
          // this.product.slug = p.fields.slug;
          // this.product.name = p.fields.name;
          // this.product.price = p.fields.price;
          // this.product.currency = p.fields.currency;
          // this.product.image = p.fields.image.fields.file.url;
          // this.product.description =
          //   p.fields.description.content[0].content[0].value;
          // this.product.url = Constants.WEBSITE_URL + p.fields.url;
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
}
