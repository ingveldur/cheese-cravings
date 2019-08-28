import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../models/Product";
import * as _ from "lodash";

@Pipe({
  name: "sortBy"
})
export class SortByPipe implements PipeTransform {
  transform(products: Product[], args: string): any {
    const sortByFilter = args.split(",");
    return _.orderBy(products, sortByFilter[0], sortByFilter[1]);
  }
}
