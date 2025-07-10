import { useEffect, useState } from "react";
import ChildTodo from "@components/ChildTodo";
import type { Group, Todo } from "@/App";
import useDebounce from "@/hooks/useDebounce";

interface GroupTodoProps{
  group:Group;
  todos:Todo[];
  onAddTodo:(text:any)=>void;
  onUpdateTodo:(todoId: number, updates: Partial<Todo>)=>void;
  onDeleteTodo:(todoId:number)=>void;
  onDeleteGroup:()=>void;
  onUpdateGroup: (updates: Partial<Group>) => void;
}

function GroupTodo({ group,todos,onAddTodo,onUpdateTodo,onDeleteTodo,onDeleteGroup,onUpdateGroup }:GroupTodoProps) {
  
  // Local state for immediate UI updates
  const [localTitle, setLocalTitle] = useState(group.title);
  
  // Debounced function that updates the parent after user stops typing
  const debouncedUpdate = useDebounce((title: string) => {
    onUpdateGroup({ title });
  }, 500); 

  // Sync local state when parent state changes
  // (This happens when a new group is created or loaded from storage)
  useEffect(() => {
    setLocalTitle(group.title);
  }, [group.title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    // Schedule a debounced update to parent
    debouncedUpdate(newTitle);
  };

  function addChildTodo(){
    onAddTodo("");
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
          <input type="text" className="outline-0 p-2 m-2" value={localTitle}
           onChange={handleTitleChange}
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
            <ChildTodo key={t.id} todo={t} onTextChange={(id, text) => onUpdateTodo(id, { text })} deleteTodo={onDeleteTodo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default GroupTodo;
