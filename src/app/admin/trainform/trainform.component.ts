import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-trainform',
  templateUrl: './trainform.component.html',
  styleUrls: ['./trainform.component.scss']
})
export class TrainformComponent {

  trainform!:FormGroup;

  constructor(private fb:FormBuilder, private httpservice: ApiService){
    this.trainform = this.fb.group({
      train_name:['', Validators.required],
      train_number: ['', Validators.required],
      departure: ['', Validators.required],
      destination:['', Validators.required],
      departure_time: ['', Validators.required],
      arrival_time: ['', Validators.required]
    })
  }

  onSubmit(){
    let formData = {
      train_name: this.trainform.value.train_name,
      train_number: this.trainform.value.train_number,
      departure: this.trainform.value.departure,
      destination:this.trainform.value.destination,
      departure_time: this.trainform.value.departure_time,
      arrival_time: this.trainform.value.arrival_time
    }
    this.httpservice.createTrainRecort(formData).subscribe(()=>{
      alert('data save successfully')
    })

    this.trainform.reset();
  }
}
