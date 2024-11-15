import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerform!:FormGroup;

  constructor(private fb:FormBuilder, private httpservice: ApiService, private router: Router,
    private toastr: ToastrService){
    this.registerform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }
  onSubmit(){
    let newitem = {
      username: this.registerform.value.username,
      password: this.registerform.value.password
    }
    this.httpservice.onRegister(newitem).subscribe(()=>{
      this.toastr.success('Success!', 'Register Successfully', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/login']);
      
    })
  }
}
