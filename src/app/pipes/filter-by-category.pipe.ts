import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByCategory"
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(products: any[], args: any): any {
    console.log(products);
    if (args) {
      return products.filter(p => p.category === args);
    } else {
      return products;
    }
  }
}
