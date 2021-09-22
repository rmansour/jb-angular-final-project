import {Injectable} from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SweatService {
  constructor() {
  }

  deleteConfirm(title: string, description: string) {
    return new Promise(async (resolve, reject) => {
      Swal.fire({
        title: title,
        text: description,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'מחק',
        cancelButtonText: 'בטל'
      }).then(async (result) => {
        resolve(result.isConfirmed);
      })
    });
  }


  Success(title: string, html: string, icon: any) {
    return new Promise(async (resolve, reject) => {
      Swal.fire({
        title: title,
        html: html,
        icon: icon,
        timer: 3000
      }).then(async (result) => {
        resolve(result.isConfirmed);
      });
    });
  }
}
