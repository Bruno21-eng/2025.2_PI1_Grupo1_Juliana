from fastapi import FastAPI
from app.config import database
from app.controller import carrinho_controller

app = FastAPI(title="Projeto PI1")

@app.on_event("startup")
def on_startup():
    database.Base.metadata.create_all(bind=database.engine)
    print("Database tables created (if they didn't exist).")

app.include_router(carrinho_controller.router)
