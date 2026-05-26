from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Inicializar FastAPI
app = FastAPI();

# Middleware para comunicação com sites externos.
# ATENÇÃO!: Não reproduzir fora de ambiente local!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permite acesso de qualquer origem (ideal para desenvolvimento local)
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, DELETE, etc.)
    allow_headers=["*"],
)

tarefas = [] 
contador_id = 1

class Tarefa(BaseModel):
    texto: str


#------------ ROTAS ------------

# Listar tarefas
@app.get("/tarefas")
def listar_tarefas():
    return tarefas

# Criar nova tarefa
@app.post("/tarefas")
def criar_tarefa(tarefa_recebida: Tarefa):
    global contador_id
    
    nova_tarefa = {
        "id": contador_id, 
        "texto": tarefa_recebida.texto, 
        "concluida": False
    }
    
    tarefas.append(nova_tarefa)
    contador_id += 1 # Prepara o próximo ID
    
    return nova_tarefa