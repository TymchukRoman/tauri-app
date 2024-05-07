import "./App.css";
import { Link, Route, Switch } from "wouter";
import New from "./views/New";
import List from "./views/List";
import Settings from "./views/Settings";

const Header: React.FC = () => {
  return <header>
    <Link className="sub-button" href="/new">
      <button className="link">New</button>
    </Link>
    <Link className="sub-button" href="/costs">
      <button className="link">Costs</button>
    </Link>
    <Link className="sub-button" href="/settings">
      <button className="link">Settings</button>
    </Link>
  </header>
}

function App() {
  return <div>
    <Header />
    <Switch>
      <Route path="/costs" component={List} />
      <Route path="/settings" component={Settings} />
      <Route path="/*" component={New} />
    </Switch>
  </div>
}

export default App;
