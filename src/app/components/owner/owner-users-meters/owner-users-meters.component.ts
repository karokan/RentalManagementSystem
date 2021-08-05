import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Agreement } from '../owner-agreement/owner-agreement.model';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-owner-users-meters',
  templateUrl: './owner-users-meters.component.html',
  styleUrls: ['./owner-users-meters.component.css'],
})
export class OwnerUsersMetersComponent implements OnInit, OnDestroy {
  agreements: Agreement[] = [];
  private agreementSub: Subscription;
  constructor(public ownerService: OwnerService) {}

  ngOnInit(): void {
    this.ownerService.getOwnerAgreement();
    this.agreementSub = this.ownerService
      .getAgreementUpdateListener()
      .subscribe((agreements: Agreement[]) => {
        this.agreements = agreements;
        console.log(this.agreements);
      });
  }

  ngOnDestroy(): void {
    this.agreementSub.unsubscribe();
  }
}
