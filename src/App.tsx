import "./App.css";
import { Link, Route, Switch } from "wouter";
import New from "./views/New";
import List from "./views/List";
import Settings from "./views/Settings";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { connect } from "react-redux";
import { setCosts, setGlobal } from "./store";
import { useEffect } from "react";
import { invGetCosts, invGetGlobal } from "./api";
import GetStarted from "./views/GetStarted";
import Home from "./views/Home";
import { CProps } from "./types";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const Header: React.FC = () => <header>
    <Link className="sub-button" href="/home">
        <button className="link">Home</button>
    </Link>
    <Link className="sub-button" href="/new">
        <button className="link">New</button>
    </Link>
    <Link className="sub-button" href="/costs">
        <button className="link">Costs</button>
    </Link>
    <Link className="sub-button" href="/settings">
        <button className="link">Settings</button>
    </Link>
</header>;

class Loader {
    globalLoaded: boolean;
    costsLoaded: boolean;

    constructor() {
        this.globalLoaded = false;
        this.costsLoaded = false;
    }

    loadCosts() {
        this.costsLoaded = true;
    }

    loadGlobal() {
        this.globalLoaded = true;
    }

    isLoaded() {
        return this.costsLoaded && this.globalLoaded;
    }
}

const loader = new Loader;

const App: React.FC<CProps> = ({ global, setCosts, setGlobal }) => {
    useEffect(() => {
        invGetCosts()
            .then((response) => {
                const list = JSON.parse(response);
                setCosts(list.costs);
                loader.loadCosts();
            })
            .catch((error) => console.error(error));

        invGetGlobal()
            .then((response) => {
                const data = JSON.parse(response);
                setGlobal(data);
                loader.loadGlobal();
            })
            .catch((error) => console.error(error));
    }, []);

    if (!loader.isLoaded()) return <>Loading...</>;
    if (!global.name || !global.networth) return <GetStarted />;

    return <ThemeProvider theme={darkTheme}>
        <Header />
        <Switch>
            {/* @ts-ignore */}
            <Route path="/costs" component={List} />
            {/* @ts-ignore */}
            <Route path="/settings" component={Settings} />
            {/* @ts-ignore */}
            <Route path="/new" component={New} />
            {/* @ts-ignore */}
            <Route path="/*" component={Home} />
        </Switch>
    </ThemeProvider>;
};

const mapStateToProps = (state: any) => ({
    global: state.global,
    costs: state.costs
});

export default connect(mapStateToProps, { setCosts, setGlobal })(App);
