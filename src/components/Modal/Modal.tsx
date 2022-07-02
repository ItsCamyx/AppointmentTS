import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { styleBox, styleMain, StyleButton } from "./style";
import { Appointment } from "models";

//Conteúdo passado por props
function NewModal(prop: {
  open: boolean;
  setOpen: Function;
  appointment: Appointment;
  setData: Function;
  data: Array<Appointment>;
}) {
  /* função do botão cancelar
  para fechar a modal e passar o valor de setOpen para o appointmentHome */
  const handleClose = () => prop.setOpen(false);
  /* função do botão salvar, para remover o item, atualizar valor do localstorage,
  para fechar a modal e atualizar o valor de setData para o appointmentHome */
  const handleClick = () => {
    //filtro para achar o item diferente
    const newData = prop.data.filter((a) => a.id !== prop.appointment.id);
    /* um filtro que acaba excluindo pelo useState pois não se
    não consegue usar splice porque dá conflito por usar useState*/
    prop.setData(newData);
    //atualizando o localStorage
    localStorage.setItem("@Quaddro:token", JSON.stringify(newData));
    //fechando
    handleClose();
    //mensagem para o usuário
    toast.success("Excluido com sucesso");
  };

  return (
    <div>
      <Modal
        open={prop.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleMain}>
          <Box sx={styleBox} gap={1}>
            {`Deseja excluir o agendamento ${prop.appointment.title}?`}
          </Box>

          <Button onClick={handleClick} sx={StyleButton} variant="contained">
            Confirmar
          </Button>
          <Button sx={StyleButton} onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export default NewModal;
