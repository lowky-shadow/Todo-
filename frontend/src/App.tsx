import "./App.css";
import GroupTodo from "@/components/GroupTodo";
import AddButton from "@/components/AddButton";
import { useState } from "react";
function App() {

  const [groups,setgroups] = useState([0]);//array of index of group
  function addGroup(){
    setgroups([...groups,groups.length]);
  }
  return(
    <div className="bg-slate-900 w-full min-h-screen">

      <nav className="w-full bg-slate-800 p-4 ">
        <AddButton onClick={addGroup} />
      </nav>

    <div className="flex flex-row p-5 bg-slate-900 w-full min-h-[100%] flex-wrap">
      {groups.map((id)=>(
        <GroupTodo key={id} />
      ))}
      
    
      </div>
    </div>
  );
}

export default App;
