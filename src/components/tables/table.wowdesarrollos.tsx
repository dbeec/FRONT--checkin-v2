import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useEffect, useState } from "react";
import * as IconLU from "react-icons/lu";
import axios from "axios";
import { apiBackend } from "../../config/config";

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

  columnHelper.accessor("stateType.state", {
    header: "State",
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

  const handleExportSelectedRow = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (selectedRows.length === 1) {
      const selectedRow = selectedRows[0].original;
      const { documentType, document, full_name, role, email, stateType } = selectedRow;
      const csvData = {
        documentType: documentType.type,
        document,
        full_name,
        role: role.name,
        email,
        stateType: stateType.state,
      };
      const customCsvData = {
        "Tipo de Documento": csvData.documentType,
        "Documento": csvData.document,
        "Nombre Completo": csvData.full_name,
        "Rol": csvData.role,
        "Correo Electrónico": csvData.email,
        "Estado": csvData.stateType,
      };

      const csv = generateCsv(csvConfig)([customCsvData]);
      download(csvConfig)(csv);
    }
  };


  const handleExportData = () => {
    const filteredData = dataUser.map((user: any) => {
      const customData = {
        "Tipo de Documento": user.documentType.type,
        "Documento": user.document,
        "Nombre Completo": user.full_name,
        "Rol": user.role.name,
        "Correo Electrónico": user.email,
        "Estado": user.stateType.state,
      };
      return customData;
    });

    const csv = generateCsv(csvConfig)(filteredData);
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
          onClick={() => handleExportSelectedRow()}
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
