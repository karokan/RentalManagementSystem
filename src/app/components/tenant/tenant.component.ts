import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TenantService } from './tenant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css'],
})
export class TenantComponent implements OnInit, OnDestroy {
  constructor(
    private snackBar: MatSnackBar,
    public tenantService: TenantService
  ) {}

  obligations: any[] = [];
  private obligationSub: Subscription;

  ngOnInit(): void {
    console.log('show reminder');
    this.tenantService.getUserObligations();
    this.obligationSub = this.tenantService
      .getUserObligationUpdateListener()
      .subscribe((obligations: any) => {
        this.obligations = obligations;
        console.log(this.obligations);

        for (let a of this.obligations) {
          if (a.ifChecked == false) {
            this.snackBar.open('Proszę sprawdzić rachunki', '', {
              duration: 3700,
            });
          }
          console.log(a.ifChecked);
        }
      });
  }

  ngOnDestroy(): void {
    this.obligationSub.unsubscribe();
  }
}
