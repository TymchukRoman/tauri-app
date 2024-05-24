import React, { useRef } from "react";
import { invSetCosts } from "../api";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { setCosts, setGlobal } from "../store";
import dayjs from "dayjs";
import { CProps, Cost } from "../types";

const New: React.FC<CProps> = ({ costs, setCosts }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);

    async function save() {
        const titleValue = titleRef?.current?.value || `New cost (${dayjs().format("DD/MM/YYYY hh:mm")})`;
        const amountValue = Number(amountRef?.current?.value) || 0;
        const typeValue = typeRef?.current?.value || "";

        const newCost: Cost = {
            id: uuidv4(),
            title: titleValue,
            amount: amountValue,
            type: typeValue,
            timestamp: (new Date()).getTime(),
            positive: false
        };

        await invSetCosts({ costs: [...costs, newCost] }).then(() => {
            setCosts([...costs, newCost]);
            if (titleRef.current && amountRef.current && typeRef.current) {
                titleRef.current.value = "";
                amountRef.current.value = "";
                typeRef.current.value = "";
            }
        });
    }

    return (
        <div className="container">
            <h1>Create new item</h1>
            <form onSubmit={(e) => { e.preventDefault(); save(); }}                >
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <input className="custom-input" ref={titleRef} placeholder="title" />
                    <input className="custom-input" ref={amountRef} placeholder="amount" type="number" />
                    <input className="custom-input" ref={typeRef} placeholder="type" />
                </div>
                <button type="submit" style={{ marginTop: "10px", width: "500px" }}>Save</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    global: state.global,
    costs: state.costs
});

export default connect(mapStateToProps, { setCosts, setGlobal })(New);