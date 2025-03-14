# 🏝️ The AI Travel Agents

The AI Travel Agents is a robust **enterprise application** that leverages multiple **AI agents** to enhance travel agency operations. The application demonstrates how **five AI agents** collaborate to assist employees in handling customer queries, providing destination recommendations, and planning itineraries.

## 🚀 Overview of AI Agents

| Agent Name                             | Purpose                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Customer Query Understanding Agent** | Extracts key preferences from customer inquiries.                                                      |
| **Destination Recommendation Agent**   | Suggests destinations based on customer preferences.                                                   |
| **Itinerary Planning Agent**           | Creates a detailed itinerary and travel plan.                                                          |
| **Code Evaluation Agent**              | Executes custom logic and scripts if needed.                                                           |
| **Model Inference Agent**              | Runs an **LLM** using **Ollama** on **Azure Container Apps' serverless GPU** for AI-powered responses. |
| **Echo MCP Agent**                         | Echoes back any received input (used as an example).                                             |

---

## 🏗️ Project Structure
```
ai-travel-agents/
│── agents/
│   ├── customer-query-agent/
│   ├── destination-recommendation-agent/
│   ├── itinerary-planning-agent/
│   ├── code-evaluation-agent/
│   ├── model-inference-agent/
│   └── echo-mcp-agent/
│
│── api/                    # API Gateway for backend services
│── ui/                     # Frontend application
│── infra/                  # azd-related files
│── docs/                   # Documentation files
│
│── README.md               # Project documentation

```
---

## 🛠️ Prerequisites

Ensure you have the following installed before running the application:

- 🐳 **[Docker](https://www.docker.com/)**
- 📦 **[Docker Compose](https://docs.docker.com/compose/)**

---

## 6️⃣ Run the Entire Application Using Docker Compose

To run the entire application using Docker Compose:
```sh
docker compose up --build
```
This command will build and start all the services defined in the `docker-compose.yml` file.

