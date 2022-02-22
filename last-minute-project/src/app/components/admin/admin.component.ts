import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public isAddPackage: boolean = false;

  public isList: boolean = false;

  public addPackageClass: string = "list-group-item list-group-item-action";

  public listClass: string = "list-group-item list-group-item-action";

  constructor() { }

  ngOnInit(): void {
  }

  
  showAddPackage(){
    this.isAddPackage = true;
    this.isList = false;
    this.listClass = "list-group-item list-group-item-action"
    this.addPackageClass = "list-group-item list-group-item-action bg-info"

  }

  showListPackages(){
    this.isAddPackage = false;
    this.isList = true;
    this.listClass = "list-group-item list-group-item-action bg-info"
    this.addPackageClass = "list-group-item list-group-item-action"

  }
}
