import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-tenant-meters',
  templateUrl: './tenant-meters.component.html',
  styleUrls: ['./tenant-meters.component.css'],
})
export class TenantMetersComponent implements OnInit, OnDestroy {
  isActive = false;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  meters: any[] = [];
  private meterSub: Subscription;

  constructor(public tenantService: TenantService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      image: new FormControl(null, { validators: [Validators.required] }),
      meter: new FormControl(null, { validators: [Validators.required] }),
    });
    this.tenantService.getUserMeter();
    this.meterSub = this.tenantService
      .getUserMeterUpdateListener()
      .subscribe((meters: any) => {
        this.meters = meters;
        console.log(this.meters);
      });
  }

  onAddMeterPicture() {
    if (this.form.invalid) {
      return;
    }
    if (isNaN(this.form.value.meter)) {
      alert('Wpisz prawidłową liczbe');
      return;
    }
    console.log('meter added');
    this.tenantService.addMeter(
      this.form.value.content,
      this.form.value.meter,
      this.form.value.image
    );

    this.form.reset();
  }
  onDelete() {
    console.log('usuń');
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });

    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    this.meterSub.unsubscribe();
  }
}
