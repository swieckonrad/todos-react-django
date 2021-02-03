import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateTodo } from "./UpdateTodo";

export const TodoDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/todos/todo/${id}`
      );
      setData(response.data);
    } catch (err) {
      if (!err.request) {
        throw err;
      }
    }
  };

  // do useEffect nie można podać funkcji async
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="TodoDetails">
      {data && (
        <div>
          ID: {data.id}
          <br />
          Title: {data.text} <br />
          Priority: {data.priority} <br />
          Done: {data.done ? "Yes" : "No"} <br />
          <UpdateTodo todoData={data} setData={setData} />
        </div>
      )}
    </div>
  );
};
