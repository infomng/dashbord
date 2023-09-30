import axios from "axios";
import "./add.scss";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialState: {
    img: string;
    firtsName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    color?: string;
    price?: string;
    inStock?: number;
    producer?: string;
    title?: string;
  };
};

const Add = (props: Props) => {
  const [data, setData] = useState(props.initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8800/api/${props.slug}`,
        data
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
    
  

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter(
              (item) => item.field !== "_id" && item.field !== "createdAt"
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type}
                  placeholder={column.field}
                  id={column.field}
                  onChange={handleChange}
                />
              </div>
            ))}
          <button type="submit" >Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
