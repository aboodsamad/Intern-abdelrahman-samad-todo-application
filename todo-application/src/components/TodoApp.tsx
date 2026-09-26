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
      <form onSubmit={addTaskk}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <button onClick={() => setShowComplete(!showComplete)}>
        {showComplete ? "show All" : "show complete"}
      </button>
      {visibleTasks.length > 0 && (
        <ul>
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