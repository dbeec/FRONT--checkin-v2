// import moment from "moment";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import "./header.css";
import { MdMenu } from "react-icons/md";
import moment from "moment";
import React from "react";
import { Logout, Settings } from "@mui/icons-material";

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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="header">
        <div className="header__info">
          <IconButton onClick={set_open} className="header__menubtn">
            <MdMenu color="#fff" />
          </IconButton>
          <div className="header__welcome">
            <li>
              Welcome back, <span className="header__name">Admin</span>
            </li>
            <span className="header__date">{date.format("ddd, LL")}</span>
          </div>
        </div>

        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>J</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose} style={{ fontSize: ".9rem" }}>
            <ListItemIcon>
              <Settings style={{ fontSize: "1.2rem" }} />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose} style={{ fontSize: ".9rem" }}>
            <ListItemIcon>
              <Logout style={{ fontSize: "1.2rem" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
