import { Component, OnInit, OnChanges } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { EditUserResponse, ViewUserResponse } from 'src/app/models/users.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnChanges {
  user: EditUserResponse;
  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.loadUser();
  }

  ngOnChanges() {
    this.loadUser();
  }

  /**
   * will get all data form locale.
   */
  loadUser() {
    this.user = this.usersService.getUserLocaleSave;
  }

  /**
   * will update user basic info.
   * @param form data form #updateUser.
   */
  onUpdate(form) {
    this.usersService.updateUser(form.value).subscribe(data => {
      this.user = <ViewUserResponse>data;
      if (form.value.password) {
        form.reset();
      }
    });
  }
}
