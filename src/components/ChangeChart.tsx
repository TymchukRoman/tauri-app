import React from "react";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { Cost } from "../types";

interface CumulativeCost {
    date: string;
    value: number;
}

const processData = (
    initialNumber: number,
    data: Cost[],
    days: number
): { dates: string[], values: number[] } => {
    const dateMap: { [date: string]: number } = {};

    data.forEach(({ amount, timestamp, positive }) => {
        const date = dayjs(timestamp).format("YYYY-MM-DD");
        if (!dateMap[date]) {
            dateMap[date] = 0;
        }
        dateMap[date] += positive ? amount : -amount;
    });

    const allDates = Object.keys(dateMap).sort();
    const earliestDate = dayjs(allDates[0]);
    const initialDate = earliestDate.subtract(1, "day");

    const cumulativeData: CumulativeCost[] = [];
    let cumulativeSum = initialNumber;

    cumulativeData.push({ date: initialDate.format("YYYY-MM-DD"), value: cumulativeSum });

    for (let date = earliestDate; date.isBefore(dayjs()) || date.isSame(dayjs()); date = date.add(1, "day")) {
        const dateString = date.format("YYYY-MM-DD");
        if (dateMap[dateString] !== undefined) {
            cumulativeSum += dateMap[dateString];
        }
        cumulativeData.push({ date: dateString, value: cumulativeSum });
    }

    const filteredData = cumulativeData.filter(dataPoint => dayjs(dataPoint.date).isAfter(dayjs().subtract(days + 1, "day")));

    const dates = filteredData.map(dataPoint => dataPoint.date);
    const values = filteredData.map(dataPoint => dataPoint.value);

    return { dates, values };
};

interface ChangeChartProps {
    initialNumber: number;
    data: Cost[];
    days: number;
}

const ChangeChart: React.FC<ChangeChartProps> = ({ initialNumber, data, days }) => {
    const { dates, values } = processData(initialNumber, data, days);

    return (
        <LineChart
            slotProps={{ legend: { hidden: true } }}
            width={800}
            height={400}
            series={[{ data: values }]}
            xAxis={[{ scaleType: "point", data: dates }]}
        />
    );
};

export default ChangeChart;
