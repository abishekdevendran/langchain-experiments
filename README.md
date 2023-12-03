## Initial Goals
- Run a LLM locally, with a large vector store like MemGPT.
- Run AutoGPT with the LocalLLM substitute instead of OpenAI's API.

## FAQ:

- LLMs(Large Language Models) are large neural networks trained on large amounts of text data. They are used for a variety of tasks, including text generation, classification, and retrieval. They are also used as a base for other models, such as GPT-3.
- Transformers.js is a library for using LLMs in the browser. It is based on the popular Transformers library for Python.
- Embeddings are a way of representing words as vectors. They are used in many NLP tasks, including text generation, classification, and retrieval.
- Vector storage is a way of storing vectors for retrieval. It is used in many NLP tasks, including text generation, classification, and retrieval.
- We need Loaders like cheerio to scrape data from the web and/or load data from files.

First, install packages needed for local embeddings and vector storage. For this demo, we'll use `Llama 2` through `Ollama` as our LLM, `Transformers.js` for embeddings, and `HNWSLib` as a vector store for retrieval. We'll also install cheerio for scraping, though you can use any loader.

- Ollama - Get up and running with large language models, locally.
- `ollama pull llama2` is run to pull the latest version of the model from the server.

## Running:

- `pnpm dlx tsx --tsconfig ./tsconfig.json ./index.ts`
- `pnpm dlx tsx --tsconfig ./tsconfig.json ./index2.ts`