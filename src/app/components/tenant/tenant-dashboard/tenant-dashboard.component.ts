import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.css'],
})
export class TenantDashboardComponent implements OnInit {
  constructor() {}
  public name = 'karol';
  ngOnInit(): void {}
  showReminder() {
    console.log('show reminder');
  }
}
