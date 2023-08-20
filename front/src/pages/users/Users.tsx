import DataTable from "../../components/datatable/DataTable";
import { userRows } from "../../data";
import "./users.scss";
import{useState} from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
import Add from "../../components/add/Add";
import useFetch from "../../hooks/useFetch";




const Users = () => {



    
  const { data, loading,} = useFetch("http://localhost:8800/api/user/");

  


  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "Avatar",
      width: 50,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "firstName",
      type: "string",
      headerName: "First name",
      width: 100,
    },
    {
      field: "lastName",
      type: "string",
      headerName: "Last name",
      width: 100,
    },
    {
      field: "email",
      type: "string",
      headerName: "Email",
      width: 150,
    },
    {
      field: "phone",
      type: "string",
      headerName: "Phone",
      width: 180,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },
    {
      field: "password",
      headerName: "password",
      width: 150,
      type: "string",
    },
  ];

  const [id, ...others] = columns;


  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 55 },
    { id: 6, lastName: "Melisandre", firstName: "Targarien", age: 70 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];


    const [open,setOpen] =useState(false);

    const initialState = {
      img: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "  ",
    };

  return (
    <div className="users">
      {loading ? (
        "Loading please wait..."
      ) : (
        <div className="info">
          <h1>Users</h1>
          <button onClick={() => setOpen(true)}>Add New User</button>
        </div>
      )}
      <DataTable slug="user" columns={columns} rows={data} />
      {open && (
        <Add
          initialState={initialState}
          slug="user"
          columns={others}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default Users