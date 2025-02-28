import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AgentService {
  constructor(private readonly httpService: HttpService) {}

  async generateWorkflow(request: string) {
    console.log('generateWorkflow', request);
    let tools = await this.getAllTools();

    const prompt = `Tu es un assistant IA spécialisé dans la création de workflows automatisés.
    L'utilisateur a fait la demande suivante : "${request}"
    Voici les outils disponibles que tu peux utiliser pour construire le workflow :
    ${JSON.stringify(tools)}
    Génère un workflow sous forme de JSON où chaque étape est structurée comme suit :
    [{"step": 1, "name": "Nom de l'étape", "description": "Description de l'étape", "type": "API_CALL", "method": "GET", "url": "https://api.example.com/data"},
     {"step": 2, "name": "Analyse IA", "description": "Analyse les données récupérées", "type": "LLM_ANALYSIS", "method": "POST", "provider_url": "https://api.deepseek.com/chat/completions", "model": "deepseek-chat", "prompt": "Analyse ces données météo : {{1}}"}]`;

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method: 'POST',
          url: "https://api.deepseek.com/chat/completions",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `API_KEY`,
          },
          data: {
            model: "deepseek-chat",
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            response_format: { type: "json_object" },
          },
        }),
      );

      const generatedWorkflow = response.data?.choices?.[0]?.message?.content;
      return generatedWorkflow ? JSON.parse(generatedWorkflow) : 'Aucune réponse générée';
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async getAllTools() {
    return [
      {
        name: 'Données météo',
        description: 'Fait un appel API pour obtenir des données météo.',
        type: 'API_CALL',
        method: 'GET',
        url: 'https://api.open-meteo.com/v1/forecast?latitude={{latitude}}&longitude={{longitude}}&current_weather=true',
      },
      {
        name: 'Appel à un LLM',
        description: 'Appel à un LLM',
        type: 'LLM_ANALYSIS',
        provider_url: 'https://api.deepseek.com/chat/completions',
        model: 'deepseek-chat',
        api_key: "sk-920ddba589384d6ab7a2ac8d82236903",
        prompt: '{{prompt}}',
      },
      {
        name: 'Envoyer Email',
        description: 'Envoie un email avec un contenu donné.',
        type: 'API_CALL',
        method: 'POST',
        url: 'https://hook.eu2.make.com/y5g2uw6hm4lt8545bki2466crv5r30m4',
        headers: { 'Content-Type': 'application/json' },
        body: { 'subject': '{{subject}}', 'content': '{{content}}', 'destinator': '{{destinator}}' },
      },
    ];
  }
}