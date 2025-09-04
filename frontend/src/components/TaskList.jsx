import TaskItem from "./TaskItem";



// Child of app.js
// displays all the tasks
// recieves the task as a prop from app.js
// it recieces the functions to toggle or delete too

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <div className="flex flex-col">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks yet!</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
}
