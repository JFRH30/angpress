import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CATEGORY_ENDPOINT } from '../models/endpoints.model';
import { CategoryCreate, CategoryUpdate } from '../models/categories.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient, private usersService: UsersService) {}

  /**
   * will store and return category if successful.
   * @param category data to be stored in wordpress as category.
   */
  createCategory(category: CategoryCreate) {
    return this.http.post(
      CATEGORY_ENDPOINT,
      category,
      this.usersService.wpAuthPass,
    );
  }

  getCategory() {}

  /**
   * this will return the categories saved in wordpress.
   */
  getCategories() {
    return this.http.get(CATEGORY_ENDPOINT);
  }

  /**
   * will update and return data if successful.
   * @param id to reference category that will be updated.
   * @param category data to update on existing category.
   * note: this function can only be used by user in admin level.
   */
  updateCategory(id: number, category: CategoryUpdate) {
    return this.http.post(
      CATEGORY_ENDPOINT + '/' + id,
      category,
      this.usersService.wpAuthPass,
    );
  }

  /**
   * will delete category.
   * @param id to reference category that wil be deleted.
   * @param force (optional) to determine if you're going to trash or delete.
   * note: this function can only br used by user in admin level.
   */
  deleteCategory(id: number, force?: boolean) {
    if (!force) {
      force = false;
    }
    return this.http.delete(
      CATEGORY_ENDPOINT + '/' + id + '?force=' + force,
      this.usersService.wpAuthPass,
    );
  }
}
