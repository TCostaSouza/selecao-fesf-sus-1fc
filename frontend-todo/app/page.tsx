"use client";

import { useEffect, useState } from "react";
import z from "zod";

const tarefaSchema = z.object({
  id: z.number(),
  texto: z.string().min(1, "O texto não pode ser vazio"),
});
type Tarefa = z.infer<typeof tarefaSchema>;

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
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

  const deletarTarefa = async (id: number) => {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Minha Lista de Tarefas
        </h1>

        {/* Área de adicionar nova tarefa */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)} // Atualiza o estado a cada letra digitada
            placeholder="O que você precisa fazer?"
            className="border p-2 w-full rounded text-gray-700 outline-none focus:border-blue-500"
          />
          <button
            onClick={adicionarTarefa}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </div>

        {/* Lista de tarefas existentes */}
        <ul className="space-y-3">
          {tarefas.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              Nenhuma tarefa pendente. Você está livre!
            </p>
          ) : (
            tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded border shadow-sm"
              >
                <span className="text-gray-800">{tarefa.texto}</span>
                <button
                  onClick={() => deletarTarefa(tarefa.id)}
                  className="text-red-500 hover:text-red-700 font-semibold px-2"
                >
                  Excluir
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
