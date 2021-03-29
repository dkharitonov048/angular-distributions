import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Dictionary } from '../interfaces/configuration';
import { DistributorToAdd } from '../interfaces/distributor';
import { ConfService } from '../services/conf.service';
import { DistributorService } from '../services/distributor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-distributor',
  templateUrl: './add-distributor.component.html',
  styleUrls: ['./add-distributor.component.css']
})
export class AddDistributorComponent implements OnInit {

  constructor(private confService: ConfService, private distributorService: DistributorService, private snackBar: MatSnackBar) { }

  actionMessage: string = "";
  hasActionError: boolean = false;

  regions: Dictionary[] = [];
  segmants: Dictionary[] = [];
  formsOfActivity: Dictionary[] = [];


  ngOnInit(): void {
    this.confService.getRegions().subscribe((regions) => this.regions = regions);
    this.confService.getSegments().subscribe((segmants) => this.segmants = segmants);
    this.distributorService.getFormsOfActivity().subscribe((formsOfActivity) => this.formsOfActivity = formsOfActivity);
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    tin: new FormControl('', [Validators.required, this.tinLengthValidator]),
    kpp: new FormControl('', [this.kppValidator]),
    externalId: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    segment: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    legalAddress: new FormControl('', [Validators.maxLength(250)]),
    actualAddress: new FormControl('', [Validators.maxLength(250)]),
    loadSelloutBeforeDay: new FormControl('', [Validators.required, Validators.max(31), Validators.min(1)]),
    formOfActivityId: new FormControl('')
  });

  get name() { return this.form.get("name")! }
  get tin() { return this.form.get("tin")! }
  get kpp() { return this.form.get("kpp")! }
  get externalId() { return this.form.get("externalId")! }
  get segment() { return this.form.get("segment")! }
  get region() { return this.form.get("region")! }
  get legalAddress() { return this.form.get("legalAddress")! }
  get actualAddress() { return this.form.get("actualAddress")! }
  get loadSelloutBeforeDay() { return this.form.get("loadSelloutBeforeDay")! }
  get formOfActivityId() { return this.form.get("formOfActivityId")! }


  tinLengthValidator(control: AbstractControl): ValidationErrors | null {
    if (`${control.value}`.length === 10 || `${control.value}`.length === 12) {
      return null;
    }
    return { 'tinLength': true }
  }

  kppValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value > 0 && `${control.value}`.length !== 9) {
      return { 'kpp': true }
    }
    return null;
  }

  addDistributor(distributor: DistributorToAdd) {
    this.distributorService.addDistrobutor(distributor).subscribe(
      () => {
        this.actionMessage = "Saved successful";
        this.hasActionError = false;
        this.openSnackBar();
      },
      (error) => {
        this.actionMessage = error;
        this.hasActionError = true;
        this.openSnackBar();
      });
  }

  openSnackBar() {
    this.snackBar.open(this.actionMessage, "Close", {
      panelClass: this.hasActionError ? ['red-snackbar'] : ['green-snackbar'],
      duration: 3000,
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    let distributor: DistributorToAdd = {
      name: this.name.value.toString(),
      tin: this.tin.value.toString(),
      kpp: this.kpp.value ? this.kpp.value.toString() : null,
      externalId: this.externalId.value.toString(),
      segments: [this.segment.value],
      regions: [this.region.value],
      legalAddress: this.legalAddress.value.toString(),
      actualAddress: this.actualAddress.value.toString(),
      loadSelloutBeforeDay: this.loadSelloutBeforeDay.value,
      formOfActivityId: this.formOfActivityId.value
    };
    this.addDistributor(distributor);
  }
}
