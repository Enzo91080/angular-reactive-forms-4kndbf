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
      email: ['enzo.aime91@gmail.com', Validators.required],
      type: [], // entreprise ou individu
    });

    this.signupForm.get('type').valueChanges.subscribe((value) => {
      this.updateFormFields(value);
    });
  }

  updateFormFields(type: 'individu' | 'entreprise') {
    if (type === 'individu') {
      this.removeEntrepriseFields();
      this.addIndividuFields();
    } else if (type === 'entreprise') {
      this.removeIndividuFields();
      this.addEntrepriseFields();
    }
  }

  removeEntrepriseFields() {
    this.signupForm.removeControl('companyName');
    this.signupForm.removeControl('infosLegales');
    this.signupForm.removeControl('products');
  }

  removeIndividuFields() {
    this.signupForm.removeControl('lastName');
    this.signupForm.removeControl('firstName');
  }

  // Lorsque la sélection est sur individu
  addIndividuFields() {
    this.signupForm.addControl('lastName', new FormControl('AIME'));
    this.signupForm.addControl('firstName', new FormControl('Enzo'));
  }

  // Lorsque la sélection est sur entreprise
  addEntrepriseFields() {
    this.signupForm.addControl('companyName', new FormControl('Prezevent'));
    this.signupForm.addControl(
      'infosLegales',
      this.fb.group({
        siret: ['45086116600038'],
      })
    );
    this.signupForm.addControl('products', this.fb.array([]));
  }

  get products() {
    return this.signupForm.get('products') as FormArray;
  }

  addProduct() {
    const productGroup = this.fb.group({
      name: ['test'],
      price: ['50'],
    });

    this.products.push(productGroup);
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }
}
