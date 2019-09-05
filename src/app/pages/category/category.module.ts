import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryComponent } from "./category.component";
import { RouterModule } from "@angular/router";
import { PipesModule } from "src/app/pipes/pipes.module";
import { Ng5SliderModule } from "ng5-slider";
import { FormsModule } from "@angular/forms";
import { ComponentModule } from "src/app/components/component.module";

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    PipesModule,
    Ng5SliderModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild([
      {
        path: "",
        component: CategoryComponent
      },
      {
        path: ":productId",
        loadChildren: () =>
          import("../product/product.module").then(m => m.ProductModule)
      }
    ])
  ]
})
export class CategoryModule {}
