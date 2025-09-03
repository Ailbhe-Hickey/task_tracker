export default function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div className="flex justify-between items-center p-3 mb-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id, !task.completed)}
          className="w-5 h-5 accent-blue-500"
        />
        <span className={`${task.completed ? "line-through text-gray-400" : "text-gray-800"} font-medium`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 transition-colors font-semibold"
      >
        Delete
      </button>
    </div>
  );
}
