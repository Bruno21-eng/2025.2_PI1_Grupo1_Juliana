from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import database
from app.controller import carrinho_controller
from app.controller import trajectory_controller
from app.controller import execution_controller

app = FastAPI(
    title="Projeto PI1"
)

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    database.Base.metadata.create_all(bind=database.engine)

app.include_router(trajectory_controller.router)
app.include_router(carrinho_controller.router)
app.include_router(execution_controller.router)

@app.get("/")
def read_root():
    return {"message": "API funcionando!"}