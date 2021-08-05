import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.css'],
})
export class OwnerInfoComponent implements OnInit, OnDestroy {
  constructor(public ownerService: OwnerService) {}

  ownerData: any;
  private ownerDataSub: Subscription;
  ngOnInit(): void {
    this.ownerService.getOwnerData();
    this.ownerDataSub = this.ownerService
      .getOwnerDataUpdateListener()
      .subscribe((ownerData: any) => {
        this.ownerData = ownerData.ownerData;
      });
  }

  onSaveInfo(form: NgForm) {
    this.ownerService.updateOwner(
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
    this.ownerDataSub.unsubscribe();
  }
}
