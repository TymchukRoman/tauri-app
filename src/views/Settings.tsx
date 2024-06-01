import React, { useEffect, useState } from "react";
import { invCreateBackup, invResetData, invSetGlobal } from "../api";
import CurrencyList from "currency-list";
import { connect } from "react-redux";
import { setCosts, setGlobal, resetGlobal } from "../store";
import { CProps } from "../types";
import { toast } from "react-toastify";

const allCurrencies = CurrencyList.getAll("en_US");
const currencies: any[] = Object.keys(allCurrencies).map((key: any) => {
    const currency = allCurrencies[key];
    return {
        label: `${currency.name} (${currency.symbol})`,
        value: currency.code
    };
});

const Settings: React.FC<CProps & { resetGlobal: () => void }> = ({ global, setGlobal, setCosts, resetGlobal }) => {
    const [currency, setCurrency] = useState<string>(global.currency || "USD");

    const createBackup = () => {
        invCreateBackup()
            .then(() => toast.success("Backup created"))
            .catch(() => toast.error("Backup creation failed"));
    };

    const resetData = () => {
        invResetData()
            .then(() => {
                resetGlobal();
                setCosts([]);
                toast.success("Data reset succeed");
            })
            .catch(() => toast.error("Data reset failed"));
    };

    useEffect(() => {
        currency && (currency !== global?.currency) && invSetGlobal({ ...global, currency })
            .then(() => setGlobal({ ...global, currency }))
            .catch((error) => console.error(error));
    }, [currency]);

    if (!global || !currency) return <>Loading...</>;

    return <div className="container" style={{ gap: "10px" }}>
        <h1>Settings</h1>
        <div className="flex-row">
            <label>Currency</label>
            <select value={currency} style={{ width: "300px" }} onChange={(e) => setCurrency(e.target.value)}>
                {currencies.map(({ value, label }: { value: string, label: string }) => <option key={value} value={value}>{label}</option>)}
            </select>
        </div>
        <div className="flex-row">
            <button style={{ width: "400px" }} onClick={createBackup}>Create data backup</button>
        </div>
        <div className="flex-row">
            <button style={{ width: "400px", backgroundColor: "darkred" }} onClick={resetData}>Reset data</button>
        </div>
    </div>;
};

const mapStateToProps = (state: any) => ({
    global: state.global,
    costs: state.costs
});

export default connect(mapStateToProps, { setCosts, setGlobal, resetGlobal })(Settings);