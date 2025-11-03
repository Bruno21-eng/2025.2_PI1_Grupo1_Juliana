from pydantic import BaseModel
from typing import List
from enum import Enum

class CommandType(str, Enum):
    MOVE = "move"
    ROTATE = "rotate"
    RELEASE = "release"

class CommandRead(BaseModel):
    id: int
    type: CommandType
    value: float
    unit: str
    order: int

    class Config:
        from_attributes = True

class CommandCreate(BaseModel):
    type: CommandType
    value: float
    unit: str

class TrajectoryCreate(BaseModel):
    name: str
    commands: List[CommandCreate]
    store_in_memory: bool

class TrajectoryRead(BaseModel):
    id: int
    name: str
    store_in_memory: bool
    status: str
    commands: List[CommandRead]

    class Config:
        from_attributes = True