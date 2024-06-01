import React from "react";
import dayjs from "dayjs";
import { Cost } from "../types";
import { PieChart } from "@mui/x-charts";

interface CategorizedCostsProps {
    costs: Cost[];
    currency: any;
    positive: boolean;
}

const SLICE = 10;

const CategorizedCosts: React.FC<CategorizedCostsProps> = ({ costs, currency, positive }) => {

    const groupedByType = costs
        .filter((item: Cost) => (!positive ? !item.positive : item.positive) && dayjs(item.timestamp).isAfter(dayjs().subtract(1, "month")))
        .reduce((acc: Record<string, number>, item: Cost) => ({ ...acc, [item.type]: (acc[item.type] || 0) + item.amount }), {});

    const fullChartData = Object.keys(groupedByType)
        .map((key: string) => ({
                value: groupedByType[key],
                label: key
            }))
        .sort((a, b) => b.value - a.value);

    const list = fullChartData.slice(0, SLICE);
    const others = fullChartData.slice(SLICE);

    const chartData = [
        ...list,
        others.reduce((acc, item) => ({ ...acc, value: acc.value + item.value }), { label: "Other", value: 0 })
    ];

    const baseFontSize = 12;
    const maxFontSize = 26;

    const calculateFontSize = (value: number) => {
        const logValue = Math.log(value);
        const scaledValue = logValue / Math.log(Math.max(...chartData.map(item => item.value))) * (maxFontSize - baseFontSize);
        return baseFontSize + scaledValue;
    };

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            {!positive && <div style={{ width: "50%" }}>
                <PieChart
                    series={[{ data: chartData }]}
                    width={800}
                    height={400}
                />
            </div>}
            <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1>All time {positive ? "incomes" : "costs"}</h1>
                <div style={{ width: 800, height: 360, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px", padding: "20px 0px", overflowY: "scroll" }}>
                    {fullChartData.map((item) => <div key={item.label} style={{ display: "flex", gap: "5px", justifyContent: "center", fontSize: calculateFontSize(item.value) }}>
                            <span>{item.label} : {item.value} {currency?.symbol} </span>
                            <span style={{ marginTop: "-2px", color: positive ? "green" : "red", fontWeight: "200" }}>{positive ? "↑" : "↓"}</span>
                        </div>)}
                </div>
            </div>
            {positive && <div style={{ width: "50%" }}>
                <PieChart
                    series={[{ data: chartData }]}
                    width={800}
                    height={400}
                />
            </div>}
        </div>
    );
};

export default CategorizedCosts;
