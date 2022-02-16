import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { PackageModel } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  packageName: any;
  packageDetails?: PackageModel;

  constructor(private activateRoute: ActivatedRoute, private packageService: PackageService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(param => {
      this.packageName = param.get("packageName")
    })

    console.log("Ez kellene az első legyen");

    this.packageService.getPackage(this.packageName).subscribe(choosenPackage => {
      this.packageDetails = choosenPackage[0];
      console.log(this.packageDetails);
    });
  }
}
