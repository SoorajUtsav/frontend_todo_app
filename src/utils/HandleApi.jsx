import axios from "axios";

const baseUrl = "https://backend-todo-app-66ob.onrender.com";

const getAllToDo = (setToDo, setIsFullPageSpinnerLoading) => {
  setIsFullPageSpinnerLoading(true);
  axios
    .get(baseUrl)
    .then((data) => {
      setToDo(data?.data);
    })
    .finally(() => {
      setIsFullPageSpinnerLoading(false);
    });
};

const addToDo = (
  text,
  setText,
  setToDo,
  setIsButtonLoading,
  setIsFullPageSpinnerLoading
) => {
  setIsButtonLoading(true);
  axios
    .post(`${baseUrl}/save`, { text })
    .then(() => {
      setText("");
      getAllToDo(setToDo, setIsFullPageSpinnerLoading);
    })
    .finally(() => {
      setIsButtonLoading(false);
    });
};

const updateToDo = (
  _id,
  text,
  setText,
  setToDo,
  setIsUpdating,
  setUpdateIds,
  setIsButtonLoading,
  setIsFullPageSpinnerLoading
) => {
  setIsButtonLoading(true);
  axios
    .post(`${baseUrl}/update`, { _id, text })
    .then(() => {
      setText("");
      setUpdateIds("");
      setIsUpdating(false);
      getAllToDo(setToDo, setIsFullPageSpinnerLoading);
    })
    .finally(() => {
      setIsButtonLoading(false);
    });
};

const deleteToDo = (_id, setToDo, setIsFullPageSpinnerLoading) => {
  setIsFullPageSpinnerLoading(true);
  axios
    .delete(`${baseUrl}/delete`, { data: { _id } })
    .then(() => {
      getAllToDo(setToDo, setIsFullPageSpinnerLoading);
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
