import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  //upsertProducts(file: File): Observable<HttpEvent<any>> {
  //  /**
  //   * FormData is a data structure that can be used to store key-value pairs. We use it to build an object which corresponds to an HTML form with append() method.
  //   *
  //   * id
  //   * product_name
  //   * category_id
  //   * price
  //   * type
  //   * filename
  //   */
  //
  //  console.log(file);
  //  this.formData.append('fileUpld', file);
  //  this.formData.append('type', file.type);
  //  this.formData.append('filename', file.name);
  //  console.log(this.formData);
  //
  //  const req = new HttpRequest('POST', `${this.baseUrl}/products/upload`, this.formData, {
  //    // reportProgress: true,
  //    responseType: 'json'
  //  });
  //
  //  return this.http.request(req);
  //}
}
