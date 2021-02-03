import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Container,
  Icon,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

export const UpdateTodo = (props) => {
  const [inputText, setInputText] = useState("");
  const [inputPriority, setInputPriority] = useState("");
  const [textError, setTextError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateTodo = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/todos/todo/${props.todoData.id}`,
        {
          text: inputText,
          priority: inputPriority,
        }
      );
      if (
        props.todoData.text === inputText &&
        props.todoData.priority === inputPriority
      ) {
        enqueueSnackbar("Todo's details weren't changed", {
          variant: "info",
        });
      } else {
        props.setData(response.data);
        enqueueSnackbar("Todo updated", { variant: "success" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.text) {
          setTextError(error.response.data.text);
        }

        if (error.response.data.priority) {
          setPriorityError(error.response.data.priority);
        }

        enqueueSnackbar("There were some errors", { variant: "error" });
      }
      if (!error.request) {
        throw error;
      }
    }
  };

  const markTodoAsDone = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/todos/todo/${props.todoData.id}`,
        { done: true }
      );
      props.setData(response.data);
      if (props.todoData.done) {
        enqueueSnackbar("Todo was already marked as done", { variant: "info" });
      } else {
        enqueueSnackbar("Todo marked as done", {
          variant: "success",
        });
      }
    } catch (error) {
      if (error.request) {
        enqueueSnackbar(error.toString(), {
          variant: "error",
        });
      }
    }
  };

  const undoTodo = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/todos/todo/${props.todoData.id}`,
        { done: false }
      );
      props.setData(response.data);
      if (!props.todoData.done) {
        enqueueSnackbar("Todo was undone", { variant: "info" });
      } else {
        enqueueSnackbar("Todo restored to undone", {
          variant: "success",
        });
      }
    } catch (error) {
      if (error.request) {
        enqueueSnackbar(error.toString(), {
          variant: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (props.todoData) {
      setInputText(props.todoData.text);
      setInputPriority(props.todoData.priority);
    }
  }, [props.todoData]);

  return (
    <div className="App">
      <div className="div-buttons">
        <Button
          className="button-mark-as-done"
          variant="outlined"
          color="secondary"
          onClick={markTodoAsDone}
        >
          Mark todo as done <Icon>check</Icon>
        </Button>
        <Button variant="outlined" color="primary" onClick={undoTodo}>
          Mark todo as undone <Icon>undo</Icon>
        </Button>
      </div>
      <Typography variant="h2">Update Todo: {props.todoData.text}</Typography>
      <Container>
        <div className="Container">
          <TextField
            variant="outlined"
            label="Text"
            fullWidth
            error={textError !== ""}
            helperText={textError}
            onFocus={() => setTextError("")}
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          <TextField
            className="Select"
            select
            label="Priority"
            variant="outlined"
            error={priorityError !== ""}
            helperText={priorityError}
            onFocus={() => setPriorityError("")}
            value={inputPriority}
            onChange={(e) => setInputPriority(e.target.value)}
          >
            {["important", "normal", "not important"].map((priority) => (
              <MenuItem value={priority}>{priority}</MenuItem>
            ))}
          </TextField>
        </div>
      </Container>
      <Button variant="outlined" onClick={handleUpdateTodo}>
        Update Todo
      </Button>
    </div>
  );
};
