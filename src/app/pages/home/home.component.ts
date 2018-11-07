import { Component, OnInit } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import {
  CategoryResponse,
  ViewPostResponse,
} from 'src/app/models/wordpress.model';
import { pipe } from '@angular/core/src/render3';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: CategoryResponse[];

  constructor(private wpService: WordpressService) {}

  ngOnInit() {
    this.loadPosts();
  }

  /**
   * this will load 3 recent posts from each category
   */
  loadPosts() {
    this.wpService
      .getCategories()
      .pipe(
        tap(categories => {
          (<CategoryResponse[]>categories).unshift({ name: 'Recent Posts' });
          (<CategoryResponse[]>categories).forEach(category => {
            let param = '?per_page=3&_embed=author';
            if (category.id) {
              param =
                '?categories=' + category.id + '&per_page=3&_embed=author';
            }
            this.wpService.getPosts(param).subscribe(posts => {
              category.posts = <ViewPostResponse[]>posts.body;
            });
          });
        }),
      )
      .subscribe(data => {
        console.log(data);
        this.categories = <CategoryResponse[]>data;
      });
  }
}
