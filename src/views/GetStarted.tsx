import React, { useRef } from "react";
import { connect } from "react-redux";
import { setCosts, setGlobal } from "../store";
import { CProps } from "../App";
import { invSetGlobal } from "../api";

const GetStarted: React.FC<CProps> = ({ global, setGlobal }) => {

    const nameRef = useRef<HTMLInputElement>(null);
    const netRef = useRef<HTMLInputElement>(null);

    async function save() {
        const name = nameRef?.current?.value || "User";
        const networth = Number(netRef?.current?.value) || 0;

        await invSetGlobal({ ...global, name, networth })
            .then(() => setGlobal({ ...global, name, networth }));
    }

    return <div className="container">
        <h1>Get started!</h1>
        <form onSubmit={(e) => { e.preventDefault(); save(); }}                >
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <input className="custom-input" ref={nameRef} placeholder="Name" defaultValue={global.name || ""} />
                <input className="custom-input" ref={netRef} placeholder="Networth" type="number" defaultValue={global.networth || 0} />
            </div>
            <button type="submit" style={{ marginTop: "10px" }}>Set</button>
        </form>
    </div>;
};

const mapStateToProps = (state: any) => ({
    global: state.global,
    costs: state.costs
});

export default connect(mapStateToProps, { setCosts, setGlobal })(GetStarted);