import { Component } from '@angular/core';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  constructor(private apiService: ApiService) {}
  userRequest: string = '';
  generatedWorkflow: any[] = [];

  generateWorkflow() {
    console.log('Génération du workflow pour :', this.userRequest);
    this.apiService.generateWorkflow(this.userRequest).subscribe((response: any) => {
      this.generatedWorkflow = response.workflow;
      console.log('Workflow généré :', response);
    });
  }
  updateGeneratedWorkflow(updatedWorkflow: any[]) {
    this.generatedWorkflow = updatedWorkflow;
  }


}
