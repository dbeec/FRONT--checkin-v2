// import moment from "moment";
import { IconButton } from "@mui/material";
import "./header.css";
import { MdMenu } from "react-icons/md";
import moment from "moment";

export default function Header({ set_open }: { set_open: () => void }) {
  const date = moment();

  // funcion para cerrar sesion
  // const logoutSession = () => {
  //   localStorage.removeItem("access token");
  //   alert("YEPP, You have successfully logged out! 😶‍🌫️");
  //   setTimeout(() => {
  //     // route.push("/");
  //   }, 2000);
  // };
  return (
    <>
      <div className="header">
        <div className="header__info">
          <IconButton onClick={set_open} className="header__menubtn">
            <MdMenu color="#fff"/>
          </IconButton>
          <div className="header__welcome">
            <li>
              Welcome back, <span className="header__name">Johan Díaz</span>
            </li>
            <span className="header__date">{date.format("ddd, LL")}</span>
          </div>
        </div>

        {/* <div className="header__profile">
          <Image src={profileImage} alt="profile" width={50} height={50} unoptimized={true}/>
        </div> */}
      </div>
    </>
  );
}
