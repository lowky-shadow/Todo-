import type { Todo } from "./GroupTodo";
interface ChildTodoProps{
    key:number,
    todo:Todo 
}

function ChildTodo({key,todo}:ChildTodoProps){
    return(
        <div
        className=" flex gap-x-5 gap-y-5">
        
            <input type="text" className="border-white outline-0  bg-slate-700 m-2 p-3 rounded"  />
            <button>X</button>
        
         </div>
        
    );
}

export default ChildTodo;