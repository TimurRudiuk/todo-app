import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

const API = "http://localhost:8000"

const PRIORITIES = ["low", "medium", "high"]
const PRIORITY_COLORS = { low: "green", medium: "orange", high: "red" }

export default function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("medium")
  const [category, setCategory] = useState("general")
  const [deadline, setDeadline] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState("")

  useEffect(() => {
    axios.get(`${API}/todos`).then(r => setTodos(r.data))
  }, [])

  const addTodo = async () => {
    if (!title.trim()) return
    const r = await axios.post(`${API}/todos`, {
      title,
      priority,
      category,
      deadline: deadline || null
    })
    setTodos([...todos, r.data])
    setTitle("")
    setDeadline("")
  }

  const toggle = async (todo) => {
    const r = await axios.patch(`${API}/todos/${todo.id}`, { completed: !todo.completed })
    setTodos(todos.map(t => t.id === todo.id ? r.data : t))
  }

  const remove = async (id) => {
    await axios.delete(`${API}/todos/${id}`)
    setTodos(todos.filter(t => t.id !== id))
  }

  const saveEdit = async (id) => {
    if (!editingTitle.trim()) return
    const r = await axios.patch(`${API}/todos/${id}`, { title: editingTitle })
    setTodos(todos.map(t => t.id === id ? r.data : t))
    setEditingId(null)
    setEditingTitle("")
  }

  const categories = ["all", ...new Set(todos.map(t => t.category))]

  const filtered = todos
    .filter(t => filterCategory === "all" || t.category === filterCategory)
    .filter(t => filterStatus === "all" || (filterStatus === "active" ? !t.completed : t.completed))
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="container">
      <h1>📝 Todo List</h1>

      {/* Form */}
      <div className="form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
          placeholder="New task..."
        />
        <input
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Category..."
        />
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />

        <div className="priority-buttons">
          {PRIORITIES.map(p => (
            <button
              type="button"
              key={p}
              onClick={() => setPriority(p)}
              className="priority-btn"
              style={{
                background: priority === p ? PRIORITY_COLORS[p] : "#eee",
                color: priority === p ? "white" : "#333",
                border: `2px solid ${PRIORITY_COLORS[p]}`,
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <button className="add-btn" onClick={addTodo}>Add</button>
      </div>

      {/* Search */}
      <input
        className="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="🔍 Search tasks..."
      />

      {/* Filters */}
      <div className="filters">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* List of tasks */}
      <ul className="todo-list">
        {filtered.map(t => (
          <li
            key={t.id}
            className={`todo-item ${t.completed ? "completed" : ""}`}
            style={{ borderColor: PRIORITY_COLORS[t.priority] }}
          >
            <input type="checkbox" checked={t.completed} onChange={() => toggle(t)} />

            {editingId === t.id ? (
              <input
                className="edit-input"
                value={editingTitle}
                onChange={e => setEditingTitle(e.target.value)}
                onKeyDown={e => e.key === "Enter" && saveEdit(t.id)}
                autoFocus
              />
            ) : (
              <span
                className={`todo-title ${t.completed ? "completed" : ""}`}
                onDoubleClick={() => { setEditingId(t.id); setEditingTitle(t.title) }}
              >
                {t.title}
              </span>
            )}

            {editingId === t.id ? (
              <button type="button" className="save-btn" onClick={() => saveEdit(t.id)}>✓</button>
            ) : null}

            <select
              className="priority-select"
              value={t.priority}
              style={{ background: PRIORITY_COLORS[t.priority] }}
              onChange={async (e) => {
                const r = await axios.patch(`${API}/todos/${t.id}`, { priority: e.target.value })
                setTodos(todos.map(x => x.id === t.id ? r.data : x))
              }}
            >
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <span className="todo-category">#{t.category}</span>

            {t.deadline && (
              <span className="todo-deadline">📅 {t.deadline}</span>
            )}

            <button className="delete-btn" onClick={() => remove(t.id)}>🗑</button>
          </li>
        ))}
      </ul>

      <p className="footer">
        {filtered.filter(t => !t.completed).length} tasks remaining
      </p>
    </div>
  )
}