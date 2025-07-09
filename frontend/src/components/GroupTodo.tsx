import { useState } from "react";
import ChildTodo from "@components/ChildTodo";
import type { Group, Todo } from "@/App";

interface GroupTodoProps{
  group:Group;
  todos:Todo[];
  onAddTodo:(text:any)=>void;
  onUpdateTodo:(todoId: number, updates: Partial<Todo>)=>void;
  onDeleteTodo:(todoId:number)=>void;
  onDeleteGroup:()=>void;
}

function GroupTodo({ group,todos,onAddTodo,onUpdateTodo,onDeleteTodo,onDeleteGroup }:GroupTodoProps) {
  
  const [groupTitle,setGroupTitle] = useState("");

  function addChildTodo(){
    onAddTodo(group.id);
  }
  return (
    <>
      <div
        key={group.id}
        className="bg-slate-800 
            p-5
            rounded-[5%] 
            min-w-[22%]
            max-w-[22%] 
             
            max-h-[90%]
            h-[20%]
            overflow-x-hidden
            m-5
            text-white
            flex flex-col
            "
      >
        <div className="flex justify-between">
          <input type="text" className="outline-0 p-2 m-2" value={groupTitle}
           onChange={(e) => setGroupTitle(e.target.value)}
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

          <button className="hover:bg-red-400 rounded pl-2 pr-2 " onClick={onDeleteGroup}>🗑️</button>
        </div>

        <div >
          {todos.map((t) => (
            <ChildTodo key={t.id} todo={t} onTextChange={()=>onUpdateTodo} deleteTodo={onDeleteTodo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default GroupTodo;
