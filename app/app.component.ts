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
      // lastName: [''],
      // firstName: [''],

      // // afficher si type est entreprise
      // companyName: ['', Validators.required],
      // infosLegales: this.fb.group({
      //   siret: [''],
      // }),
      // products: this.fb.array([]),
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
  }

  removeIndividuFields() {}

  // Lorsque la sélection est sur individu
  addIndividuFields() {
    // this.signupForm.addControl('')
  }

  // Lorsque la sélection est sur entreprise
  addEntrepriseFields() {
    this.signupForm.addControl('companyName', new FormControl(''));
    (this.signupForm.get('infosLegales') as FormGroup).addControl(
      'siret',
      new FormControl('')
    );
  }

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
