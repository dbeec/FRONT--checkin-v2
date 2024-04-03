import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useEffect, useState } from "react";
// import moment from "moment";
import * as IconLU from "react-icons/lu";
import axios from "axios";
import { apiBackend } from "../../config/config";

type Row = {
  original: any;
};

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("documentType.type", {
    header: "Doc. Type",
    size: 1,
  }),

  columnHelper.accessor("document", {
    header: "Identification",
    size: 1,
  }),

  columnHelper.accessor("full_name", {
    header: "Name",
    size: 1,
  }),

  columnHelper.accessor("role.name", {
    header: "Rol",
    size: 1,
  }),

  columnHelper.accessor("email", {
    header: "Email",
    size: 1,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const WowDesarrollosTable = () => {
  const [dataUser, setDataUser] = useState<any>([]);
  
  // Funcion para traer usuarios de la bd
  const getEmployees = async () => {
    try {
      const response = await axios.get(`${apiBackend}/user`)
      setDataUser(response.data)
    } catch (error) {
      console.error(error)
    }
  };

  const handleExportRows = (rows: Row[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(dataUser);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data: dataUser,
    enableRowSelection: true,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableColumnFilters: false,
    initialState: { density: "compact" },
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    enableClickToCopy: true,
    enableRowNumbers: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: ".6rem",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          sx={{ color: "#fff", fontSize: "1.29rem" }}
          onClick={getEmployees}
        >
          <IconLU.LuRefreshCcw />
        </Button>
        <Button
          variant="contained"
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
          sx={{ color: "#fff" }}
        >
          Export
        </Button>
        <Button
          variant="contained"
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
          sx={{ color: "#fff" }}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <MaterialReactTable table={table} />;
    </>
  );
};

export default WowDesarrollosTable;
