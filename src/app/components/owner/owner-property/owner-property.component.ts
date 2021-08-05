import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OwnerService } from '../owner.service';
import { Property } from './owner-property.model';

@Component({
  selector: 'app-owner-property',
  templateUrl: './owner-property.component.html',
  styleUrls: ['./owner-property.component.css'],
})
export class OwnerPropertyComponent implements OnInit {
  constructor(
    public OwnerService: OwnerService,
    public route: ActivatedRoute
  ) {}

  private mode = 'create';
  private propertyId: string;
  public property: Property;
  public link = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('propertyId')) {
        this.link = '../';
        this.mode = 'editProperty';
        this.propertyId = paramMap.get('propertyId');
        this.property = this.OwnerService.getPropertyToEdit(this.propertyId);
      } else {
        this.mode = 'create';
        this.link = '';
        this.propertyId = null;
      }
    });
  }

  onSaveProperty(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.OwnerService.createProperty(
        form.value.address,
        form.value.city,
        form.value.postalCode,
        form.value.apartmentSize,
        form.value.propertyManger,
        form.value.managerPhoneNumber,
        form.value.houseCode,
        form.value.bankAccountNumber
      );
    } else {
      this.OwnerService.updateProperty(
        this.propertyId,
        form.value.address,
        form.value.city,
        form.value.postalCode,
        form.value.apartmentSize,
        form.value.propertyManger,
        form.value.managerPhoneNumber,
        form.value.houseCode,
        form.value.bankAccountNumber
      );
    }

    form.resetForm();
  }
}
