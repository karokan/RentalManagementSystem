import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-tenant-info',
  templateUrl: './tenant-info.component.html',
  styleUrls: ['./tenant-info.component.css'],
})
export class TenantInfoComponent implements OnInit {
  private tenantDataSub: Subscription;
  tenantData: any;

  constructor(public tenantService: TenantService) {}

  ngOnInit(): void {
    this.tenantService.getUserData();
    this.tenantDataSub = this.tenantService
      .getUserUpdateListener()
      .subscribe((user: any) => {
        this.tenantData = user;
      });
  }
  onSaveInfo(form: NgForm) {
    this.tenantService.updateTenant(
      form.value.name,
      form.value.lastName,
      form.value.address,
      form.value.city,
      form.value.IDseries,
      form.value.IDnumber,
      form.value.phoneNumber
    );
  }

  ngOnDestroy(): void {
    this.tenantDataSub.unsubscribe();
  }
}
