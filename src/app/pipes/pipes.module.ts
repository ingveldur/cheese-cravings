import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterByCategoryPipe } from "./filter-by-category.pipe";
import { FilterByPriceRangePipe } from "./filter-by-price-range.pipe";
import { SortByPipe } from "./sort-by.pipe";

@NgModule({
  declarations: [FilterByCategoryPipe, FilterByPriceRangePipe, SortByPipe],
  imports: [CommonModule],
  exports: [FilterByCategoryPipe, FilterByPriceRangePipe, SortByPipe]
})
export class PipesModule {}
