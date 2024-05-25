import React from "react";
import { connect } from "react-redux";
import { setCosts, setGlobal } from "../store";
import dayjs from "dayjs";
import { CProps, Cost } from "../types";
import ChangeChart from "../components/ChangeChart";
import CurrencyList from "currency-list";

const Home: React.FC<CProps> = ({ costs, global }) => {
    const currency = CurrencyList.get(global.currency, "en_US");

    const calculateNetworth = (): number => costs.reduce((acc, cost) => acc + (cost.positive ? cost.amount : -cost.amount), global.networth);

    const getTodayCosts = (): Cost[] => costs.filter((cost) => dayjs(cost.timestamp).isSame(dayjs(), "day"));

    const todayCosts = getTodayCosts();

    const calculateDailyChange = (): number => todayCosts.reduce((acc, cost) => acc + (cost.positive ? cost.amount : -cost.amount), 0);

    const todayChange = calculateDailyChange();

    const getDailySpent = (): number => todayCosts.reduce((acc, cost) => acc + (!cost.positive ? cost.amount : 0), 0);

    const getDailyGain = (): number => todayCosts.reduce((acc, cost) => acc + (cost.positive ? cost.amount : 0), 0);

    return <div className="container" style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "row" }}>
        <div>
            <h1>Hi, {global.name}</h1>
            <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                <span>Today, you {todayChange > 0 ? "gain" : "spent"} {Math.abs(todayChange)} {currency.symbol}</span>
                <span style={{ marginTop: "-1%", color: todayChange > 0 ? "green" : "red", fontWeight: "200" }}>{todayChange > 0 ? "↑" : "↓"}</span>
            </div>
            <div>Loss: {(getDailySpent())} {currency.symbol}</div>
            <div>Gain: {(getDailyGain())} {currency.symbol}</div>
            <div>Current networth: {calculateNetworth()} {currency.symbol}</div>
        </div>
        <div>
            <ChangeChart initialNumber={global.networth} data={costs} days={20} />
        </div>
    </div>;
};

const mapStateToProps = (state: any) => ({
    global: state.global,
    costs: state.costs
});

export default connect(mapStateToProps, { setCosts, setGlobal })(Home);