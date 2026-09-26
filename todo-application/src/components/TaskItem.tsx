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
    <li className="task-item">
      <span className="task-text">{item.task}</span>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={item.complete}
        onChange={() => onComplete(item.id)}
      />
      <div className="task-actions">
        <button className="delete-btn" onClick={() => onDelete(item.id)}>
          Delete
        </button>
        <button
          className="edit-btn"
          onClick={() => {
            setEditId(item.id);
            setEditText(item.task);
          }}
        >
          Edit
        </button>
      </div>
      {editId === item.id && (
        <div className="edit-row">
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className="save-btn" onClick={() => onSave(item.id)}>
            Save
          </button>
        </div>
      )}
    </li>
  );
}
