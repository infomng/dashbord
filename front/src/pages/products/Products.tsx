import { useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";
import useFetch from "../../hooks/useFetch";


const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 200,
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 100,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 150,
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

  const [id, ...others] = columns;

    const initialState = {
      img: "",
      color: "",
      price: "",
      inStock: 0,
      producer: "",
      title: "  ",
    };
 

const Products = () => {

const { data, loading } = useFetch("http://localhost:8800/api/product/");

  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="products">
      {loading ? (
        "Loading please wait..."
      ) : (
        <div className="info">
          <h1>Products</h1>
          <button onClick={() => setOpen(true)}>Add New Products</button>
        </div>
      )}
      <DataTable slug="product" columns={columns} rows={data} />
      {open && <Add initialState={initialState} slug="product" columns={others} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
