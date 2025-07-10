import "./App.css";
import GroupTodo from "@components/GroupTodo";
import AddButton from "@components/AddButton";
import { useState } from "react";

export interface Todo {
  id: number;
  groupId: number;
  text: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Group {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

function App() {
  const [groups, setGroups] = useState<Group[]>([]); //array of groups
  const [todos, setTodos] = useState<Todo[]>([]);
  const [nextGroupId, setNextGroupId] = useState(1);
  const [nextTodoId, setNextTodoId] = useState(1);

  function getTodosForGroup(groupId:number){
    return todos.filter((t)=>t.groupId ===groupId);
  }

  function addTodoToGroup(groupId:number,text:string){
    const newTodo = {
      id:nextTodoId,
      groupId,
      text,
      done:false,
      createdAt:new Date(),
      updatedAt:new Date()
    }
    setTodos([...todos,newTodo]);
    setNextTodoId(nextTodoId +1);
  }

  function updateTodo(todoId:number,updates:Partial<Todo>){
    setTodos(todos.map((t)=>t.id ===todoId ?{...t,...updates,updatedAt:new Date()}:t));
  }

  function deleteTodo(todoId:number){
    setTodos(todos.filter((t)=>t.id !== todoId));
  }

  function deleteGroup(groupId:number){
    setGroups(groups.filter((g)=> g.id !==groupId));
    setTodos(todos.filter((t)=>t.groupId !==groupId));
  }

  function addGroup(){
    const newGroup={
      id:nextGroupId,
      title:"",
      createdAt:new Date(),
      updatedAt:new Date()
    }
    setGroups([...groups,newGroup]);
    setNextGroupId(nextGroupId+1);
  }
  
   function updateGroup(groupId:number, updates:Partial<Group>){
    setGroups(groups.map((g)=> g.id === groupId ? {...g, ...updates, updatedAt: new Date()} : g));
  }

  return (
    <div className="bg-slate-900 w-full min-h-screen">
      <nav className="w-full bg-slate-800 p-4 ">
        <AddButton onClick={addGroup} />
      </nav>

      <div className="flex flex-row p-5 bg-slate-900 w-full min-h-[100%] flex-wrap">
        {groups.map((group) => (
          <GroupTodo 
          key={group.id} 
          group={group}
          todos={getTodosForGroup(group.id)} 
          onAddTodo={(text:string) => addTodoToGroup(group.id, text)}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
          onDeleteGroup={() => deleteGroup(group.id)}
          onUpdateGroup={(updates) => updateGroup(group.id, updates)}
           />

        ))}
      </div>
    </div>
  );
}

export default App;
