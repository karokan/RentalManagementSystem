import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { Property } from '../owner-property/owner-property.model';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-owner-property-list',
  templateUrl: './owner-property-list.component.html',
  styleUrls: ['./owner-property-list.component.css'],
})
export class OwnerPropertyListComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  properties: Property[] = [];
  private propertySub: Subscription;

  constructor(public ownerService: OwnerService) {}

  ngOnInit(): void {
    // this.ownerService.getProperty();
    this.ownerService.getOwnerProperty();
    this.propertySub = this.ownerService
      .getPropertiesUpdateListener()
      .subscribe((properties: Property[]) => {
        this.properties = properties;
      });
  }

  onDelete(propertyId: string) {
    this.ownerService.deleteProperty(propertyId);
  }

  ngOnDestroy(): void {
    this.propertySub.unsubscribe();
  }
}
