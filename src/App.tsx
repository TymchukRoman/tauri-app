import "./App.css";
import { Link, Route } from "wouter";
import New from "./views/New";
import List from "./views/List";

const Header: React.FC = () => {
  return <header>
    <Link className="sub-button" href="/new">
      <button className="link">New</button>
    </Link>
    <Link className="sub-button" href="/costs">
      <button className="link">Costs</button>
    </Link>
  </header>
}

function App() {
  return <div>
    <Header />

    <Route path="/new" component={New} />
    <Route path="/costs" component={List} />
  </div>
}

export default App;
