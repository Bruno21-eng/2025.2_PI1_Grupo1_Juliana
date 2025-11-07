import json
from unittest.mock import patch 

def test_create_trajectory_success(client):
    """
    Testa o "caminho feliz" (Happy Path) da criação de trajetória.
    Vamos "mockar" (fingir) a chamada ao MQTT.
    """
        
    test_payload = {
        "name": "Trajetória de Teste 1",
        "store_in_memory": False,
        "commands": [
            {"type": "move", "value": 100.5, "unit": "mm"}, #
            {"type": "rotate", "value": 90.0, "unit": "degrees"} #
        ]
    }
    
    expected_topic = "trajectories/execute"
    
    with patch("app.service.trajectory_service.publish_message") as mock_publish:
            
        response = client.post("/trajectories/", json=test_payload)
        
        assert response.status_code == 201
        
        data = response.json()
        assert data["name"] == "Trajetória de Teste 1"
        assert data["status"] == "saved" #
        assert len(data["commands"]) == 2
        assert data["commands"][0]["type"] == "move"
        assert data["commands"][1]["value"] == 90.0
        
    
        expected_mqtt_payload = {
            "trajectory_id": data["id"],
            "name": "Trajetória de Teste 1",
            "commands": [
                {"type": "move", "value": 100.5, "unit": "mm"},
                {"type": "rotate", "value": 90.0, "unit": "degrees"}
            ]
        }
        
        mock_publish.assert_called_once() 
        
        mock_publish.assert_called_once_with(
            topic=expected_topic,
            payload=json.dumps(expected_mqtt_payload) 
        )