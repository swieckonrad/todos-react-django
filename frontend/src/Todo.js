import "./App.css";
import {
  CardActionArea,
  Icon,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const Todo = (props) => {
  const history = useHistory();
  return (
    <div className="Todoapp">
      <Paper className="Paper" elevation={3}>
        <CardActionArea
          onClick={() => history.push(`/todos/todo/${props.todoData.id}`)}
        >
          <div className="CardAction">
            <Typography variant="h6">Todo</Typography>
            {Object.entries(props.todoData)
              .filter(
                ([key]) => !["date_created", "date_updated", "id"].includes(key)
              )
              .map(([key, value]) => (
                <div>
                  {key}: {value.toString()}
                </div>
              ))}
            {/* <div>id: {props.todoData.id}</div>
        <div>text: {props.todoData.text}</div> */}
            <IconButton
              style={{ zIndex: 10000 }}
              onClick={(e) => {
                e.stopPropagation();
                props.handleRemoveEl(props.todoData.id);
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        </CardActionArea>
      </Paper>
    </div>
  );
};
