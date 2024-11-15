import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {
  reportlist:[]=[];
  constructor(private service: ApiService){}

  ngOnInit(): void {
    this.service.getAnnualReport().subscribe(data=>{
      console.log(data)
    })
  }
}
