import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-tenant-toolbar',
  templateUrl: './tenant-toolbar.component.html',
  styleUrls: ['./tenant-toolbar.component.css'],
})
export class TenantToolbarComponent implements OnInit {
  constructor(public tenantService: TenantService) {}

  ngOnInit(): void {}
}
