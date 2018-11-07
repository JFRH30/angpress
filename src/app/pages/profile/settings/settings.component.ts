import { Component, OnInit, OnChanges } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import { EditUserResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnChanges {
  user: EditUserResponse;
  constructor(public wpService: WordpressService) {}

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
    this.user = this.wpService.getUserLocaleSave;
  }

  /**
   * will update user basic info.
   * @param form data form #updateUser.
   */
  onUpdate(form) {
    this.wpService.updateUser(form.value).subscribe(data => {
      this.user = <EditUserResponse>data;
      if (form.value.password) {
        form.reset();
      }
    });
  }
}
