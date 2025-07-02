import { useState } from "react";
import ChildTodo from "./ChildTodo";
export type Todo = {
  id: number;
  group: number;
  text: string;
  done: boolean;
};
function GroupTodo({ key }: { key: number }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  function addChildTodo() {
    setTodos([
      ...todos,
      {
        id: todos.length,
        group: key,
        text: "",
        done: false,
      },
    ]);
  }
  return (
    <>
      <div
        key={key}
        className="bg-slate-800 
            p-5 
            rounded-[5%] 
            min-w-[20%]
            max-w-[18%] 
            min-h-[50px] 
            max-h-[90%]
            h-[20%]
            overflow-x-hidden
            m-3
            text-white
            flex flex-col
            "
      >
        <div>
          <input type="text" className="border-white outline-0" />

          <button
            className="p-2 bg-slate-800
            text-white
            rounded-[12%] 
            hover:bg-slate-900"
            onClick={addChildTodo}
          >
            +
          </button>
        </div>
        <div className=" ">
        
          {todos.map((t) => (
            <ChildTodo key={t.id} todo={t} />
          ))}
        </div>
      </div>
    </>
  );
}

export default GroupTodo;
