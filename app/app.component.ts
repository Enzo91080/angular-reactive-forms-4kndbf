import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      userData: new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      type: [],
      lastName: [''],
      firstName: [''],
      companyName: ['', Validators.required],
      infosLegales: this.fb.group({
        siret: [''],
      }),
      products: this.fb.array([]),
    });
  }

  buildType() {}

  addCompanyFields() {}

  addUserFields() {}

  get products() {
    return this.signupForm.get('products') as FormArray;
  }

  addProduct() {
    const productGroup = this.fb.group({
      name: [''],
      price: [''],
    });
    this.products.push(productGroup);
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // Vous pouvez ici envoyer les données vers un service ou effectuer d'autres actions
    }
  }
}
