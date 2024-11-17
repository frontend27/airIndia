import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-trainlist',
  templateUrl: './trainlist.component.html',
  styleUrls: ['./trainlist.component.scss']
})
export class TrainlistComponent implements OnInit {
  displayedColumns: string[] = ['Train Name', 'Train Number','Departure', 'Destination', 'Departure Time', 'Arrival Time'];

  datalist: any[] = [];
  
  ngOnInit(): void {
    this.fetchData()
  }

  constructor(private httpservice: ApiService){}
  
  fetchData(){
    this.httpservice.getAnnualRecort().subscribe((data)=>{
      this.datalist=data;
    })
  }
}
