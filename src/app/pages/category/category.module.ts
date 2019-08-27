import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryComponent } from "./category.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "../home/home.component";

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ":categoryId",
        component: CategoryComponent
      }
    ])
  ]
})
export class CategoryModule {}
