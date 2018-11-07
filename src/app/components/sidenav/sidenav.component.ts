import { Component, OnInit } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import { CategoryResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  categories: CategoryResponse[];

  constructor(private wpService: WordpressService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.wpService
      .getCategories()
      .subscribe(data => (this.categories = <CategoryResponse[]>data));
  }
}
