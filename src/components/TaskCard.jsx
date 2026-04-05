export const TaskCard = ({ task, onEdit, onDelete }) => {
  const STATUS_BADGE = {
    "in-progress": {
      label: "In Progress",
      className: "bg-orange-400 text-white",
    },
    completed: { label: "Completed", className: "bg-green-500 text-white" },
  };

  const isPending = task.status === "pending";
  const badge = STATUS_BADGE[task.status];

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between gap-4 shadow-sm">
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-sm font-bold text-gray-800">{task.title}</span>
        <span className="text-xs text-gray-500">{task.description}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isPending ? (
          <button
            onClick={() => onEdit(task)}
            className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            Edit
          </button>
        ) : (
          <span
            className={`px-3 py-1.5 rounded text-xs font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
