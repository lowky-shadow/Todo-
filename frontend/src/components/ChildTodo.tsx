import {  useEffect, useState } from "react";
import type { Todo } from "@/App";
import useDebounce from "@/hooks/useDebounce";
interface ChildTodoProps {
  todo: Todo;
  onTextChange: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
}
function ChildTodo({ todo, onTextChange, deleteTodo }: ChildTodoProps) {
  const [todoText, setTodoText] = useState(todo.text);

  // Debounced function to update parent
  const debouncedUpdate = useDebounce((text: string) => {
    onTextChange(todo.id, text);
  }, 500);

  // Sync local state when todo prop changes
  useEffect(() => {
    setTodoText(todo.text);
  }, [todo.text]);

  const handleChange = (e:any) => {
    const newText = e.target.value;
    setTodoText(newText);
    debouncedUpdate(newText);
  };

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
        onClick={()=>deleteTodo(todo.id)}
      >
        🗑️
      </button>
    </div>
  );
}

export default ChildTodo;
