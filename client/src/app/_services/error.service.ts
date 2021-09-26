import {Injectable} from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class ErrorsService {
  constructor() {
  }

  async errorHandeling(error: any) {
    console.log("DEVELOPER_ERROR : ", error["ERROR"].DEVELOPER_ERROR, error["ERROR"].DISPLAY_ERROR);
    await Swal.fire({
      text: error["ERROR"].DISPLAY_ERROR + " \n נסה שנית מאוחר יותר!",
      icon: "error",
      title: "Error",
      showConfirmButton: false,
      timer: 5500
    });
  }


  async errorHandelingHttp(error: any) {
    console.log(error);
    await Swal.fire({
      text: error.message,
      icon: "error",
      title: "Error",
      showConfirmButton: false,
      timer: 5500
    });
  }
}
