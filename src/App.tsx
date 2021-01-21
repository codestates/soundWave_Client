import { Route, Switch } from "react-router-dom";
import About from "./page/About";
import Main from "./page/Main";
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </>
  );
}

export default App;
