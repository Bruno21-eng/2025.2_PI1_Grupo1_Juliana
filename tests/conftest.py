import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool


from app.config.database import get_db

SQLALCHEMY_DATABASE_URL = "sqlite://"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    """Substitui a dependência get_db para usar o banco de teste."""
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.rollback() 
        db.close()

@pytest.fixture(scope="module")
def client():
    """
    Fixture que:
    1. Importa os models (populando o Base)
    2. Importa o Base (AGORA populado)
    3. Cria as tabelas
    4. Importa o app e aplica o override
    5. Inicia o TestClient
    """
    
    from app.model import models
    from app.model import carrinho_model
    from app.model import trajectory

    from app.config.database import Base
    
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas no banco de teste:", Base.metadata.tables.keys())

    from main import app 

    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as c:
        yield c
    
    Base.metadata.drop_all(bind=engine)
    engine.dispose()