
# Projeto PI1

## Pré-requisitos

  * **Python 3.10+**

## Instalação do Projeto

Siga os passos abaixo para configurar o ambiente e instalar as dependências.

### 1\. Criar e Ativar o Ambiente Virtual

É uma boa prática isolar as dependências do projeto:

```bash
# Cria um ambiente virtual
python -m venv .venv

# Ativa o ambiente virtual (Linux/macOS)
source .venv/bin/activate

# Ativa o ambiente virtual (Windows)
# .venv\Scripts\activate
```

### 2\. Instalar Dependências

Instale todas as bibliotecas necessárias:

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic python-dotenv
```

## Rodando o Projeto

Após a configuração, você pode iniciar o servidor.

### 1\. Iniciar o Servidor FastAPI

Execute o comando `uvicorn` a partir do diretório raiz:

```bash
uvicorn main:app --reload
```

  * O flag `--reload` garante que o servidor reinicie automaticamente ao detectar mudanças no código.
  * O servidor estará acessível em: **`http://127.0.0.1:8000`**

### 2\. Acessar a Documentação da API

A documentação interativa (Swagger UI) estará disponível em:

```
http://127.0.0.1:8000/docs
```
