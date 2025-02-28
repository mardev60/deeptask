# DeepTask - AI-Powered Workflow Automation

DeepTask is an intelligent workflow automation platform that leverages AI to create and execute custom workflows based on natural language descriptions. Built with Angular and NestJS, it provides a seamless interface for users to describe their automation needs and get instant, AI-generated workflow solutions.

## 🌟 Features

- **Natural Language Workflow Generation**: Simply describe what you want to automate, and let AI create a custom workflow.
- **Visual Workflow Editor**: Intuitive interface to review and customize generated workflows.
- **Real-time Execution**: Execute workflows and monitor results in real-time.
- **Extensible Tool Integration**: Support for various tools including:
  - API integrations
  - Email automation
  - AI/LLM analysis
  - Weather data fetching
  - And more...

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn
- Angular CLI
- NestJS CLI

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mardev60/deeptask.git
   cd deeptask
   ```

2. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies:**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

5. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

6. **Start the server:**
   ```bash
   npm run start:dev
   ```

7. **Start the client:**
   ```bash
   cd ../client
   npm start
   ```

## 📂 Project Structure

```
deeptask/
├── client/        # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   └── assets/
│   └── package.json
├── server/        # NestJS backend application
│   ├── src/
│   ├── prisma/
│   └── package.json
└── README.md
```

## 🛠 Technology Stack

- **Frontend**: Angular, TypeScript, TailwindCSS
- **Backend**: NestJS, TypeScript, Prisma, PostgreSQL
- **AI Integration**: OpenAI API (or other LLMs)

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).