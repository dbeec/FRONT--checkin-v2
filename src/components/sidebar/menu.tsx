import { ReactNode } from "react";
import * as IconTB from "react-icons/tb";
import * as IconMD from "react-icons/md";

interface Companies {
  gestion: Gestion[]
  companies: Company[];
  histories: History[];
  externals: Externals[];
}
interface Gestion {
  id: string;
  name: string;
  icon: ReactNode;
  url: string;
}
interface Company {
  id: string;
  name: string;
  icon: ReactNode;
  url: string;
}

interface History {
  id: string;
  name: string;
  icon: ReactNode;
  url: string;
}

interface Externals {
  id: string;
  name: string;
  icon: ReactNode;
  url: string;
}

const companiesData: Companies = {
  gestion: [
    {
      id: "1",
      name: "users",
      icon: <IconTB.TbUserFilled />,
      url: "/admin/users",
    },
  ],

  companies: [
    {
      id: "1",
      name: "wow desarrollos",
      icon: <IconTB.TbTableFilled />,
      url: "wowdesarrollos"
    },
    {
      id: "2",
      name: "fundacion et",
      icon: <IconTB.TbTableFilled />,
      url: "etfundacion",
    },
    {
      id: "3",
      name: "cae empresarial",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/cae",
    },
    {
      id: "4",
      name: "porcifenix",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/porcifenix",
    },
    {
      id: "5",
      name: "leypal",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/leypal",
    },
    {
      id: "6",
      name: "coophumana",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/cophumana",
    },
    {
      id: "7",
      name: "ossado",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/ossado",
    },
    {
      id: "8",
      name: "moto explorer",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/motoexplorer",
    },
  ],

  histories: [
    {
      id: "1",
      name: "history",
      icon: <IconMD.MdHistory />,
      url: "/admin/history",
    },
  ],

  externals: [
    {
      id: "1",
      name: "externals",
      icon: <IconTB.TbExternalLink />,
      url: "/admin/externals",
    },
  ],
};

export default companiesData;
