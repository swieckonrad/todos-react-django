import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TodoDetails } from "./pages/TodoDetails";
import { Home } from "./pages/Home";
import { SnackbarProvider } from "notistack";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#FF3333" },
    secondary: { A400: "#19C619" },
  },
});

export const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
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
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};
