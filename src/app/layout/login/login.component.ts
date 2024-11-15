import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private service: ApiService, private fb:FormBuilder, private toastr: ToastrService, private router: Router){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {
   
  }

  onSubmit(){
    this.service.getAllUser().subscribe(res=>{
        const user = res.find((exittingUser:any)=>{
          return exittingUser.username === this.loginForm.value.username && exittingUser.password === this.loginForm.value.password
        })

        if(user){
          this.toastr.success('Success!', 'Login Successfully', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true
          });
          this.router.navigate(['./admin'])
          localStorage.setItem("token", "xvjvjvxzjvjjcgsgjgjgsjgj.kjdkdhdhkd?lljjlhkkh")
        }
    })
    
  }

}
