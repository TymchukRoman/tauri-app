import React, { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import CurrencyList from "currency-list";
import { connect } from "react-redux";
import { setCosts, setGlobal } from "../store";
import { CProps } from "../types";
import { invSetCosts } from "../api";

const List: React.FC<CProps> = ({ global, costs, setCosts }) => {

    const [loading, setLoading] = useState<boolean>(false);

    if (!costs) return <>Loading...</>;

    const RenderAmountCell = ({ value, row }: GridRenderCellParams<any, string>) => {
        const currency = CurrencyList.get(global.currency, "en_US");
        return <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ marginTop: "-2%", color: row.positive ? "green" : "red", fontWeight: "200" }}>{row.positive ? "↑" : "↓"}</span>
            <span>{value} {currency.symbol} </span>
        </div>;
    };

    const RenderTimestampCell = ({ value }: GridRenderCellParams<any, string>) => <div>{dayjs(value).format("MM/DD/YYYY hh:mm")}</div>;

    const RenderActionsCell = ({ value }: GridRenderCellParams<any, string>) => <div><button disabled={loading} onClick={() => deleteRow(value)}>Delete</button></div>;

    const columns: GridColDef[] = [
        { field: "title", headerName: "Title", flex: 5 },
        { field: "amount", headerName: "Amount", flex: 1, renderCell: RenderAmountCell },
        { field: "type", headerName: "Type", flex: 5 },
        { field: "timestamp", headerName: "Created", flex: 5, renderCell: RenderTimestampCell },
        { field: "id", headerName: "", flex: 1, renderCell: RenderActionsCell },
    ];

    const styles = { border: "none", color: "white" };

    const deleteRow = (id: string | undefined) => {
        setLoading(true);
        const newList = costs.filter((cost) => cost.id !== id);
        invSetCosts(newList).then(() => {
            setLoading(false);
            setCosts(newList);
        });
    };

    return (
        <div style={{ height: "calc(100vh - 80px)", width: "calc(100% - 30px)", padding: "0px 15px" }}>
            <DataGrid
                slots={{
                    noRowsOverlay: () => <>Loading</>,
                }}
                rows={costs}
                style={styles}
                columns={columns}
                hideFooter={true}
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        background: "none",
                        backgroundColor: "transparent",
                        gap: "5px"
                    },
                    "& .MuiDataGrid-filler": {
                        display: "none"
                    },
                    "& .MuiDataGrid-row": {
                        "--rowBorderColor": "transparent"
                    },
                    "& .MuiDataGrid-topContainer": {
                        "--DataGrid-rowBorderColor": "transparent !important"
                    },
                    "& .MuiDataGrid-columnHeaders > div": {
                        backgroundColor: "#3A3A3A !important"
                    },
                    "& .MuiDataGrid-menuIcon": {
                        display: "none"
                    },
                    "& .MuiDataGrid-iconButtonContainer": {
                        marginLeft: "5px"
                    }
                }}
            />
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    global: state.global,
    costs: state.costs
});

export default connect(mapStateToProps, { setCosts, setGlobal })(List);