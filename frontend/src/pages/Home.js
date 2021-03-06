import "../App.css";
import { useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
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

  useEffect(() => {
    fetchTodos();
  }, []);
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
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.text) {
            setTodoTextInputError(error.response.data.text);
          }

          if (error.response.data.priority) {
            setTodoPriorityInputError(error.response.data.priority);
          }
        }
        if (!error.request) {
          throw error;
        }
      });
  };

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
      <Button variant="outlined" onClick={handleAddTodo}>
        Dodaj
      </Button>
      {todos.map((todo) => (
        <TodoList
          key={todo.id}
          todoData={todo}
          handleRemoveEl={handleDeleteEl}
        />
      ))}
    </div>
  );
};
