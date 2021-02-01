import "./App.css";
import { useEffect, useState } from "react";
import { Todo } from "./Todo";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Container,
} from "@material-ui/core";

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todoTextInput, setTodoText] = useState("");
  const [todoPriorityInput, setPriorityInput] = useState();
  const [todoTextInputError, setTodoTextInputError] = useState("");
  const [todoPriorityInputError, setTodoPriorityInputError] = useState("");

  const importanceLevel = ["important", "normal", "not important"];

  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:8000/todos/todo")
  //     .then((response) => {
  //       setTodos(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.request) {
  //         alert(error.toString());
  //       } else {
  //         throw error;
  //       }
  //     });
  // };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos/todo");
      setTodos(response.data);
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

  // useEffect(() => {
  //   (async () => {
  //     const response = await axios.get("http://localhost:8000/todos/todo");
  //     setTodos(response.data);
  //   })();
  // }, []);

  const handleDeleteEl = async (id) => {
    await axios.delete(`http://localhost:8000/todos/todo/${id}`);
    await fetchTodos();
  };

  const handleAddTodo = () => {
    axios
      .post("http://localhost:8000/todos/todo", {
        text: todoTextInput,
        priority: todoPriorityInput,
      })
      .then((response) => {
        setTodos((prev) => [...prev, response.data]);
        // alert(`Dodano todo o id: ${response.data.id}`);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.text) {
            setTodoTextInputError(error.response.data.text);
          }

          if (error.response.data.priority) {
            setTodoPriorityInputError(error.response.data.priority);
          }

          // alert(
          //   Object.entries(error.response.data)
          //     .map((e) => e[0] + ": " + e[1])
          //     .join("\n")
          // );
        }
        if (!error.request) {
          throw error;
        }
      });
  };

  // dodawanie, usuwanie, modyfikacja, odswiezanie

  return (
    <div className="App">
      <Typography variant="h2">Todos</Typography>
      <Container>
        <div className="Container">
          <TextField
            variant="outlined"
            label="Input your todo"
            fullWidth
            error={todoTextInputError !== ""}
            helperText={todoTextInputError}
            onFocus={() => setTodoTextInputError("")}
            value={todoTextInput}
            onChange={(event) => setTodoText(event.target.value)}
          />
          <TextField
            className="Select"
            select
            variant="outlined"
            error={todoPriorityInputError !== ""}
            helperText={todoPriorityInputError}
            onFocus={() => setTodoPriorityInputError("")}
            value={todoPriorityInput}
            onChange={(e) => setPriorityInput(e.target.value)}
          >
            {importanceLevel.map((imp) => (
              <MenuItem value={imp}>{imp}</MenuItem>
            ))}
          </TextField>
        </div>
      </Container>
      <Button variant="outlined" color="secondary" onClick={handleAddTodo}>
        Dodaj
      </Button>
      {todos.map((todo) => (
        <Todo key={todo.id} todoData={todo} handleRemoveEl={handleDeleteEl} />
      ))}
    </div>
  );
};
