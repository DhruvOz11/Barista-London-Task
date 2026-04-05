import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function CreateTaskPage() {
  const [form, setForm] = useState({ title: "", description: "", status: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authFetch, requireAuth } = useAuth();
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleCreateTask() {
    setError("");
    setSuccess("");

    if (!form.title.trim()) return setError("Title is required");
    if (form.title.trim().length < 3)
      return setError("Title must be at least 3 characters");
    if (!form.description.trim()) return setError("Description is required");
    if (!form.status) return setError("Status is required");
    if (!requireAuth()) return;

    try {
      setLoading(true);
      const response = await authFetch("http://localhost:3000/task/", {
        method: "POST",
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          status: form.status,
        }),
      });
      if (!response) return;
      const data = await response.json();
      if (!response.ok)
        return setError(data.message || "Failed to create task");

      setSuccess("Task created successfully!");
      setForm({ title: "", description: "", status: "" });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Create task error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {/* Back link */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </button>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <h1 className="text-lg font-semibold text-gray-800">
                Create Task
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Add a new task to your dashboard
              </p>
            </div>

            <div className="px-6 py-6 flex flex-col gap-5">
              <Input
                label="Title"
                value={form.title}
                onChange={set("title")}
                placeholder="Enter task title"
              />
              <Input
                label="Description"
                value={form.description}
                onChange={set("description")}
                placeholder="Enter task description"
              />
              <Select
                label="Status"
                value={form.status}
                onChange={set("status")}
                options={STATUS_OPTIONS}
              />

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                  {success}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-semibold transition"
                >
                  {loading ? "Creating..." : "Create Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
