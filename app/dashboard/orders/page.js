"use client";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Fab, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchOrders } from "@/app/lib/orders/api";
import StatusUpdateDialog from "@/app/components/dashboard/statusUpdateDialog";
import { useRouter } from "next/navigation";

const DashboardOrders = () => {
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
      field: "name",
      headerName: "Name",
      width: 120,
      renderCell: (cellValues) => cellValues.row.name,
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      type: "number",
      width: 100,
      renderCell: (cellValues) => `$${cellValues.row.total_amount}`,
    },
    {
      field: "status",
      headerName: "Order Status",
      type: "number",
      width: 120,
      renderCell: (cellValues) => `${cellValues.row.status}`,
    },
    {
      field: "change_status",
      headerName: "Change Status",
      width: 200,
      renderCell: (cellValues) => (
        <Fab
          color="secondary"
          aria-label="edit"
          size="small"
          variant="extended"
          onClick={() => handleOpenDialog(cellValues.row)}
        >
          Update Status
        </Fab>
      ),
    },
    {
      field: "view",
      headerName: "View",
      width: 120,
      renderCell: (cellValues) => (
        <Link
          href={`/my-account/orders/${cellValues.row.id}`}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <Fab
            color="primary"
            aria-label="view"
            size="small"
            variant="extended"
          >
            View
          </Fab>
        </Link>
      ),
    },
  ];

  const [orders, setOrders] = useState([]);
  const [rowCount, setRowCount] = useState(undefined);
  const [rowCountState, setRowCountState] = useState(rowCount || 0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = (updated, updatedOrder) => {
    setDialogOpen(false);
    setSelectedOrder(null);

    if (updated) {
      // Update the local state instead of refreshing the page
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    }
  };

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchOrders(paginationModel.page + 1);
      setRowCount(data.count);
      setOrders(data.results);
    };

    getOrders();
  }, [paginationModel.page]);

  return (
    <Container>
      <DataGrid
        rows={orders}
        columns={columns}
        rowCount={rowCountState}
        rowHeight={65}
        pageSizeOptions={[8]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableSelectionOnClick
      />
      {/* Order Status Dialog */}

      <StatusUpdateDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        orderId={selectedOrder?.id}
        currentStatus={selectedOrder?.status}
      />
    </Container>
  );
};

export default DashboardOrders;
