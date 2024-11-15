import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-productivaty',
  templateUrl: './productivaty.component.html',
  styleUrls: ['./productivaty.component.scss']
})
export class ProductivatyComponent {
  productForm!:FormGroup;
  isValidSum = true;
  options = [
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2024' }
  ];

  constructor(private fb:FormBuilder, private service: ApiService){
    this.productForm = this.fb.group({
      years:['', Validators.required],
      agriculture: [0, Validators.required],
      menerals:[0, Validators.required],
      industry:[0, Validators.required],
      others: [0, Validators.required]
    }, { validators: this.sumTo100Validator })
  }
  sumTo100Validator(group: FormGroup) {
    const agriculture = group.get('agriculture')?.value || 0;
    const menerals = group.get('menerals')?.value || 0;
    const industry = group.get('industry')?.value || 0;
    const others = group.get('others')?.value || 0;

    return agriculture + menerals + industry + others === 100 ? null : { sumNot100: true };
  }
  checkSum(){
    const {agriculture, menerals, industry, others} = this.productForm.value;
    const total = agriculture + menerals + industry + others;
    this.isValidSum = total === 100;
  }

  onSubmit() {
    if (this.productForm.valid) {
      let formdata = {
        agriculture: this.productForm.value.agriculture,
        menerals: this.productForm.value.menerals,
        industry: this.productForm.value.industry,
        others: this.productForm.value.others,
        years: this.productForm.value.years
      }
      this.service.createAnnualReport(formdata).subscribe((data)=>{
        console.log(data)
      })
      this.productForm.reset();
    }
  }

}
