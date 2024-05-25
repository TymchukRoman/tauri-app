import React, { useRef, useState } from "react";
import { invSetCosts } from "../api";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { setCosts, setGlobal } from "../store";
import dayjs, { Dayjs } from "dayjs";
import { CProps, Cost } from "../types";
import { StaticDatePicker } from "@mui/x-date-pickers";

const New: React.FC<CProps> = ({ costs, setCosts }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const [positive, setPositive] = useState<boolean>(false);
    const [date, setDate] = useState<Dayjs | null>(dayjs());

    async function save() {
        const titleValue = titleRef?.current?.value || `New cost (${dayjs().format("DD/MM/YYYY hh:mm")})`;
        const amountValue = Number(amountRef?.current?.value);
        const typeValue = typeRef?.current?.value || "";

        if (!amountValue) {
            return false;
        }

        const newCost: Cost = {
            id: uuidv4(),
            title: titleValue,
            amount: amountValue,
            type: typeValue,
            timestamp: date?.valueOf() || dayjs().valueOf(),
            positive,
        };

        await invSetCosts([...costs, newCost])
            .then(() => {
                setCosts([...costs, newCost]);
                if (titleRef.current && amountRef.current && typeRef.current) {
                    titleRef.current.value = "";
                    amountRef.current.value = "";
                    typeRef.current.value = "";
                    setDate(dayjs());
                    setPositive(false);
                }
            });
    }

    const getFill = (activeState: boolean, color: string) => activeState ? color : "#0f0f0f98";

    return <div className="container">
        <h1>New operation</h1>
        <form onSubmit={(e) => { e.preventDefault(); save(); }}                >
            <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-evenly" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", width: "500px", justifyContent: "space-between" }}>
                        <button type="button" style={{ width: "240px", backgroundColor: getFill(positive, "green") }} onClick={() => setPositive(true)}>Income</button>
                        <button type="button" style={{ width: "240px", backgroundColor: getFill(!positive, "red") }} onClick={() => setPositive(false)}>Outcome</button>
                    </div>
                    <input className="custom-input" ref={titleRef} placeholder="title" />
                    <input className="custom-input" ref={amountRef} placeholder="amount" type="number" />
                    <input className="custom-input" ref={typeRef} placeholder="type" />
                    <button type="submit" style={{ marginTop: "10px", width: "500px" }}>Save</button>
                </div>
                <div>
                    <StaticDatePicker
                        className="picker-class"
                        sx={{
                            "& .MuiPickersLayout-root": {
                                backgroundColor: "transparent",
                            },
                            "& .MuiDialogActions-root": {
                                display: "none"
                            },
                            "& .MuiButtonBase-root": {
                                backgroundColor: "#00000025"
                            },
                            "& .Mui-selected": {
                                color: "#ffffff"
                            }
                        }}
                        value={date || dayjs()}
                        onChange={(value) => setDate(value)}
                    />
                </div>
            </div>
        </form >
    </div >;
};

const mapStateToProps = (state: any) => ({
    global: state.global,
    costs: state.costs
});

export default connect(mapStateToProps, { setCosts, setGlobal })(New);