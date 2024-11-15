import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-asidebar',
  templateUrl: './asidebar.component.html',
  styleUrls: ['./asidebar.component.scss']
})
export class AsidebarComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isHandset = result.matches;
    });
  }
  isHandset: boolean = false;

}
