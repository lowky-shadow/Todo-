import {  useState } from "react";
import type { Todo } from "./GroupTodo";
interface ChildTodoProps {
  todo: Todo;
  onTextChange: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
}
function ChildTodo({ todo, onTextChange, deleteTodo }: ChildTodoProps) {
  const [todoText, setTodoText] = useState("");

  const handleChange = (e:any) => {
    const newText = e.target.value;
    setTodoText(newText);
    onTextChange(todo.id, newText);
  };

  function deleteTheTodo() {
    deleteTodo(todo.id);
  }

  return (
    <div className=" flex justify-between ">
      <input
        type="text"
        className=" outline-0  bg-slate-700 m-2 p-2 rounded"
        value={todoText}
        onChange={handleChange}
      />
      <button
        className="hover:bg-red-400 rounded pl-2 pr-2 "
        onClick={deleteTheTodo}
      >
        🗑️
      </button>
    </div>
  );
}

export default ChildTodo;
