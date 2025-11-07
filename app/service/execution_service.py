from sqlalchemy.orm import Session
from app.model.execution import ExecutionLog
from typing import Iterable
import csv
import io

CSV_COLUMNS = [
    "id_log",
    "timestamp",
    "posicao_atual",
    "velocidade",
    "posicao_x",
    "posicao_y",
    "orientacao",
    "observacao",
]


def get_execution_logs(db: Session, id_execucao: int) -> list[ExecutionLog]:
    """Retorna todos os logs de uma execução ordenados por timestamp."""
    return (
        db.query(ExecutionLog)
        .filter(ExecutionLog.id_execucao == id_execucao)
        .order_by(ExecutionLog.timestamp.asc())
        .all()
    )


def logs_to_csv(logs: Iterable[ExecutionLog]) -> str:
    """Converte uma lista de logs em CSV (string)."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(CSV_COLUMNS)
    for log in logs:
        writer.writerow([
            log.id_log,
            log.timestamp.isoformat() if log.timestamp else "",
            log.posicao_atual or "",
            f"{log.velocidade}" if log.velocidade is not None else "",
            f"{log.posicao_x}" if log.posicao_x is not None else "",
            f"{log.posicao_y}" if log.posicao_y is not None else "",
            f"{log.orientacao}" if log.orientacao is not None else "",
            (log.observacao or "").replace("\n", " "),
        ])
    return output.getvalue()
