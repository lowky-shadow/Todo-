type AddButtonProps = {
  onClick: () => void;
  children?: React.ReactNode; // only if you're passing children
};
function AddButon({onClick}:AddButtonProps){
    return(
        <>
            <button
            className="p-2 bg-slate-700
            text-white
            rounded-[12%] 
            hover:bg-slate-900"
            onClick={onClick}>
            + Add Group</button>
        </>
    );
}

export default AddButon;