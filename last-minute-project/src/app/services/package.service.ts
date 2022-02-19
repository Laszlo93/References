import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { filter, Observable } from 'rxjs';
import { PackageModel } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private readonly PACKAGE_URL: string = "http://localhost:3000/packages";
  private packages?: Observable<PackageModel[]>;
  private package?: Observable<PackageModel>;

  constructor(private http: HttpClient, private afs: AngularFirestore) { }

  public getPackages(): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(this.PACKAGE_URL);
  }

  public getPackage(packageName: string): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(`${this.PACKAGE_URL}/?name=${packageName}`);
  }

  createPackage(travelPackage: PackageModel): Promise<DocumentReference<PackageModel>> {
    const packageCollection = this.afs.collection<PackageModel>('packages');
    return packageCollection.add(travelPackage);
  }

}
