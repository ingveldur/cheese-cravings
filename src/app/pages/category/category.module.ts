import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryComponent } from "./category.component";
import { RouterModule } from "@angular/router";
import { PipesModule } from "src/app/pipes/pipes.module";

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: ":categoryId",
        component: CategoryComponent
      }
    ])
  ]
})
export class CategoryModule {}
