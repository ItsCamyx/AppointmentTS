import AppointmentView from "components/AppointmentView/AppointmentView";
import { useEffect } from "react";
//chamada do componente
function FormDetails(prop: { setTitle: Function }) {
  useEffect(() => {
    prop.setTitle("Detalhes do agendamento");
  });
  return (
    <>
      <AppointmentView />
    </>
  );
}

export default FormDetails;
