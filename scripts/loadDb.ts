import { DataAPIClient } from "@datastax/astra-db-ts"
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer"
import OpenAI from "openai"

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import "dotenv/config"

type SimilaryMetric = "cosine" | "dot_product" | "euclidean"

const { ASTRA_DB_NAMESPACE, ASTRA_DB_COLLECTION, ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, OPENAI_API_KEY } = process.env

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

const nbadata = [
  'https://en.wikipedia.org/wiki/National_Basketball_Association',
  'https://www.nba.com/news/nba-offseason-every-deal-2024',
  'https://www.nbcsports.com/nba/news/2024-nba-trade-deadline-tracker-all-the-latest-news-rumors-deals',
  'https://www.espn.com/nba/story/_/id/42368729/nba-standings-biggest-surprises-underperformers-2024-25-season',
  'https://www.sportingnews.com/us/nba/news/highest-paid-nba-players-2024-25-season/d3a7839d9d8feab54f11364e',
  'https://en.wikipedia.org/wiki/2024_NBA_Finals',
  'https://en.wikipedia.org/wiki/2023_NBA_playoffs#:~:text=The%20playoffs%20began%20on%20April%2015%20and%20concluded,NBA%20Finals%2C%20their%20first%20title%20in%20franchise%20history.',
  'https://www.nba.com/news/nba-roster-survey-facts-2024-25-season#:~:text=Eight%20players%20enter%202024-25%20having%20played%2016%20seasons%3A,Eric%20Gordon%20and%20Phoenix%20Suns%20forward%20Kevin%20Durant.',
  'https://www.nba.com/raptors/roster',
  'https://timesofindia.indiatimes.com/sports/nba/top-stories/nba-news-roundup-joel-embiids-return-update-cavaliers-undefeated-spurs-vs-kings-and-more/articleshow/115214836.cms',
  'https://timesofindia.indiatimes.com/sports/nba/top-stories/victor-wembanyama-breaks-nba-records-spurs-rookie-shines-with-historic-performance-against-wizards/articleshow/115278923.cms'
]

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE })

const splitter = new RecursiveCharacterTextSplitter({ 
  chunkSize: 512, 
  chunkOverlap: 100 
})

const createCollection = async (similaryMetric: SimilaryMetric ='dot_product') => {
  const res = await db.createCollection(ASTRA_DB_COLLECTION, {
    vector: {
      dimension: 1536,
      metric: similaryMetric, 
    }
  })
  console.log(res)
}

const loadSampleData = async () => {
  const collection =await db.collection(ASTRA_DB_COLLECTION)
    for await (const url of nbadata) {
      const content = await scrapePage(url)
      const chunks = await splitter.splitText(content)
        for await (const chunk of chunks) {
          const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: chunk,
            encoding_format: "float"
          })
          const vector = embedding.data[0].embedding

          const res = await collection.insertOne({
            $vector: vector,
            text: chunk
          })
          console.log(res)
        }
    }
}

const scrapePage = async (url: string) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: true,
      timeout: 60000
    },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML)
      await browser.close()
      return result
    }
  })
  return ( await loader.scrape())?.replace(/<[^>]*>?/gm, '')
}

createCollection().then(() => loadSampleData())
