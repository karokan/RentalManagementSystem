import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Agreement } from '../owner-agreement/owner-agreement.model';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-owner-agreement-list',
  templateUrl: './owner-agreement-list.component.html',
  styleUrls: ['./owner-agreement-list.component.css'],
})
export class OwnerAgreementListComponent implements OnInit, OnDestroy {
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
  onDelete(agreementId: string) {
    console.log(agreementId);
    this.ownerService.deleteAgreement(agreementId);
  }

  showButton() {
    console.log('show button clicked');
  }

  ngOnDestroy(): void {
    this.agreementSub.unsubscribe();
  }
}
