import { useEffect } from "react"
import {useState} from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })


  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title: newItem, completed: false},
      ]
    })

    setNewItem("")
  }

  function deleteTodo(id) {
    setTodos(currentTodo => {
      return currentTodo.filter((todo) => id != todo.id)
    })
  }
  console.log(todos)
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item"> New Item</label>
          <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} id="item"/>
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.map(todo => {
          return <li key={todo.id}>
          <label>
            <input type="checkbox"/>
            {todo.title}
          </label>
          <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
        </li>
        })}

 
      </ul>
    </>
  )
}