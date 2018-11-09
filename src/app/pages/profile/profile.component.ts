import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewUserResponse } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: ViewUserResponse = null;

  constructor(private activatedRoute: ActivatedRoute, public app: AppService) {}

  ngOnInit() {
    const userID = this.activatedRoute.snapshot.params['userID'];
    if (!userID) {
      this.app.profileID = this.app.wp.getID;
    } else {
      this.app.profileID = userID;
    }
    this.loadProfile(this.app.profileID);
  }

  loadProfile(id: number) {
    this.app.wp.showProfile(id).subscribe(data => {
      this.user = <ViewUserResponse>data;
    });
  }
}
