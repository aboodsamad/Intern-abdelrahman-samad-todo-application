import { useState } from "react";

export function AddTask() {
  const [tasks, setTask] = useState([{ id: 0, task: "", complete: false }]);
  const [text, setText] = useState("");

  function addTaskk(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (text.trim() === "") return;
    if(tasks.some((item) => item.task === text)) return;
    setTask([...tasks, { id: tasks.length, task: text, complete: false }]);
  }

  return (
    <>
      <form onSubmit={addTaskk}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((item) => (
          <li key={item.id}>{item.task}</li>
        ))}
      </ul>
    </>
  );
}
