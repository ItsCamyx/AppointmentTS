import AppointmentForm from "components/AppointmentForm/AppointmentForm";
import { Appointment } from "models";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateForm(prop: { setTitle: Function }) {
  useEffect(() => {
    prop.setTitle("Criar agendamento");
  });
  const navigate = useNavigate();
  //função de criação
  const create = (appointment: Appointment) => {
    //Recuperando dados do localStorage e tranformando em objeto
    const dataLocalStorage =
      JSON.parse(localStorage.getItem("@Quaddro:token") || "") || [];
    //Criado um último id
    let lastId = 0;
    //se o objeto existir
    if (dataLocalStorage.length > 0) {
      /*Como todo array começa em 0, para conseguir resgatar o id
      nivelei com essa conta*/
      lastId = dataLocalStorage[dataLocalStorage.length - 1].id || 1;
    }
    //setando o id do novo agendamento
    appointment.id = lastId + 1;
    //setando a data de criação
    appointment.createdDate = new Date();
    //Insere o novo agendamento
    dataLocalStorage.push(appointment);
    //Atualiza as informações no localStorage
    localStorage.setItem("@Quaddro:token", JSON.stringify(dataLocalStorage));
    //Volta pra home
    navigate("/");
  };
  //criando variável e chamando construtor
  const appointment = new Appointment();

  return (
    <>
      <AppointmentForm save={create} appointment={appointment} />
    </>
  );
}

export default CreateForm;
