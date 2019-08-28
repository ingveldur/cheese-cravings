import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryComponent } from "./category.component";
import { RouterModule } from "@angular/router";
import { PipesModule } from "src/app/pipes/pipes.module";
import { Ng5SliderModule } from "ng5-slider";

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    PipesModule,
    Ng5SliderModule,
    RouterModule.forChild([
      {
        path: ":categoryId",
        component: CategoryComponent
      }
    ])
  ]
})
export class CategoryModule {}
