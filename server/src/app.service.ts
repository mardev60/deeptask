import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async executeTasks(tasks: any[]): Promise<Record<string, any>> {
    let context: Record<string, any> = {}; // Stocke les résultats des tâches précédentes

    for (const task of tasks.sort((a, b) => a.step - b.step)) {
      let result;
      switch (task.type) {
        case 'API_CALL':
          result = await this.apiCall(task, context);
          break;
        case 'LLM_ANALYSIS':
          result = await this.llmAnalysis(task, context);
          break;
        default:
          console.warn(`Type de tâche inconnu : ${task.type}`);
          continue;
      }

      context[task.step] = result; // Stocker le résultat avec la clé du step
      console.log(`Résultat de la tâche ${task.step}:`, result);
    }

    return context; // Retourne tous les résultats après exécution de toutes les tâches
  }

  private async apiCall(task: any, context: Record<string, any>) {
    try {
      let data = task.body ? this.replacePlaceholders(task.body, context) : undefined;

      console.log("🚀 Body avant envoi :", data);

      const response = await firstValueFrom(
        this.httpService.request({
          method: task.method,
          url: task.url,
          data: data, // Envoie le body après remplacement dynamique
          headers: task.headers || { "Content-Type": "application/json" },
        }),
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erreur dans API_CALL step ${task.step}:`, error.message);
      return null;
    }
  }

  private async llmAnalysis(task: any, context: Record<string, any>) {
    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method: 'POST',
          url: task.provider_url,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${task.api_key}`,
          },
          data: {
            model: task.model,
            messages: [
              {
                role: 'user',
                content: this.replacePlaceholders(task.prompt, context),
              },
            ],
          },
        }),
      );

      return (
        response.data?.choices?.[0]?.message?.content ||
        'Aucune réponse générée'
      );
    } catch (error) {
      console.error(
        `❌ Erreur dans LLM_ANALYSIS step ${task.step}:`,
        error.message,
      );
      return null;
    }
  }

  /**
   * Remplace les placeholders dynamiques dans le body ou le prompt
   * Exemple : "Salut, voici la météo : {{1}}" devient "Salut, voici la météo : {Données de l'étape 1}"
   */
  private replacePlaceholders(text: any, context: Record<string, any>): any {
    if (typeof text === 'string') {
      return text.replace(/{{(\d+)}}/g, (_, step) => {
        const replacement = context[step];
        return typeof replacement === 'object' ? JSON.stringify(replacement) : replacement || `{Step ${step} non trouvé}`;
      });
    } else if (typeof text === 'object') {
      return JSON.parse(JSON.stringify(text).replace(/{{(\d+)}}/g, (_, step) => {
        const replacement = context[step];
        return typeof replacement === 'object' ? JSON.stringify(replacement) : replacement || `"Step ${step} non trouvé"`;
      }));
    }
    return text;
  }
}