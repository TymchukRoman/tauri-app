import React, { useEffect, useRef, useState } from "react";
import { getCosts, setCosts as invokeSetCosts } from "../api";
import { v4 as uuidv4 } from 'uuid';

interface Cost {
    id: string;
    title: string;
    amount: number;
    type: string;
    timestamp: number;
}

const New: React.FC = () => {

    const [costs, setCosts] = useState<any[]>([]);

    useEffect(() => {
        getCosts()
            .then((response) => {
                const list = JSON.parse(response);
                console.log(list);
                setCosts(list.costs);
            })
            .catch((error) => console.error(error))
    }, [])

    const titleRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null)

    async function save() {
        const titleValue = titleRef?.current?.value || "New cost";
        const amountValue = Number(amountRef?.current?.value) || 0;
        const typeValue = typeRef?.current?.value || "default";

        const newCost: Cost = {
            id: uuidv4(),
            title: titleValue,
            amount: amountValue,
            type: typeValue,
            timestamp: (new Date()).getTime()
        }

        await invokeSetCosts({ costs: [...costs, newCost] });
    }

    return (
        <div className="container">
            <h1>Create new item</h1>
            <form onSubmit={(e) => { e.preventDefault(); save(); }}                >
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <input className="custom-input" ref={titleRef} placeholder="title" />
                    <input className="custom-input" ref={amountRef} placeholder="amount" />
                    <input className="custom-input" ref={typeRef} placeholder="type" />
                </div>
                <button type="submit" style={{ marginTop: "10px", width: "500px" }}>Save</button>
            </form>
        </div>
    );
}

export default New;