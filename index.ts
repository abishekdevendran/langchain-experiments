import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HuggingFaceTransformersEmbeddings } from 'langchain/embeddings/hf_transformers';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { PromptTemplate } from 'langchain/prompts';
import { Ollama } from 'langchain/llms/ollama';
import { StringOutputParser } from 'langchain/schema/output_parser';
import { RunnablePassthrough, RunnableSequence } from 'langchain/runnables';
import { formatDocumentsAsString } from 'langchain/util/document';

const loader = new CheerioWebBaseLoader(
	'https://lilianweng.github.io/posts/2023-06-23-agent/'
);
const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
	chunkOverlap: 0,
	chunkSize: 500
});

const splitDocuments = await splitter.splitDocuments(docs);

// const redisClient = createClient({
//   url: process.env.REDIS_URL
// });

// console.log('Connecting to Redis...');
// try{
//   await redisClient.connect();
//   console.log('Connected to Redis!');
// }catch(e){
//   console.log(e)
//   process.exit(1)
// }

// const vectorstore = await RedisVectorStore.fromDocuments(
// 	splitDocuments,
// 	new HuggingFaceTransformersEmbeddings(),
//   {
//     redisClient,
//     indexName: "docs"
//   }
// );

const vectorstore = await HNSWLib.fromDocuments(
	splitDocuments,
	new HuggingFaceTransformersEmbeddings()
);

// const retrievedDocs = await vectorstore.similaritySearch(
// 	'What are the approaches to Task Decomposition?'
// );

// console.log(retrievedDocs[0]);

const retriever = vectorstore.asRetriever();

const prompt =
	PromptTemplate.fromTemplate(`Answer the question based only on the following context:
{context}

Question: {question}`);

const model = new Ollama({
	baseUrl: 'http://localhost:11434',
	model: 'orca-mini'
});

const chain = RunnableSequence.from([
	{
		context: retriever.pipe(formatDocumentsAsString),
		question: new RunnablePassthrough()
	},
	prompt,
	model,
	new StringOutputParser()
]);

const result = await chain.invoke(
	'What are the approaches to Task Decomposition?'
);

console.log(result);