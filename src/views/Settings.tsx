import React, { useEffect, useState } from "react";
import { invSetGlobal } from "../api";
import CurrencyList from "currency-list";
import { CProps } from "../App";
import { connect } from "react-redux";
import { setCosts, setGlobal } from "../store";

const allCurrencies = CurrencyList.getAll("en_US");
const currencies: any[] = Object.keys(allCurrencies).map((key: any) => {
    const currency = allCurrencies[key];
    return {
        label: `${currency.name} (${currency.symbol})`,
        value: currency.code
    };
});

const Settings: React.FC<CProps> = ({ global, setGlobal }) => {
    const [currency, setCurrency] = useState<string>(global.currency);

    useEffect(() => {
        currency && (currency !== global?.currency) && invSetGlobal({ ...global, currency })
            .then(() => setGlobal({ ...global, currency }))
            .catch((error) => console.error(error));
    }, [currency]);

    if (!global || !currency) return <>Loading...</>;

    return <div className="container">
        <h1>Settings</h1>
        <div className="flex-row">
            <label>Currency</label>
            <select value={currency} style={{ width: "300px" }} onChange={(e) => setCurrency(e.target.value)}>
                {currencies.map(({ value, label }: { value: string, label: string }) => <option key={value} value={value}>{label}</option>)}
            </select>
        </div>
    </div>;
};

const mapStateToProps = (state: any) => ({
    global: state.global,
    costs: state.costs
});

export default connect(mapStateToProps, { setCosts, setGlobal })(Settings);