import enum
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, 
    ForeignKey, DateTime, Enum
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.config.database import Base 

class CommandType(enum.Enum):
    move = "move"
    rotate = "rotate"
    release = "release"

class Trajectory(Base):
    __tablename__ = "trajectories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    store_in_memory = Column(Boolean, default=False)
    status = Column(String, default="saved", index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    commands = relationship(
        "Command",
        back_populates="trajectory",
        cascade="all, delete-orphan",
        order_by="Command.order"
    )

class Command(Base):
    __tablename__ = "commands"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(CommandType), nullable=False)
    value = Column(Float, nullable=False)
    unit = Column(String, nullable=True)
    order = Column(Integer, nullable=False)
    trajectory_id = Column(Integer, ForeignKey("trajectories.id"), nullable=False)
    trajectory = relationship("Trajectory", back_populates="commands")