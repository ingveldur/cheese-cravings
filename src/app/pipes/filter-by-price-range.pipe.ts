import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../models/Product";
import * as _ from "lodash";

@Pipe({
  name: "filterByPriceRange"
})
export class FilterByPriceRangePipe implements PipeTransform {
  transform(products: Product[], ...args: any[]): any {
    // TODO optimize
    return products.filter(p => {
      return _.inRange(p.price, args[0], args[1]);
    });
  }
}
