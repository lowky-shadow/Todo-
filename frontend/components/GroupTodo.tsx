import { useState } from "react";
function GroupTodo({ key }: { key: number }) {
  type Todo = {
    id: number;
    group: number;
    text: string;
    done: boolean;
  };
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div
      key={key}
      className="bg-slate-800 
            p-5 
            rounded-[5%] 
            min-w-[18%]
            max-w-[18%] 
            min-h-[50px] 
            max-h-[90%]
            h-[20%]
            overflow-x-hidden
            m-3
            text-white
            flex 
            justify-between "
    >
      <input type="text" className="border-white outline-0" />

      <button
        className="p-2 bg-slate-800
            text-white
            rounded-[12%] 
            hover:bg-slate-900"
      >
        +
      </button>
      {/* {todos.map()} */}
    </div>
  );
}

export default GroupTodo;
