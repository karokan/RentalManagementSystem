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
// import {cos } from '../../../../assets/documents/procedura'

@Component({
  selector: 'app-tenant-property',
  templateUrl: './tenant-property.component.html',
  styleUrls: ['./tenant-property.component.css'],
})
export class TenantPropertyComponent implements OnInit, OnDestroy {
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
