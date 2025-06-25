import { useState } from "react";
import "./App.css";
function App() {
  type Todo = {
    id: number;
    text: string;
    done: boolean;
  };

  const [todo, settodo] = useState("");
  const [todos, settodos] = useState<Todo[]>([]);
  const [idCounter, setIdCounter] = useState(1);
  const [editId,setEditId] = useState<number | null>(null);
  const [editText,setEditText] = useState("");

  function addTodo(e: any): void {
    if (todo == "") return;
    const newTodo: Todo = {
      id: idCounter,
      text: todo.trim(),
      done: false,
    };

    e.preventDefault();
    settodos([...todos, newTodo]);
    settodo("");
    setIdCounter(idCounter + 1);
  }
  function deleteTodo(id: number): void {
    settodos(todos.filter((todoo) => todoo.id !== id));
  }
  function editTodo(id:number):void{
    settodos(todos.map((t) =>
    t.id === id ? { ...t, text: editText } : t
  ));
  setEditId(null);

  }

  return (
    <div className="bg-black w-screen h-screen">
      <form className=" p-5 bg-green-100" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Enter the todo"
          value={todo}
          onChange={(e) => settodo(e.target.value)}
          className="bg-blue-100 border-2 border-black"
        />

        <button type="submit" className="bg-blue-500 rounded-2xl p-2 ml-3">
          Add
        </button>
      </form>

      <div className="bg-white">
        <h1>Display :</h1>

        <ol>
          {todos.map((todoo) => (
            <li key={todoo.id} className="flex items-center justify-around">
              {todoo.id===editId? (
              <>
              <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
              <button 
              className="rounded-2xl p-2 bg-green-500"
              onClick={() => editTodo(todoo.id)}>
              Save
              </button>
              </>)
              :
              (<>
              <span>{todoo.text}</span>
              <button
                className="rounded-2xl p-2 bg-red-500"
                onClick={() => {
                  deleteTodo(todoo.id);
                }}>
                Delete
              </button>
              <button
                className="rounded-2xl p-2 bg-green-500"
                onClick={() => {
                  setEditId(todoo.id);
                  setEditText(todoo.text);
                }}>
                Edit
              </button>
              </>)}

            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
