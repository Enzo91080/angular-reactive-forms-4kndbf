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
    this.buildForm();
  }

  buildForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      type: [], // entreprise ou individu
      lastName: [''],
      firstName: [''],

      // afficher si type est entreprise
      companyName: ['', Validators.required],
      infosLegales: this.fb.group({
        siret: [''],
      }),
      products: this.fb.array([]),
    });
  }

  
  // buildType() {
  //   let type = this.signupForm.get('type').value;
  //   if (type === 'entreprise') {
  //     this.signupForm.addControl('companyName', new FormControl())
  //   } else {
  //     console.log('individu');
  //   }
  // }

  // addCompanyFields() {
  //   this.signupForm.removeControl('companyName'); // je supprime companyName du signupForm
  // }

  // addUserFields() {
  //   this.signupForm.removeControl('infosLegales'); //je supprime infosLegales du signupForm
  // }

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
