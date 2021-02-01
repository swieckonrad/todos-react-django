import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Container,
} from "@material-ui/core";

export const UpdateTodo = (props) => {
  const [todoTextInputUpdate, setTodoTextUpdate] = useState("");
  const [todoPriorityUpdate, setPriorityUpdate] = useState();
  const [todoTextInputError, setTodoTextInputError] = useState("");
  const [todoPriorityInputError, setTodoPriorityInputError] = useState("");

  const refreshPage = () => {
    window.location.reload(false);
  };

  const importanceLevel = ["important", "normal", "not important"];

  const handleUpdateTodo = () => {
    axios
      .put(`http://localhost:8000/todos/todo/${props.todoData.id}`, {
        text: todoTextInputUpdate,
        priority: todoPriorityUpdate,
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
      <Button variant="outlined" color="secondary">
        Mark todo as done
      </Button>
      <Typography variant="h2">Update Todo: {props.todoData.text}</Typography>
      <Container>
        <div className="Container">
          <TextField
            variant="outlined"
            label={props.todoData.text}
            fullWidth
            error={todoTextInputError !== ""}
            helperText={todoTextInputError}
            onFocus={() => setTodoTextInputError("")}
            value={todoTextInputUpdate}
            onChange={(event) => setTodoTextUpdate(event.target.value)}
          />
          <TextField
            className="Select"
            select
            label={props.todoData.priority}
            variant="outlined"
            error={todoPriorityInputError !== ""}
            helperText={todoPriorityInputError}
            onFocus={() => setTodoPriorityInputError("")}
            value={todoPriorityUpdate}
            onChange={(e) => setPriorityUpdate(e.target.value)}
          >
            {importanceLevel.map((imp) => (
              <MenuItem value={imp}>{imp}</MenuItem>
            ))}
          </TextField>
        </div>
      </Container>
      <Button variant="outlined" color="secondary" onClick={handleUpdateTodo}>
        Update Todo
      </Button>
    </div>
  );
};
