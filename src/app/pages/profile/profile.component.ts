import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewUserResponse } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'profie-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: ViewUserResponse = null;

  constructor(private activatedRoute: ActivatedRoute, public app: AppService) {}

  ngOnInit() {
    this.doLoadProfile();
  }

  doLoadProfile() {
    this.app.posts = null; // to clear posts save here.
    this.app.categoryID = null; // to display all user post in any category.
    this.app.pageIndex = 0; // to reset paginator.
    const userID = this.activatedRoute.snapshot.params['userID'];
    if (!userID) {
      this.app.profileID = this.app.wp.getID;
    } else {
      this.app.profileID = userID;
    }
    this.app.wp.showProfile(this.app.profileID).subscribe(data => {
      this.user = <ViewUserResponse>data;
    });
    this.app.loadPosts();
  }
}
