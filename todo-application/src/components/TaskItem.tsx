type TaskItemProps = {
  task: { id: number; task: string; complete: boolean };
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  editId: number | null;
  setEditId: (id: number | null) => void;
  editText: string;
  setEditText: (text: string) => void;
  onSave: (id: number) => void;
};

export function TaskItem({
  task: item,
  onDelete,
  onComplete,
  editId,
  setEditId,
  editText,
  setEditText,
  onSave,
}: TaskItemProps) {
  return (
    <li>
      {item.task}
      <button onClick={() => onDelete(item.id)}>Delete</button>
      <button onClick={() => setEditId(item.id)}>Edit</button>
      <input
        type="checkbox"
        checked={item.complete}
        onChange={() => onComplete(item.id)}
      />
      {editId === item.id &&(
        <>
            <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
            <button onClick={() => onSave(editId)}>Save</button>
        </>
      )}
    </li>
  );
}
