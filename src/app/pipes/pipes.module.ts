import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterByCategoryPipe } from "./filter-by-category.pipe";
import { FilterByPriceRangePipe } from "./filter-by-price-range.pipe";
import { SortByPipe } from "./sort-by.pipe";
import { MdToHtmlPipe } from "./md-to-html.pipe";

@NgModule({
  declarations: [
    MdToHtmlPipe,
    FilterByCategoryPipe,
    FilterByPriceRangePipe,
    SortByPipe
  ],
  imports: [CommonModule],
  exports: [
    MdToHtmlPipe,
    FilterByCategoryPipe,
    FilterByPriceRangePipe,
    SortByPipe
  ]
})
export class PipesModule {}
