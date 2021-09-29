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

  upload(file: File): Observable<HttpEvent<any>> {
    /**
     * FormData is a data structure that can be used to store key-value pairs. We use it to build an object which corresponds to an HTML form with append() method.
     */
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/products/upload`, formData, {
      // reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/upload`);
  }
}
