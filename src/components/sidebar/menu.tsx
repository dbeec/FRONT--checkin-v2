import { ReactNode } from "react";
import * as IconTB from "react-icons/tb";
import * as IconMD from "react-icons/md";

interface Companies {
  companies: Company[];
  histories: History[];
  externals: Externals[];
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
  companies: [
    {
      id: "1",
      name: "WOW DESARROLLOS",
      icon: <IconTB.TbTableFilled />,
      url: "wowdesarrollos"
    },
    {
      id: "2",
      name: "FUNDACION ET",
      icon: <IconTB.TbTableFilled />,
      url: "etfundacion",
    },
    {
      id: "3",
      name: "CAE EMPRESARIAL",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/cae",
    },
    {
      id: "4",
      name: "PORCIFENIX",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/porcifenix",
    },
    {
      id: "5",
      name: "LEYPAL",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/leypal",
    },
    {
      id: "6",
      name: "COPHUMANA",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/cophumana",
    },
    {
      id: "7",
      name: "OSSADO",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/ossado",
    },
    {
      id: "8",
      name: "MOTO EXPLORER",
      icon: <IconTB.TbTableFilled />,
      url: "/admin/motoexplorer",
    },
  ],
  histories: [
    {
      id: "1",
      name: "HISTORIES",
      icon: <IconMD.MdHistory />,
      url: "/admin/history",
    },
  ],
  externals: [
    {
      id: "1",
      name: "EXTERNALS",
      icon: <IconTB.TbExternalLink />,
      url: "/admin/externals",
    },
  ],
};

export default companiesData;
