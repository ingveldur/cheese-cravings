import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryToolbarComponent } from "./category-toolbar/category-toolbar.component";
import { RouterModule } from "@angular/router";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
    CategoryToolbarComponent,
    BreadcrumbsComponent,
    HeaderComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [CategoryToolbarComponent, BreadcrumbsComponent, HeaderComponent]
})
export class ComponentModule {}
