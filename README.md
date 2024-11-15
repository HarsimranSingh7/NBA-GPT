# NBA GPT

NBA GPT is a RAG (Retriever-Augmented Generation) chatbot built with JavaScript, LangChain.js, Next.js, Vercel, and OpenAI. This chatbot is trained on NBA-related data, providing real-time, contextually relevant answers to NBA questions by augmenting OpenAI's language model with custom data on the NBA. This project allows NBA fans to get up-to-date answers about players, stats, history, and much more.

## 🏀 Features

- Retrieves and scrapes NBA-related data from the internet to keep responses updated.
- Integrates with OpenAI's language model to produce human-like, accurate responses.
- Uses vector embeddings for similarity matching, powered by DataStax's vector database.
- Displays suggested prompts or allows users to ask their own questions.
- Includes a live database of recent NBA information to ensure context accuracy beyond standard LLM cut-off dates.

## 🚀 Tech Stack

- **JavaScript**
- **LangChain.js** for managing language model prompts and responses
- **Next.js** for frontend development
- **Vercel** for deployment
- **OpenAI** for generating answers and creating embeddings
- **DataStax Astra DB** for managing vector embeddings

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nba-gpt.git
   cd nba-gpt
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   Populate this file with your environment variables:
   ```plaintext
   ASTRA_DB_NAMESPACE=your_keyspace
   ASTRA_DB_COLLECTION=your_collection
   ASTRA_DB_API_ENDPOINT=your_api_endpoint
   ASTRA_DB_APPLICATION_TOKEN=your_application_token
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Seed the Database:**
   Run the following command to scrape and load data into DataStax:
   ```bash
   npm run seed
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

6. **Build for Production:**
   ```bash
   npm run build
   ```

## 🌐 Deployment

This project is ready to deploy on Vercel. Ensure that your environment variables are configured on Vercel under the "Environment Variables" section.

## 🛠️ Usage

NBA GPT provides an interactive chat interface with suggested prompts. You can:
- Choose a suggested question about the NBA.
- Type a custom question to get real-time information.
- Rely on the chatbot’s dynamic responses, which pull data from recent NBA sources.

### Example Questions

- "Who is the top scorer of the 2024 season?"
- "What is the latest trade rumor involving LeBron James?"
- "Who won the most recent NBA championship?"

## ⚠️ Notes

- **OpenAI API Key**: Ensure you have sufficient OpenAI API credits.
- **Database Scraping**: The `seed` command will fetch and store NBA data in your DataStax database. Adjust this script if you want additional data sources.

## 📜 License

This project is open-source and available under the MIT License.
