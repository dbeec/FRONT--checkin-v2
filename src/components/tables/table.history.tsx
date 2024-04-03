import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useEffect } from "react";
import userData from "./datatable.wow";
import * as IconLU from "react-icons/lu";

type Row = {
  original: any;
};

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("document", {
    header: "Document Type",
    size: 1,
  }),

  columnHelper.accessor("document", {
    header: "Identification",
    size: 1,
  }),

  columnHelper.accessor("name", {
    header: "Name",
    Cell: ({ cell }) => <div>{cell.row.original.name?.toUpperCase()}</div>,
  }),
  
  columnHelper.accessor("date", {
    header: "Email",
    size: 10,
  }),

  columnHelper.accessor("date", {
    header: "Date",
    size: 10,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

export default function HistoryTable() {
  // const [dataUser, setDataUser] = useState<any>([]);

  // Funcion para traer usuarios de la bd
  // const getEmployees = async () => {
  //   try {
  //     const res = await getAxiosRequest("/employees");
  //     const employeesWithCompany = res.map((employee: Employee) => ({
  //       ...employee,
  //       company: employee.company?.name,
  //     }));
  //     setDataUser(employeesWithCompany);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleExportRows = (rows: Row[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(userData);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data: userData || [],
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
          // onClick={getEmployees}
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
    // getEmployees();
    const intervalId = setInterval(() => {
      // clearInterval(intervalId);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <MaterialReactTable table={table} />;
    </>
  );
};