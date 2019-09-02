import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "products",
    loadChildren: () =>
      import("./pages/products/products.module").then(m => m.ProductsModule)
  },
  {
    path: "category/:categoryId",
    loadChildren: () =>
      import("./pages/category/category.module").then(m => m.CategoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
