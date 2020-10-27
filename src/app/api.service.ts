import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

import { OfflineManagerService } from "./../app/services/offline-manager.service";

import {
  NetworkService,
  ConnectionStatus,
} from "./../app/services/network.service";
import { Storage } from "@ionic/storage";
import { from } from "rxjs";
import { CommonService } from "./common.function";

const httpOptions = {
  headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*" }),
};

var headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append("Access-Control-Allow-Origin", "*");

@Injectable({
  providedIn: "root",
})
export class ApiService {
  options: any = {};
  Apiurl: any;
  constructor(
    private http: HttpClient,
    public config: CommonService,
    private networkService: NetworkService,
    private storage: Storage,
    private offlineManager: OfflineManagerService
  ) {
    this.options.withCredentials = true;
    this.options.headers = headers;
    this.Apiurl = "http://localhost:4000/";
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  Login(endPoint, data) {
    const httpOptions = {
      headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*" }),
    };

    let send = {
      username: data.username,
      password: data.password,
      device_token: "device_token",
      device_os: "device_os",
    };
    let url = this.Apiurl + "api/" + endPoint;
    return this.http.post(url, send, httpOptions).pipe(
      tap((_) => {}),
      catchError(this.handleError(endPoint))
    );
  }

  signup(endPoint, body) {
    let send = {};

    let url = this.Apiurl + "api/" + endPoint;
    return this.http.post(url, send).pipe(
      tap((_) => {}),
      catchError(this.handleError(endPoint))
    );
  }

  get_data(endPoint) {
    let url = this.Apiurl + "api/" + endPoint;
    return this.http.get(url).pipe(
      tap((_) => {}),
      catchError(this.handleError(endPoint))
    );
  }

  //   ------------

  getUsers(forceRefresh: boolean = false): Observable<any[]> {
    if (
      this.networkService.getCurrentNetworkStatus() ==
        ConnectionStatus.Offline ||
      !forceRefresh
    ) {
      console.log("Locally stored");

      // Return the cached data from Storage
      return from(this.getLocalData("stocks"));
    } else {
      console.log("Not stored yet");
      //   let page = Math.floor(Math.random() * Math.floor(6));

      //   let url = this.Apiurl + "api/" + 'all-stocks';

      //   return this.http.get(url).pipe(
      //     map(res => res['data']),
      //     tap(res => {
      let stock_details = [
        {
          Unique: "4444444STORED",
          Created: "2020-10-19",
          Invoice: "One",
          Notes: "Lorem",
        },
        {
          Unique: "2-STORED",
          Created: "2020-10-16",
          Invoice: "Two",
          Notes: "Lorem",
        },
        {
          Unique: "3-STORED",
          Created: "2020-10-15",
          Invoice: "Three",
          Notes: "Lorem",
        },
      ];

      this.setLocalData("stocks", stock_details);
      // })
      //   )
    }
  }

  updateUser(user, data): Observable<any> {
    let url = this.Apiurl + "api/" + "all-stocks";
    if (
      this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline
    ) {
      return from(this.offlineManager.storeRequest(url, "PUT", data));
    } else {
      return this.http.put(url, data).pipe(
        catchError((err) => {
          this.offlineManager.storeRequest(url, "PUT", data);
          throw new Error(err);
        })
      );
    }
  }

  // Save result of API requests
  private setLocalData(key, data) {
    this.config.storageSave(key, data);
  }

  // Get cached API result
  private getLocalData(key) {
    //  this.config.storageGet(`${key}`);
    return this.storage.get(`${key}`);
  }
}
