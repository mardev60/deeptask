import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  generateWorkflow(request: string) {
    return this.http.post(`${this.apiUrl}/agent/generate`, { request });
  }

  executeWorkflow(workflow: any[]) {
    return this.http.post(`${this.apiUrl}/execute-tasks`, { workflow });
  }
}