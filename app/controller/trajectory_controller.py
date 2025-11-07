from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.model.trajectory import TrajectoryCreate, TrajectoryRead, TrajectoryStats
from app.service import trajectory_service
from app.config.database import get_db
from typing import List

router = APIRouter(
    prefix="/trajectories",
    tags=["Trajectories"]
)

@router.post("/", response_model=TrajectoryRead, status_code=201)
def create_trajectory_endpoint(
    trajectory_data: TrajectoryCreate, 
    db: Session = Depends(get_db)
):
    db_trajectory = trajectory_service.create_trajectory(
        db=db, trajectory_data=trajectory_data
    )

    return db_trajectory



@router.get("/stats", response_model=TrajectoryStats)
def read_trajectory_stats(db: Session = Depends(get_db)):
    stats_data = trajectory_service.get_trajectory_stats(db)
    
    return stats_data

@router.get("/", response_model=List[TrajectoryRead])
def read_all_trajectories(db: Session = Depends(get_db)):
    trajectories = trajectory_service.get_all_trajectories(db=db)

    return trajectories