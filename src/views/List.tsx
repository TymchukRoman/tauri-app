import React, { useEffect, useState } from "react";
import { invokeLoad } from "../api";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Cost {
    title: string;
    amount: number;
    type: string;
    timestamp: number;
}

const List: React.FC = () => {

    const [costs, setCosts] = useState<Cost[]>([]);

    useEffect(() => {
        invokeLoad()
            .then((response) => {
                const list = JSON.parse(response);
                console.log(list);
                setCosts(list.costs);
            })
            .catch((error) => console.error(error))
    }, []);

    if (!costs) return <>Loading...</>

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'timestamp', headerName: 'Created', flex: 1 },
    ];

    const styles = { border: "none", color: "white" };

    return (
        <div style={{ height: 300, width: "calc(100% - 30px)", padding: "0px 15px" }}>
            <DataGrid
                rows={costs}
                style={styles}
                columns={columns}
                hideFooter={true}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        background: 'none',
                        backgroundColor: "transparent",
                    },
                    '& .MuiDataGrid-columnHeaders > div': {
                        backgroundColor: "rgb(255,255,255,0.05) !important"
                    },
                    '& .MuiDataGrid-filler': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-row': {
                        '--rowBorderColor': "transparent"
                    },
                    '& .MuiDataGrid-topContainer': {
                        '--DataGrid-rowBorderColor': 'transparent !important'
                    }
                }}
            />
        </div>
    );
}

export default List;