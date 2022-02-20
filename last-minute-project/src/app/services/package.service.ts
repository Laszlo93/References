import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { PackageModel } from '../models/package.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private readonly PACKAGE_URL: string = "http://localhost:3000/packages";
  private packages?: Observable<PackageModel[]>;
  private package?: Observable<PackageModel>;

  constructor(private http: HttpClient, private afs: AngularFirestore) { }

  // public getPackages(): Observable<PackageModel[]> {
  //   return this.http.get<PackageModel[]>(this.PACKAGE_URL);
  // }

  public getPackages(): Observable<PackageModel[]> {
    const postsCollection = this.afs.collection<PackageModel>("packages");
    return postsCollection.get().pipe(
      map((packages) => packages.docs.map((onePackage) => {
        const convertedPost: PackageModel = onePackage.data();
        return convertedPost;
      }))
    )
  }

  // public getPackage(packageName: string): Observable<PackageModel[]> {
  //   return this.http.get<PackageModel[]>(`${this.PACKAGE_URL}/?name=${packageName}`);
  // }

  public getPackage(packageName: string): Observable<PackageModel[]> {
    const postsCollection = this.afs.collection<PackageModel>("packages", ref => ref.where("name", "==", packageName));
    return postsCollection.get().pipe(
      map((packages) => packages.docs.map((onePackage) => {
        const convertedPost: PackageModel = onePackage.data();
        return convertedPost;
      }))
    )
  }
}
