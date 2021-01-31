import { Route, Switch } from "react-router-dom";
import About from "./page/About";
import Main from "./page/Main";
import "./app.css";
import { useEffect } from "react";
import { checkAuth } from "./api";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "./reducer/sideBarReducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { accessToken, user } = await checkAuth();
      if (accessToken) {
        dispatch(setAccessToken(accessToken));
        dispatch(setUser(user));
      }
    })();
  }, [dispatch]);
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
