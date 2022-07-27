import { Component, OnInit } from '@angular/core';
import {Page} from "./page.model";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  pages: Page []=[];
  object: any;
  content: any;
  constructor() { }

  ngOnInit(): void {
  }

}
