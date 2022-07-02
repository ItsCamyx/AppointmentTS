import AppointmentForm from "components/AppointmentForm/AppointmentForm";
import { Appointment } from "models";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditForm(prop: { setTitle: Function }) {
  //Mudança de título
  useEffect(() => {
    prop.setTitle("Editar agendamento");
  });
  //Armazenando o id da página
  const { id } = useParams();
  //declarado navegação
  const navigate = useNavigate();
  //transformando a string do localstorage em objeto
  const dataLocalStorage =
    JSON.parse(localStorage.getItem("@Quaddro:token") || "") || [];
  //achando o id correspondente
  const appointment = dataLocalStorage.find(
    (a: Appointment) => a.id === Number(id)
  );
  //criada uma função de edição passada por props
  const edit = (appointment: Appointment) => {
    //fazendo um index com os dados recuperados do localStorage
    const index = dataLocalStorage.findIndex(
      (a: Appointment) => a.id === appointment.id
    );
    //Acessando o agendamento na posição
    dataLocalStorage[index] = appointment;
    //Atualizando e setando no localStorage
    localStorage.setItem("@Quaddro:token", JSON.stringify(dataLocalStorage));
    navigate("/");
  };
  /*Reutilizado o componente AppointmentForm passando por props a funcionalidade
  e dados */
  return (
    <>
      <AppointmentForm save={edit} appointment={appointment} />
    </>
  );
}

export default EditForm;
