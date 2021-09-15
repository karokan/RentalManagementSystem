import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Property } from '../owner-property/owner-property.model';
import { OwnerService } from '../owner.service';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Agreement } from './owner-agreement.model';
import * as moment from 'moment';

@Component({
  selector: 'app-owner-agreement',
  templateUrl: './owner-agreement.component.html',
  styleUrls: ['./owner-agreement.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OwnerAgreementComponent),
      multi: true,
    },
  ],
})
export class OwnerAgreementComponent implements OnInit, OnDestroy {
  changeNotifyForm: FormGroup;
  constructor(
    private ownerService: OwnerService,
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.changeNotifyForm = fb.group({
      email: ['', Validators.required],
      property: ['', Validators.required],
      rent: ['', Validators.required],
      media: ['', Validators.required],
      deposit: ['', Validators.required],
    });
  }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  properties: Property[] = [];
  private propertySub: Subscription;
  email = '';
  private mode = 'create';
  public link = '';
  private agreementId: string;
  agreement: Agreement;
  property: FormControl = new FormControl();

  ngOnInit(): void {
    this.ownerService.getOwnerProperty();
    //do aktualizacji nieruchmości właściciela
    this.propertySub = this.ownerService
      .getPropertiesUpdateListener()
      .subscribe((properties: Property[]) => {
        this.properties = properties;
        console.log(this.properties);
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('agreementId')) {
        // this.router.navigate(['../agreementList']);
        // this.link = decodeURIComponent('../agreementList');
        this.link = '../';
        this.mode = 'edit';
        this.agreementId = paramMap.get('agreementId');
        this.agreement = this.ownerService.getAgreement(this.agreementId);
        this.changeNotifyForm.patchValue({
          email: this.agreement.tenantId.email,
          Enabled: false,
        });
        // this.range.patchValue({
        //   start: new FormControl(new Date(2015, 4, 13)),
        // });
        console.log(
          new Date(
            moment(this.agreement.dateStart, 'DD-MM-YYYY').format('YYYY/MM/DD')
          )
        );
        console.log(
          new Date(
            moment(this.agreement.dateEnd, 'DD-MM-YYYY').format('YYYY-MM-DD')
          )
        );

        this.range = new FormGroup({
          start: new FormControl(
            new Date(moment(this.agreement.dateStart).format('YYYY/MM/DD'))
          ),
          end: new FormControl(
            new Date(
              moment(this.agreement.dateEnd, 'DD-MM-YYYY').format('YYYY-MM-DD')
            )
          ),
        });
        //Wywala całą reszte
        // this.changeNotifyForm = this.fb.group({
        //   property: ['this.agreement.propertyId._id'],
        // });
        this.changeNotifyForm.patchValue({
          property: this.agreement.propertyId._id,
        });

        // for (let a of this.properties) {
        //   if (a.id === this.agreement.propertyId._id) {
        //     this.property.setValue({ adres: 'Monte Cassino 6' });
        //   }
        // }
        // this.property.setValue();
        console.log(this.property);
        this.changeNotifyForm.patchValue({
          rent: this.agreement.rent,
        });
        this.changeNotifyForm.patchValue({
          media: this.agreement.media,
        });
        this.changeNotifyForm.patchValue({
          deposit: this.agreement.deposit,
        });
      } else {
        this.mode = 'create';
        this.link = '';
        this.agreementId = null;
      }
    });
  }

  // onChange(event: any) {
  //   if (event.source.id) {
  //     event.source.checked = false;
  //   }
  // }

  ngOnDestroy(): void {
    this.propertySub.unsubscribe();
  }
  getPropertyId(event: any) {
    console.log(event.value);
  }

  showUserData(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const notifys = this.changeNotifyForm.value;
    console.log(notifys);
  }
  onSubmit() {
    const notifys = this.changeNotifyForm.value;
    console.log(notifys);
    console.log(this.range.value);

    if (this.mode === 'create') {
      this.ownerService.createAgreement(
        this.range.value,
        notifys.rent,
        notifys.deposit,
        notifys.media,
        notifys.property,
        notifys.email
      );
    } else {
      this.ownerService.updateAgreement(
        this.agreementId,
        this.range.value,
        notifys.rent,
        notifys.deposit,
        notifys.media,
        notifys.property,
        notifys.email
      );
    }

    this.changeNotifyForm.reset();
    this.range.reset();
  }
}
