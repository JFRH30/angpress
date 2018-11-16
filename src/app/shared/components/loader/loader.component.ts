import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loader-component',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() text = 'Loading ...';
  constructor() {}

  ngOnInit() {}
}
