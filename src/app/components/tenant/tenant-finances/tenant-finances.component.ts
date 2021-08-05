import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-tenant-finances',
  templateUrl: './tenant-finances.component.html',
  styleUrls: ['./tenant-finances.component.css'],
})
export class TenantFinancesComponent implements OnInit, OnDestroy {
  constructor(public tenantService: TenantService) {}

  obligations: any[] = [];
  private obligationSub: Subscription;

  ngOnInit(): void {
    this.tenantService.getUserObligations();
    this.obligationSub = this.tenantService
      .getUserObligationUpdateListener()
      .subscribe((obligations: any) => {
        this.obligations = obligations;
        console.log(this.obligations);
      });
  }

  ngOnDestroy(): void {
    this.obligationSub.unsubscribe();
  }
}
