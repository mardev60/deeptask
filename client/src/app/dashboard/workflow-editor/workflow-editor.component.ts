import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api';
@Component({
  selector: 'app-workflow-editor',
  standalone: false,
  templateUrl: './workflow-editor.component.html',
  styleUrl: './workflow-editor.component.sass'
})
export class WorkflowEditorComponent {
  constructor(private apiService: ApiService) {}
  @Input() workflow: any[] = []; // Le workflow généré
  @Output() workflowUpdated = new EventEmitter<any[]>(); // Pour notifier les changements

  updatePlaceholder(stepIndex: number, key: string, value: string) {
    this.workflow[stepIndex][key] = value;
    this.workflowUpdated.emit(this.workflow);
  }

  executeWorkflow() {
    console.log("Workflow prêt à l'exécution :", this.workflow);
    this.apiService.executeWorkflow(this.workflow).subscribe((response: any) => {
      console.log("Réponse du backend :", response);
    });
    // Envoyer ce workflow au backend pour exécution
  }
}
