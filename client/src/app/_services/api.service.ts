import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {throwError} from "rxjs";
import {ErrorsService} from "./error.service";
import {SettingsService} from "./settings.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(private httpClient: HttpClient, public settings: SettingsService, public errorService: ErrorsService) {
  }

  createPostService(url: string, ob: any) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.httpClient.post(this.settings.baseUrl + url, ob).subscribe(data => {
          resolve(data);
        }, error => {
          //this.errorService.errorHandelingHttp(error);
          console.log("Oops!", error, error.error);
          Swal.fire({
            text: error.error.message,
            icon: "error",
            title: "Error",
            showConfirmButton: false,
            timer: 3000
          });
        });
      } catch (err) {
        console.log("ERROR : ", err);
        console.log(err);
      }
    });
  }


  createGetService(url: string, headParams?: any) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.httpClient.get(this.settings.baseUrl + url).subscribe(data => {
          resolve(data);
        }, error => {
          this.errorService.errorHandelingHttp(error);
          console.log("Oops", error, error.error);
        });
      } catch (err) {
        console.log("ERROR : ", err);
        console.log(err);
      }
    });
  }

  private static handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : "Server error";
    console.error(errMsg);
    return throwError(errMsg);
  }
}
