import { useEffect, useState } from "react"; // react hooks 
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on mount (when the component loads first on the screen)
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  // Add a new task
  // A function to add a new task by sending a POST request to the backend
  const addTask = async (title) => {    // a variable that holds a function using async so you can use await which is when it waits for the fetch to complete before moving on, (title) is a parameter that represents the title of the new task to be added
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

  // Return JSX
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
//  ^^^  giving the AddTask component the addTask function as a prop





export default App;
