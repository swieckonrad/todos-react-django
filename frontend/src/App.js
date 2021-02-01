import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TodoDetails } from "./TodoDetails";
import { Home } from "./Home";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/todos" exact>
          <Home />
        </Route>
        <Route path="/todos/todo/:id" exact>
          <TodoDetails />
        </Route>
        <Route>404 Not found</Route>
      </Switch>
    </BrowserRouter>
  );
};
