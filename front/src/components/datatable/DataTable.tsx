import { Link } from "react-router-dom";
import "./dataTable.scss";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";


type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props:Props) => {
  const getRowId = (row:any) => row._id;

     const handleDelete = (_id: number) => {
       //delete the item
       // mutation.mutate(id)
       console.log(" the element has been deleted")
     };

      const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="action">
              <Link to={`/${props.slug}/${params.row._id}`}>
                <img src="/view.svg" alt="" />
              </Link>
              <div
                className="delete"
                onClick={() => handleDelete(params.row._id)}
              >
                <img src="/delete.svg" alt="" />
              </div>
            </div>
          );
        },
      };
 
  return (
    <div className="dataTable">
      {}
      <DataGrid
        getRowId={getRowId}
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        // pour la bar de recherche et les filtres
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        // disableRowSelectionOnClick
        // disableColumnFilter
        // disableDensitySelector
        // disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
