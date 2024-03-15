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
import userData from "./users";
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
  columnHelper.accessor("id", {
    header: "ID",
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

  columnHelper.accessor("hoursWorked", {
    header: "Date",
    size: 10,
    Cell: ({ row }) => {
      const checkinTime = moment(row.original.checkin, "HH:mm:ss");
      const checkoutTime = moment(row.original.checkout, "HH:mm:ss");

      const adjustedCheckoutTime = checkoutTime.subtract(1, "hour");

      const duration = moment.duration(adjustedCheckoutTime.diff(checkinTime));
      const hours = String(duration.hours()).padStart(2, "0");
      const minutes = String(duration.minutes()).padStart(2, "0");
      const seconds = String(duration.seconds()).padStart(2, "0");

      const formattedHours = `${hours}:${minutes}:${seconds}`;

      return (
        <Box
          component="span"
          sx={{
            backgroundColor: "gold",
            borderRadius: "0.20rem",
            color: "#222",
            maxWidth: "9ch",
            p: "0.25rem",
          }}
        >
          {formattedHours}
        </Box>
      );
    },
  }),

  columnHelper.accessor("pendingTime", {
    header: "Actions",
    size: 10,
    Cell: ({ row }) => {
      const checkinTime = moment(row.original.checkin, "HH:mm:ss");
      const checkoutTime = moment(row.original.checkout, "HH:mm:ss");

      const adjustedCheckoutTime = checkoutTime.subtract(1, "hour");
      const hourss = adjustedCheckoutTime.subtract(8, "h");
      const min = hourss.subtract(30, "m");
      const sec = min.subtract(0, "s");

      const duration = moment.duration(sec.diff(checkinTime));

      // Ajuste para formatear correctamente los tiempos negativos
      const formattedHours =
        duration.asMilliseconds() < 0
          ? `-${String(Math.abs(duration.hours())).padStart(2, "0")}:${String(
              Math.abs(duration.minutes())
            ).padStart(2, "0")}:${String(Math.abs(duration.seconds())).padStart(
              2,
              "0"
            )}`
          : `${String(duration.hours()).padStart(2, "0")}:${String(
              duration.minutes()
            ).padStart(2, "0")}:${String(duration.seconds()).padStart(2, "0")}`;

      let backgroundColor;
      if (duration.asMilliseconds() < 0) {
        backgroundColor = "coral";
      } else if (duration.asMilliseconds() === 0) {
        backgroundColor = "";
      } else {
        backgroundColor = "#60b1f3";
      }

      return (
        <Box
          component="span"
          sx={{
            backgroundColor,
            borderRadius: "0.20rem",
            color: "#222",
            maxWidth: "9ch",
            p: "0.25rem",
          }}
        >
          {formattedHours}
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
    // columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          sx={{ color: "#222", fontSize: "1.4rem" }}
          // onClick={getEmployees}
        >
          <IconLU.LuRefreshCcw />
        </Button>
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
          sx={{ color: "#222" }}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
          sx={{ color: "#222" }}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
          sx={{ color: "#222" }}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
          sx={{ color: "#222" }}
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