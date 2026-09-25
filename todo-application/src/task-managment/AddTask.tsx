import { useState } from "react";

export function AddTask() {
  const [tasks, setTask] = useState<
    { id: number; task: String; complete: boolean }[]
  >([]);
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
    setTask([...tasks, { id: Date.now(), task: text, complete: false }]);
  }

  function deleteTask(id) {
    setTask(tasks.filter((item) => item.id !== id));
  }
  function saveEdit(id) {
    if (tasks.some((item) => item.task === edit)) {
      setEditId(null);
      return;
    }
    setTask(
      tasks.map((item) => (item.id === id ? { ...item, task: edit } : item)),
    );
    setEditId(null);
  }

  function comleteTask(id) {
    setTask(
      tasks.map((item) =>
        item.id === id ? { ...item, complete: !item.complete } : item,
      ),
    );
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
            <li key={item.id}>
              {item.task}{" "}
              <button onClick={() => deleteTask(item.id)}>Delete</button>
              <button
                onClick={() => {
                  setEditId(item.id);
                }}
              >
                Edit
              </button>
              <input type="checkbox" onChange={() => comleteTask(item.id)} />
              {editId === item.id && (
                <>
                  <input
                    type="text"
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                  />
                  <button onClick={() => saveEdit(editId)}>Save</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
