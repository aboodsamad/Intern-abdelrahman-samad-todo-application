import { useState, useEffect } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState<
    { id: number; task: string; complete: boolean }[]
  >(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function deleteTask(id: number) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  function completeTask(id: number) {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, complete: !item.complete } : item,
      ),
    );
  }

  return { tasks, setTasks, deleteTask, completeTask };
}
