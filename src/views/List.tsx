import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import CurrencyList from "currency-list";
import { connect } from "react-redux";
import { setCosts, setGlobal } from "../store";
import { CProps } from "../App";

const List: React.FC<CProps> = ({ global, costs }) => {
    if (!costs) return <>Loading...</>;

    const RenderAmountCell = ({ value }: GridRenderCellParams<any, string>) => {
        const currency = CurrencyList.get(global.currency, "en_US");
        return <div>{value} {currency.symbol}</div>;
    };

    const RenderTimestampCell = ({ value }: GridRenderCellParams<any, string>) => <div>{dayjs(value).format("MM/DD/YYYY hh:mm")}</div>;

    const columns: GridColDef[] = [
        { field: "title", headerName: "Title", flex: 1 },
        { field: "amount", headerName: "Amount", flex: 1, renderCell: RenderAmountCell },
        { field: "type", headerName: "Type", flex: 1 },
        { field: "timestamp", headerName: "Created", flex: 1, renderCell: RenderTimestampCell },
    ];

    const styles = { border: "none", color: "white" };

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