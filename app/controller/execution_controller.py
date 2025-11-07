from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.model.execution import Execution
from app.service import execution_service

router = APIRouter(
    prefix="/execucoes",
    tags=["Execucoes"],
)


@router.get("/{id_execucao}/export/csv")
def export_execution_logs_csv(id_execucao: int, db: Session = Depends(get_db)):
    """
    Exporta os dados de telemetria (execucao_log) em formato CSV para uma execução específica.
    """
    execution = db.query(Execution).filter(Execution.id_execucao == id_execucao).first()
    if execution is None:
        raise HTTPException(status_code=404, detail="Execução não encontrada")

    logs = execution_service.get_execution_logs(db=db, id_execucao=id_execucao)
    csv_content = execution_service.logs_to_csv(logs)

    filename = f"execucao_{id_execucao}_logs.csv"
    headers = {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": f"attachment; filename={filename}",
    }
    return Response(content=csv_content, media_type="text/csv", headers=headers)
