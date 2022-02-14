import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PackageModel } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private readonly PACKAGE_URL: string = "http://localhost:3000/packages";

  constructor(private http: HttpClient) { }

  public getPackages(): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(this.PACKAGE_URL);
  }
}
