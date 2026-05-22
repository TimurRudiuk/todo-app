from pydantic import BaseModel
from typing import Optional
from datetime import date

class TodoCreate(BaseModel):
    title: str
    priority: str
    category: str
    deadline: Optional[date] = None

class TodoUpdate(BaseModel):
    completed: Optional[bool] = None
    priority: Optional[str] = None
    category: Optional[str] = None
    title: Optional[str] = None
    deadline: Optional[date] = None

class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool
    priority: str
    category: str
    deadline: Optional[date] = None

    class Config:
        from_attributes = True