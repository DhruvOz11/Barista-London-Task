import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "../components/TaskCard";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { API_ENDPOINTS } from "../config/api";

const STATUS_FILTERS = ["All", "Pending", "In Progress", "Completed"];

const STATUS_MAP = {
  All: null,
  Pending: "pending",
  "In Progress": "in-progress",
  Completed: "completed",
};

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { authFetch, requireAuth } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!requireAuth()) {
          setLoading(false);
          return;
        }
        const response = await authFetch(API_ENDPOINTS.TASKS, {
          method: "GET",
        });
        if (!response) return;
        const data = await response.json();
        if (!response.ok) {
          setError(data.message || "Failed to fetch tasks");
          return;
        }
        setTasks(
          data.tasks.map((task) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
          })),
        );
      } catch (err) {
        setError("An error occurred while fetching tasks.");
        console.error("Fetch tasks error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [authFetch, requireAuth]);

  const filtered = STATUS_MAP[activeFilter]
    ? tasks.filter((t) => t.status === STATUS_MAP[activeFilter])
    : tasks;

  const handleDelete = async (id) => {
    try {
      if (!requireAuth()) return;
      const response = await authFetch(API_ENDPOINTS.TASK(id), {
        method: "DELETE",
      });
      if (!response) return;
      if (response.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete task");
      }
    } catch (err) {
      setError("An error occurred while deleting the task.");
      console.error("Delete task error:", err);
    }
  };

  const handleEdit = (task) => navigate(`/edit/${task.id}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded-lg" />
            <div className="h-10 bg-gray-200 rounded-lg" />
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-white rounded-xl border border-gray-200 shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {tasks.length} total task{tasks.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add task
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex rounded-lg border border-gray-300 overflow-hidden bg-white shadow-sm w-fit">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-xs font-semibold transition border-r last:border-r-0 border-gray-300 ${
                activeFilter === filter
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 py-16 flex flex-col items-center justify-center gap-2 text-gray-400">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-sm">No tasks found</p>
            </div>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
