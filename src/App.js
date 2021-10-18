import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = React.lazy(() => import("./component/Home"));
const About = React.lazy(() => import("./component/About"));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </Switch>
          </Suspense>
        </Router>
      </header>
    </div>
  );
}

export default App;
