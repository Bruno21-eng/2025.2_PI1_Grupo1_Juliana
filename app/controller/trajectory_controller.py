from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.model.trajectory import TrajectoryCreate, TrajectoryRead
from app.service import trajectory_service
from app.config.database import get_db

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