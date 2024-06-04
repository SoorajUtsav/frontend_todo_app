import ToDo from "./components/ToDo";
import { useState, useEffect } from "react";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";
import FullPageSpinner from "./components/FullPageSpinner";

function App() {
  const [toDos, setToDos] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isFullPageSpinnerLoading, setIsFullPageSpinnerLoading] =
    useState(false);

  const updateMode = (id, text) => {
    setIsUpdating(true);
    setUpdateId(id);
    setText(text);
  };

  useEffect(() => {
    getAllToDo(setToDos, setIsFullPageSpinnerLoading);
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
                      setUpdateId,
                      setIsButtonLoading,
                      setIsFullPageSpinnerLoading
                    )
                : () =>
                    addToDo(
                      text,
                      setText,
                      setToDos,
                      setIsButtonLoading,
                      setIsFullPageSpinnerLoading
                    )
            }
          >
            {isButtonLoading ? (
              <div className="spinner" />
            ) : (
              <span> {isUpdating ? "Update" : "Add"}</span>
            )}
          </button>
        </div>
        <div>
          {isFullPageSpinnerLoading && <FullPageSpinner />}

          {toDos?.map((item, index) => (
            <ToDo
              text={item?.text}
              key={index}
              id={item?._id}
              updateMode={updateMode}
              deleteToDo={() =>
                deleteToDo(item._id, setToDos, setIsFullPageSpinnerLoading)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
