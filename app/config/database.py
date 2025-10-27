from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

ENCODED_PASSWORD = "vwKegP%23%40n8%21S2RB"

DATABASE_URL = f"postgresql://postgres:{ENCODED_PASSWORD}@db.wbxgeqrsrlatgzxloifp.supabase.co:5432/postgres"

engine = create_engine(
    DATABASE_URL
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()