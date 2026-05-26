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

