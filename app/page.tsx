"use client";

import { useState, useEffect, useMemo } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

// Data features are disabled until Amplify outputs are provided
const isAmplifyConfigured = false;
if (isAmplifyConfigured) {
  Amplify.configure({});
}

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const client = useMemo(() => {
    if (!isAmplifyConfigured) return null;
    return generateClient<Schema>();
  }, []);

  function listTodos() {
    if (!client) return;
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    if (!client) return;
    listTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  function createTodo() {
    if (!client) return;
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <main>
      <h1>My todos</h1>
      {!isAmplifyConfigured && (
        <div style={{ marginBottom: 12 }}>
          Data features are disabled. Provide Amplify configuration to enable Todos.
        </div>
      )}
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}
