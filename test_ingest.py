import inngest
import asyncio
import os

inngest_client = inngest.Inngest(
    app_id="rag_app",
    api_base_url="http://127.0.0.1:8288/v1",
    event_api_base_url="http://127.0.0.1:8288/v1",
    event_key="local"
)


async def main():
    await inngest_client.send(
        inngest.Event(
            name="rag/ingest_pdf",
            data={
                "pdf_path": "/home/asus/Downloads/rag-agent-project/uploads/23WH1A1269_PavithraJarapula.pdf",
                "source_id": "23WH1A1269_PavithraJarapula.pdf"
            }
        )
    )
    print("Ingestion event sent!")

if __name__ == "__main__":
    asyncio.run(main())
