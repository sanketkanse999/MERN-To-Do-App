import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please login first");
      return navigate("/login");
    }
    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Task title cannot be empty.");
      return;
    }
    try {
      const res = await API.post("/tasks", { title: title.trim() });
      setTasks([...tasks, res.data]);
      setTitle("");
      toast.success("Task added!");
    } catch (err) {
      toast.error("Failed to add task.");
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await API.put(`/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch {
      toast.error("Could not update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted.");
    } catch {
      toast.error("Failed to delete task.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>📝 My To-Do List</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      <form onSubmit={handleAdd} style={styles.form}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Add
        </button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task._id} style={styles.listItem}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task._id, task.completed)}
              />
              <span
                style={{
                  ...styles.taskText,
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
              <button
                onClick={() => handleDelete(task._id)}
                style={styles.deleteButton}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 20,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: "1.8rem",
  },
  logoutButton: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  form: {
    display: "flex",
    gap: 10,
    marginTop: 20,
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 6,
    fontSize: 14,
    cursor: "pointer",
  },
  list: {
    marginTop: 20,
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  taskText: {
    flex: 1,
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#d11a2a",
    cursor: "pointer",
    fontSize: 18,
  },
};

export default Todo;
