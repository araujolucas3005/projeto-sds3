import { Dashboard } from "pages/Dashboard";
import { Home } from "pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}