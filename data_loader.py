from llama_index.readers.file import PDFReader
from llama_index.core.node_parser import SentenceSplitter
from dotenv import load_dotenv
from fastembed import TextEmbedding

load_dotenv()

# Using FastEmbed for free, local embeddings to avoid OpenAI rate limits
EMBED_MODEL_NAME = "BAAI/bge-small-en-v1.5"
EMBED_DIM = 384

# Initialize the embedder globally (it handles caching)
_embedder = TextEmbedding(model_name=EMBED_MODEL_NAME)

splitter = SentenceSplitter(chunk_size=1000, chunk_overlap=200)

def load_and_chunk_pdf(path: str):
    docs = PDFReader().load_data(file=path)
    texts = [d.text for d in docs if getattr(d, "text", None)]
    chunks = []
    for t in texts:
        chunks.extend(splitter.split_text(t))
    return chunks


def embed_texts(texts: list[str]) -> list[list[float]]:
    # fastembed.embed returns a generator
    embeddings = list(_embedder.embed(texts))
    return [e.tolist() for e in embeddings]