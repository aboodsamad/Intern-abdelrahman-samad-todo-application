import { useState } from "react";
import { useTasks } from "../hooks/useTask";
import { TaskItem } from "./TaskItem";

export function TodoApp() {
  const { tasks, setTasks, deleteTask, completeTask } = useTasks();
  const [text, setText] = useState("");
  const [edit, setEdit] = useState("");
  const [editId, setEditId] = useState<null | number>(null);
  const [showComplete, setShowComplete] = useState(false);
  const visibleTasks = showComplete
    ? tasks.filter((item) => item.complete)
    : tasks;

  function addTaskk(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (text.trim() === "") return;
    if (tasks.some((item) => item.task === text)) return;
    console.log(tasks.length);
    setTasks([...tasks, { id: Date.now(), task: text, complete: false }]);
    setText("");
  }

  function saveEdit(id: number) {
    if (tasks.some((item) => item.task === edit)) {
      setEditId(null);
      return;
    }
    setTasks(
      tasks.map((item) => (item.id === id ? { ...item, task: edit } : item)),
    );
    setEditId(null);
  }

  return (
    <>
      <form className="add-form" onSubmit={addTaskk}>
        <input
          className="add-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="add-btn" type="submit">
          Add
        </button>
      </form>
      <button
        className="filter-btn"
        onClick={() => setShowComplete(!showComplete)}
      >
        {showComplete ? "show All" : "show complete"}
      </button>
      {visibleTasks.length > 0 && (
        <ul className="task-list">
          {visibleTasks.map((item) => (
            <TaskItem
              key={item.id}
              task={item}
              onDelete={deleteTask}
              onComplete={completeTask}
              editId={editId}
              setEditId={setEditId}
              editText={edit}
              setEditText={setEdit}
              onSave={saveEdit}
            />
          ))}
        </ul>
      )}
    </>
  );
}
