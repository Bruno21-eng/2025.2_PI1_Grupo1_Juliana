from sqlalchemy.orm import Session
from app.model import models
from app.model.trajectory import TrajectoryCreate
import json

from app.mqtt.mqtt_client import publish_message

# Topico
FIRMWARE_COMMAND_TOPIC = "trajectories/execute"

def create_trajectory(db: Session, trajectory_data: TrajectoryCreate) -> models.Trajectory:
    """
    Cria e salva uma nova trajetória
    """
    db_trajectory = models.Trajectory(
        name=trajectory_data.name,
        store_in_memory=trajectory_data.store_in_memory,
        status="saved"
    )
    db.add(db_trajectory)
    db.flush()

    db_commands = []
    for i, cmd_data in enumerate(trajectory_data.commands):
        db_cmd = models.Command(
            type=cmd_data.type.value,
            value=cmd_data.value,
            unit=cmd_data.unit,
            order=i,
            trajectory_id=db_trajectory.id
        )
        db_commands.append(db_cmd)

    db.add_all(db_commands)
    db.commit()
    db.refresh(db_trajectory)
    
    # ---  MQTT ---

    # Formatando a mensagem para o firmware.
    commands_list_for_mqtt = [
        {"type": cmd.type.value, "value": cmd.value, "unit": cmd.unit} #
        for cmd in trajectory_data.commands
    ]

    # Enviando o ID da trajetória e a lista de comandos.
    payload = {
        "trajectory_id": db_trajectory.id,
        "name": db_trajectory.name,
        "commands": commands_list_for_mqtt
    }

    # Serializando o dicionário para JSON.
    payload_str = json.dumps(payload)
    
    # Publica
    publish_message(topic=FIRMWARE_COMMAND_TOPIC, payload=payload_str)
    
    
    return db_trajectory

def get_trajectory_stats(db: Session) -> dict:

    total_saved = db.query(models.Trajectory).count()
    total_executed = db.query(models.Trajectory).filter(
        models.Trajectory.status.in_(["executed", "completed"])
    ).count()

    return {
        "total_saved": total_saved,
        "total_executed": total_executed
    }

def get_all_trajectories(db: Session) -> list[models.Trajectory]:

    return db.query(models.Trajectory).order_by(models.Trajectory.created_at.desc()).all()