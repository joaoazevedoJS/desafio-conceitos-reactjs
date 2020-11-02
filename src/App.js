import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [count, setCount] = useState(1)
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Desafio ${count} de Node.js`,
      url: "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: ["Node.js", "React.js"],
    };

    const response = await api.post('/repositories', data)

    setRepositories([...repositories, response.data])
    setCount(count + 1)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const newRepositories = repositories.filter(repository => repository.id !== id)

    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
