import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Agreement } from '../owner-agreement/owner-agreement.model';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-owner-properties-tenants',
  templateUrl: './owner-properties-tenants.component.html',
  styleUrls: ['./owner-properties-tenants.component.css'],
})
export class OwnerPropertiesTenantsComponent implements OnInit, OnDestroy {
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
  onDelete() {
    console.log('usuwanie zgłoszeń???');
  }

  ngOnDestroy(): void {
    this.agreementSub.unsubscribe();
  }
}
