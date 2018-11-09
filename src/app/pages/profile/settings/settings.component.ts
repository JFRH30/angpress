import { Component, OnInit, OnChanges } from '@angular/core';
import { EditUserResponse } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: EditUserResponse;
  constructor(public app: AppService) {}

  ngOnInit() {
    this.loadUser();
  }

  /**
   * will get all data form locale.
   */
  loadUser() {
    this.user = this.app.wp.getSaveLocale;
  }

  /**
   * will update user basic info.
   * @param form data form #updateUser.
   */
  onUpdate(form) {
    this.app.wp.updateUser(form.value, '/me').subscribe(data => {
      this.user = <EditUserResponse>data;
      if (form.value.password) {
        form.reset();
      }
    });
  }
}
