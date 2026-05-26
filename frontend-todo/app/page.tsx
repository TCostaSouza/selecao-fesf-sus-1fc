"use cliente"

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

  useEffect(() => {
    buscarTarefas();
  }, []);
}