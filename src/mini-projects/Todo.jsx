import { useEffect, useState } from "react";

const tasks = [
  { id: 1, task: "Master MERN stack", status: "completed" },
  { id: 2, task: "Master AI stack", status: "pending" },
  { id: 3, task: "Master DevOps", status: "pending" },
];

function Todo() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : tasks;
  });

  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function AddTask() {
    if (!taskInput.trim()) return;

    const newTask = {
      id: todos.length + 1,
      task: taskInput.trim(),
      status: "pending",
    };

    setTodos((prevTodos) => [...prevTodos, newTask]);

    setTaskInput("");
  }

  return (
    <div className="m-5">
      {todos.map((i) => (
        <div key={i.id} className="flex gap-2">
          <p>{i.task}</p>
          <input type="checkbox" />
        </div>
      ))}
      <div className="flex gap-5 mt-5">
        <input
          className="border p-2"
          type="text"
          onChange={(e) => setTaskInput(e.target.value)}
          value={taskInput}
          placeholder="Enter your next task..."
        />

        <button className="border p-2" onClick={AddTask}>
          Add New Task
        </button>
      </div>
    </div>
  );
}

export default Todo;
