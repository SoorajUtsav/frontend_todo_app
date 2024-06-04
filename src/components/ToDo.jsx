import { AiFillDelete } from "react-icons/ai";
import { BiMessageEdit } from "react-icons/bi";

const ToDo = ({ id, text, updateMode, deleteToDo }) => {
  return (
    <div className="todo">
      <div className="text">{text}</div>
      <div className="icons">
        <BiMessageEdit className="icon" onClick={() => updateMode(id, text)} />
        <AiFillDelete className="icon" onClick={deleteToDo} />
      </div>
    </div>
  );
};

export default ToDo;
