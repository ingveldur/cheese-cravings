import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "src/app/services/contentful.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService.getAllProducts().subscribe(p => console.log(p));
  }
}
