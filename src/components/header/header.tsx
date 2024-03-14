// import moment from "moment";
import "./header.css";

export default function Header({set_open}: {set_open: () => void}) {
  // const date = moment();

    //funcion para cerrar sesion
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
        <div className="header__welcome">
          <div onClick={set_open}>Open</div>
          <li>
            Welcome back, <span className="header__name">Johan Díaz</span>
          </li>
          {/* <span>{date.format("ddd, LL")}</span> */}
        </div>

        {/* <div className="header__profile">
          <Image src={profileImage} alt="profile" width={50} height={50} unoptimized={true}/>
        </div> */}
      </div>
    </>
  );
}
