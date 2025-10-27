from sqlalchemy import Column, Integer, String, Boolean
from app.config.database import Base
from pydantic import BaseModel

class CarrinhoORM(Base):
    __tablename__ = "carrinho"

    id_carrinho = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)

class CarrinhoCreate(BaseModel):
    nome: str

class Carrinho(CarrinhoCreate):
    id_carrinho: int 

    class Config:
        orm_mode = True