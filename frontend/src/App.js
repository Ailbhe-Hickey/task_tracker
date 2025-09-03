import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on mount
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  // Add a new task
  const addTask = async (title) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP error ${res.status}: ${text}`);
      }

      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    const updatedTask = await res.json();
    setTasks(tasks.map(t => t.id === id ? updatedTask : t));
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
  };

  // ✅ Return JSX
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
  <h1 className="text-4xl font-extrabold mb-8 text-blue-600">Task Tracker</h1>
  <div className="w-full max-w-md">
    <AddTask addTask={addTask} />
    <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
  </div>
</div>
  );
}




export default App;
