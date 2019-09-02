import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/Product";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loading = true;

    this.productsService.getAllProducts().subscribe(products => {
      console.log("PRODUCTS", products);
      this.loading = false;
      this.products = products;
    });
  }
}
