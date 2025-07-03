import { useState } from "react";
import ChildTodo from "./ChildTodo";
export type Todo = {
  id: number;
  groupId: number;
  grouptext: string;
  text: string;
  done: boolean;
};
function GroupTodo({ id,onDelete }: { id: number,onDelete:()=>void }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [groupText, setGroupText] = useState("");
  const [nextId, setNextId] = useState(0);
    function addChildTodo() {
    setTodos([
      ...todos,
      {
        id: nextId,
        groupId: id,
        grouptext: groupText,
        text: "",
        done: false,
      },
    ]);
    setNextId(nextId+1);
  }
  function updateTodoText(id: number, text: string) {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, text: text } : t
      )
    );
  }
  function deleteTodo(id:number){
    setTodos(todos.filter((t)=>t.id !==id));
  }

  return (
    <>
      <div
        key={id}
        className="bg-slate-800 
            p-5 
            rounded-[5%] 
            min-w-[20%]
            max-w-[22%] 
             
            max-h-[90%]
            h-[20%]
            overflow-x-hidden
            m-8
            text-white
            flex flex-col
            "
      >
        <div className="flex justify-between">
          <input type="text" className="outline-0 p-2 m-2" value={groupText} onChange={(e) => setGroupText(e.target.value)}
          placeholder="Group Title"/>

          <button
            className="p-2 bg-slate-800
            text-white
            rounded-[12%] 
            hover:bg-slate-900"
            onClick={addChildTodo}
          >
            +
          </button>

          <button className="hover:bg-red-400 rounded pl-2 pr-2 " onClick={onDelete}>🗑️</button>
        </div>

        <div >
          {todos.map((t) => (
            <ChildTodo key={t.id} todo={t} onTextChange={updateTodoText} deleteTodo={deleteTodo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default GroupTodo;
