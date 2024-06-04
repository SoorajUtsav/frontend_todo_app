import ToDo from "./components/ToDo";
import { useState, useEffect } from "react";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDos, setToDos] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const updateMode = (id, text) => {
    setIsUpdating(true);
    setUpdateId(id);
    setText(text);
  };

  useEffect(() => {
    getAllToDo(setToDos);
  }, []);

  return (
    <div>
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            name=""
            id=""
          />
          <button
            type="button"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(
                      updateId,
                      text,
                      setText,
                      setToDos,
                      setIsUpdating,
                      setUpdateId
                    )
                : () => addToDo(text, setText, setToDos)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </button>
        </div>
        <div>
          {toDos?.map((item, index) => (
            <ToDo
              text={item?.text}
              key={index}
              id={item?._id}
              updateMode={updateMode}
              deleteToDo={() => deleteToDo(item._id, setToDos)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
