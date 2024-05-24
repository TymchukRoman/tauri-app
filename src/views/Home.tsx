import React from "react";
import { connect } from "react-redux";
import { setCosts, setGlobal } from "../store";
import dayjs from "dayjs";
import { CProps, Cost } from "../types";
import ChangeChart from "../components/ChangeChart";

const Home: React.FC<CProps> = ({ costs, global }) => {

    const calculateNetworth = (): number => costs.reduce((acc, cost) => acc + (cost.positive ? cost.amount : -cost.amount), global.networth);

    const getTodayCosts = (): Cost[] => costs.filter((cost) => dayjs(cost.timestamp).isSame(dayjs(), "day"));

    const todayCosts = getTodayCosts();

    const calculateDailyChange = (): number => todayCosts.reduce((acc, cost) => acc + (cost.positive ? cost.amount : -cost.amount), 0);

    const getDailySpent = (): number => todayCosts.reduce((acc, cost) => acc + (cost.positive ? cost.amount : 0), 0);

    const getDailyGain = (): number => todayCosts.reduce((acc, cost) => acc + (!cost.positive ? cost.amount : 0), 0);

    return <div className="container" style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "row" }}>
        <div>
            <h1>Hi, {global.name}</h1>
            <p>Today, you spent {calculateDailyChange()}</p>
            <p>Spent: {(getDailySpent())}</p>
            <p>Gain: {(getDailyGain())}</p>
            <p>Current networth: {calculateNetworth()}</p>
        </div>
        <div>
            <ChangeChart initialNumber={global.networth} data={costs} days={40} />
        </div>
    </div>;
};

const mapStateToProps = (state: any) => ({
    global: state.global,
    costs: state.costs
});

export default connect(mapStateToProps, { setCosts, setGlobal })(Home);