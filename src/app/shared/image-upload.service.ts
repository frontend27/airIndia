import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getImages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/images`);
  }
}
