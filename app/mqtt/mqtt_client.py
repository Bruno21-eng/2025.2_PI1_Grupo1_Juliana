import paho.mqtt.client as mqtt
import logging

# --- Configurações ---
# (Aqui vai substituir pelo nosso broker. test.mosquitto.org é um broker público para testes)
MQTT_BROKER_URL = "test.mosquitto.org"
MQTT_BROKER_PORT = 1883
# ---------------------

# Configura um logger para ver o que está acontecendo
logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

def on_connect(client, userdata, flags, rc):
    """Callback executado quando o cliente se conecta."""
    if rc == 0:
        log.info(f"Conectado ao Broker MQTT! ({MQTT_BROKER_URL})")
    else:
        log.error(f"Falha ao conectar, código de retorno: {rc}")

def on_disconnect(client, userdata, rc):
    """Callback executado quando o cliente se desconecta."""
    log.info("Desconectado do Broker MQTT.")

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.on_connect = on_connect
client.on_disconnect = on_disconnect

def connect_mqtt():
    """Inicia a conexão com o broker MQTT."""
    try:
        log.info(f"Tentando conectar ao broker em {MQTT_BROKER_URL}:{MQTT_BROKER_PORT}...")
        client.connect(MQTT_BROKER_URL, MQTT_BROKER_PORT, 60)
        client.loop_start()
    except Exception as e:
        log.error(f"Erro ao conectar ao MQTT: {e}")

def disconnect_mqtt():
    """Desconecta o cliente MQTT."""
    log.info("Desconectando do MQTT...")
    client.loop_stop()
    client.disconnect()

def publish_message(topic: str, payload: str):
    """Publica uma mensagem em um tópico MQTT."""
    if not client.is_connected():
        log.warning("Cliente MQTT não está conectado. Tentando reconectar...")
        log.warning("Publicação pode falhar se a reconexão imediata não ocorrer.")
    
    result = client.publish(topic, payload)
    
    if result[0] == 0:
        log.info(f"Mensagem publicada com sucesso no tópico '{topic}'")
    else:
        log.error(f"Falha ao publicar mensagem no tópico '{topic}' (código: {result[0]})")