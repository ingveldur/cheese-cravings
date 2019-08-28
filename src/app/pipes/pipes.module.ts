import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterByCategoryPipe } from "./filter-by-category.pipe";
import { FilterByPriceRangePipe } from "./filter-by-price-range.pipe";

@NgModule({
  declarations: [FilterByCategoryPipe, FilterByPriceRangePipe],
  imports: [CommonModule],
  exports: [FilterByCategoryPipe, FilterByPriceRangePipe]
})
export class PipesModule {}
