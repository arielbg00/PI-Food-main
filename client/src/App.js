import './App.css';
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Create from "./components/Create";

function App() {
  return (
    <div className="App">
      <Route exact path="/"><LandingPage /></Route>
      <Route path="/home"><Home /></Route>
      <Route path="/details/:id" component={Detail} />
      <Route path="/create"><Create /></Route>
    </div>
  );
}

export default App;
