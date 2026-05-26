"use cliente";

import { useEffect, useState } from "react";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const backendUrl = "http://127.0.0.1:8000/tarefas";

  // Buscar tarefas
  const buscarTarefas = async () => {
    try {
      const resposta = await fetch(backendUrl);
      const dados = await resposta.json();
      setTarefas(dados); // Salva as tarefas recebidas no estado
    } catch (erro) {
      console.error("Erro ao buscar tarefas:", erro);
    }
  };

  // Carrega as tarefas quando a página inicia
  useEffect(() => {
    buscarTarefas();
  }, []);

  const adicionarTarefa = async () => {
    if (!novaTarefa.trim()) return;

    try {
      const resposta = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: novaTarefa }),
      });

      if (resposta.ok) {
        setNovaTarefa(""); // Limpa o campo de texto
        buscarTarefas(); // Pede a lista atualizada para o backend
      }
    } catch (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
    }
  };

  const deletarTarefa = async (id) => {
    try {
      const resposta = await fetch(`${backendUrl}/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        buscarTarefas(); // Atualiza a lista tirando a tarefa que foi apagada
      }
    } catch (erro) {
      console.error("Erro ao deletar tarefa:", erro);
    }
  };

  return (
    <div>
      <h1>Minha Lista de Tarefas</h1>

      {/* Área para adicionar nova tarefa */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="O que você precisa fazer?"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      {/* Lista de tarefas existentes */}
      <ul>
        {tarefas.length === 0 ? (
          <p>Nenhuma tarefa pendente. </p>
        ) : (
          tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <span className="text-gray-800">{tarefa.texto}</span>
              <button onClick={() => deletarTarefa(tarefa.id)}>Excluir</button>
            </li>
          ))
        )}
      </ul>
      <div>
        {/* Tarefa */}
        {/* Botão de excluir */}
        {/* Marcar/Desmarcar  na div toda */}
      </div>
    </div>
  );
}
