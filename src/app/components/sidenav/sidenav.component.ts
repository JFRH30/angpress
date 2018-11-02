import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoryResponse } from 'src/app/models/categories.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  categories: CategoryResponse[];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService
      .getCategories()
      .subscribe(data => (this.categories = <CategoryResponse[]>data));
  }
}
