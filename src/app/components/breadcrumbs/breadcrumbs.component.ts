import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent implements OnInit {
  @Output() sortByFilterChange: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Input() sortByFilter: string;
  @Input() sortByOptions: any[];

  constructor() {}

  ngOnInit() {}
}
