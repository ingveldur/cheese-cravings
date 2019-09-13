import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-category-toolbar",
  templateUrl: "./category-toolbar.component.html",
  styleUrls: ["./category-toolbar.component.scss"]
})
export class CategoryToolbarComponent implements OnInit {
  @Input() toolbarItems;
  @Input() selectedItem;
  @Input() disabled;

  constructor() {}

  ngOnInit() {}
}
