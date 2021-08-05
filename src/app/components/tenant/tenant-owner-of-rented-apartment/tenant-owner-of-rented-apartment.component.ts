import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Agreement } from '../../owner/owner-agreement/owner-agreement.model';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-tenant-owner-of-rented-apartment',
  templateUrl: './tenant-owner-of-rented-apartment.component.html',
  styleUrls: ['./tenant-owner-of-rented-apartment.component.css'],
})
export class TenantOwnerOfRentedApartmentComponent
  implements OnInit, OnDestroy {
  private tenantAgreementSub: Subscription;
  tenantAgreement: Agreement = null;
  constructor(public tenantService: TenantService) {}

  ngOnInit(): void {
    this.tenantService.getTenantAgreement();
    this.tenantAgreementSub = this.tenantService
      .getTenantAgreementObservable()
      .subscribe((agreement: Agreement) => {
        this.tenantAgreement = agreement;
        console.log(this.tenantAgreement);
      });
  }

  ngOnDestroy(): void {
    this.tenantAgreementSub.unsubscribe();
  }
}
