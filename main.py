from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import database
from app.controller import carrinho_controller
from app.controller import trajectory_controller
from app.mqtt.mqtt_client import connect_mqtt, disconnect_mqtt

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
    connect_mqtt()

@app.on_event("shutdown")
def on_shutdown():
    disconnect_mqtt()

app.include_router(trajectory_controller.router)
app.include_router(carrinho_controller.router)

@app.get("/")
def read_root():
    return {"message": "API funcionando!"}