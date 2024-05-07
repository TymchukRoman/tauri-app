import React, { useEffect, useState } from "react";
import { getGlobal } from "../api";
import CurrencyList from 'currency-list'


const allCurrencies = CurrencyList.getAll('en_US');
const currencies: any[] = Object.keys(allCurrencies).map((key: any) => {
    const currency = allCurrencies[key];
    return {
        label: `${currency.name} (${currency.symbol})`,
        value: currency.code
    }
});


const Settings: React.FC = () => {
    const [globalData, setGlobalData] = useState<any>([]);
    const [currency, setCurrency] = useState('USD');

    useEffect(() => {
        getGlobal()
            .then((response) => {
                const data = JSON.parse(response);
                setGlobalData(data);
            })
            .catch((error) => console.error(error))
    }, []);

    if (!globalData) return <>Loading...</>

    return (
        <div className="container">
            <h1>Settings</h1>
            <div className="flex-row">
                <label>Currency</label>
                <select value={currency} style={{ width: "300px" }} onChange={(e) => setCurrency(e.target.value)}>
                    {currencies.map(({ value, label }: { value: string, label: string }) => {
                        return <option value={value}>{label}</option>
                    })}
                </select>
            </div>
        </div>
    );
}

export default Settings;