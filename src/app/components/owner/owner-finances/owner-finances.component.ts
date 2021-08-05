import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-owner-finances',
  templateUrl: './owner-finances.component.html',
  styleUrls: ['./owner-finances.component.css'],
})
export class OwnerFinancesComponent implements OnInit, OnDestroy {
  constructor(public ownerService: OwnerService) {}

  obligations: any[] = [];
  private obligationSub: Subscription;

  ngOnInit(): void {
    this.ownerService.getOwnerObligations();
    this.obligationSub = this.ownerService
      .getOwnerObligationUpdateListener()
      .subscribe((obligations: any) => {
        this.obligations = obligations;
        console.log(this.obligations);
      });
  }
  check(obligationId: any, ifChecked: boolean) {
    console.log('potwierdzone');
    console.log(obligationId);
    console.log(ifChecked);

    this.ownerService.updateObligation(obligationId, ifChecked);
    const objIndex = this.obligations.findIndex(
      (obj) => obj.id == obligationId
    );
    this.obligations[objIndex].ifChecked = !ifChecked;
  }

  ngOnDestroy(): void {
    this.obligationSub.unsubscribe();
  }
}
