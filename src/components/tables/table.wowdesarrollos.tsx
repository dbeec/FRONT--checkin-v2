import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useEffect } from "react";
import moment from "moment";
import userData from "./datatable.wow";
// import { getAxiosRequest } from "../utils/get-functions";
import * as IconLU from "react-icons/lu";

type Row = {
  original: any;
};

// interface Employee {
//   company?: {
//     name: string;
//   };
// }

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("document", {
    header: "Identification",
    size: 1,
  }),

  columnHelper.accessor("name", {
    header: "Name",
    Cell: ({ cell }) => <div>{cell.row.original.name?.toUpperCase()}</div>,
  }),
  
  columnHelper.accessor("date", {
    header: "Date",
    size: 10,
    Cell: ({ row }) => {

      return (
        <>
        <p>waiting...</p>
        </>
      );
    },
  }),

  columnHelper.accessor("check_in", {
    header: "Check IN",
    size: 10,
    Cell: ({ cell }) => {
      const checkinTime = moment(cell.getValue<string>(), "HH:mm:ss");
      const backgroundColor = checkinTime.isBefore(
        moment("08:06:00", "HH:mm:ss")
      )
        ? "green"
        : "red";

      return (
        <Box
          component="span"
          sx={{
            backgroundColor,
            borderRadius: "0.20rem",
            color: "#fff",
            maxWidth: "9ch",
            p: "0.25rem",
          }}
        >
          {cell.getValue<string>()}
        </Box>
      );
    },
  }),

  columnHelper.accessor("check_out", {
    header: "Check OUT",
    size: 10,
    Cell: ({ cell }) => {
      const checkoutTime = moment(cell.getValue<string>(), "HH:mm:ss");
      const backgroundColor = checkoutTime.isBefore(
        moment("17:30:00", "HH:mm:ss")
      )
        ? "red"
        : "green";

      return (
        <Box
          component="span"
          sx={{
            backgroundColor,
            borderRadius: "0.20rem",
            color: "#fff",
            maxWidth: "9ch",
            p: "0.25rem",
          }}
        >
          {cell.getValue<string>()}
        </Box>
      );
    },
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const TableWowDesarrollos = () => {
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

export default TableWowDesarrollos;
