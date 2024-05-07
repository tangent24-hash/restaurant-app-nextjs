"use client";
import { DataGrid } from "@mui/x-data-grid";
import getFoodItems from "@/lib/getFoodItems";
import { Button, Container, Fab, Link } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
    renderCell: (cellValues) => (
      <Fab color="primary" aria-label="id" size="small" variant="extended">
        {cellValues.id}
      </Fab>
    ),
  },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => (
      <img src={params.value} alt={params.row.name} style={{ height: 50 }} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    renderCell: (cellValues) => cellValues.row.name,
  },
  { field: "details", headerName: "Description", width: 150 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 110,
    renderCell: (cellValues) => `$${cellValues.row.price}`,
  },
  {
    field: "in_stock",
    headerName: "In Stock",
    type: "number",
    width: 110,
    renderCell: (cellValues) => `${cellValues.row.in_stock}`,
  },

  {
    field: "edit",
    headerName: "Edit",
    width: 100,
    renderCell: (cellValues) => (
      <Link
        href={`/dashboard/foods/${cellValues.row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Fab
          color="secondary"
          aria-label="edit"
          size="small"
          variant="extended"
        >
          Edit
        </Fab>
      </Link>
    ),
  },
  {
    field: "view",
    headerName: "View",
    width: 100,
    renderCell: (cellValues) => (
      <Link
        href={`/food/${cellValues.row.id}`}
        style={{ textDecoration: "none" }}
        target="_blank"
      >
        <Fab color="primary" aria-label="view" size="small" variant="extended">
          View
        </Fab>
      </Link>
    ),
  },
];

const DashboardFoods = () => {
  const [foods, setFoods] = useState([]);
  const [rowCount, setRowCount] = useState(undefined);
  const [rowCountState, setRowCountState] = useState(rowCount || 0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  useEffect(() => {
    const fetchFoods = async () => {
      const data = await getFoodItems(paginationModel.page + 1);
      setRowCount(data.count);
      setFoods(data.results);
    };

    fetchFoods();
  }, [paginationModel.page]);

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        href="/dashboard/foods/new"
        style={{
          marginBottom: 10,
          color: "white",
          backgroundColor: "darkslategray",
        }}
      >
        Add New Food
      </Button>
      <DataGrid
        rows={foods}
        columns={columns}
        rowCount={rowCountState}
        rowHeight={65}
        pageSizeOptions={[8]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default DashboardFoods;
