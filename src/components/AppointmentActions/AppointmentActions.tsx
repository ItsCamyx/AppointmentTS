import { Appointment } from "models";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CustomMenu, CustomMenuDelete } from "./style";

/*Passado por prop Appointment */
function AppointmentActions(prop: {
  appointment: Appointment;
  setOpen: Function;
  setCurrentAppointment: Function;
}) {
  //
  function handleOpen() {
    /*Passado agendamento o título do agendamento para o useState
     */
    prop.setCurrentAppointment(prop.appointment);
    // e abrindo o modal
    return prop.setOpen(true);
  }
  /* Fazendo uma key para o meu de cada linha */
  const menuId = `menu-button-${prop.appointment.id}`;
  /* Pegando o tamnho da janela */
  const width = window.innerWidth;
  /*Feito um useState para armazenar o valor do estado (gancho para
    o elemento menu)
  menu quando a resolução estiver menor que 865*/
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  /* Váriável para transformar em true ou false*/
  const open = Boolean(anchorEl);
  /*Assim que houver o click vai ser setado como true*/
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  /* Função para fechar o menu */
  const handleClose = () => {
    setAnchorEl(null);
  };
  /* Pensando em mobile, abaixo feito as verificações de largura para ajustar
  a visualização da página para outras telas */

  return (
    <>
      {width > 865 && (
        <div>
          <Link to={"/edit/" + prop.appointment.id}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={handleOpen} color="error">
            <DeleteIcon />
          </IconButton>
          <Link to={"/details/" + prop.appointment.id}>
            <IconButton color="primary">
              <PageviewIcon />
            </IconButton>
          </Link>
        </div>
      )}
      {width <= 865 && (
        <div>
          <IconButton
            id={menuId}
            aria-controls={open ? menuId : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to={"/edit/" + prop.appointment.id}>
                <CustomMenu>
                  <EditIcon color="primary" />
                  <span>Editar</span>
                </CustomMenu>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <CustomMenuDelete onClick={handleOpen}>
                <DeleteIcon color="error" />
                <span>Deletar</span>
              </CustomMenuDelete>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={"/details/" + prop.appointment.id}>
                <CustomMenu>
                  <PageviewIcon color="primary" />
                  <span>Visualizar</span>
                </CustomMenu>
              </Link>
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}

export default AppointmentActions;
