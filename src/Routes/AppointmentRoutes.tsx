import AppointmentHome from "pages/AppointmentsHome/AppointmentsHome";
import { Route, Routes } from "react-router-dom";
import CreateForm from "pages/CreateForm/CreateForm";
import Layout from "layouts/Layout";
import EditForm from "pages/EditForm/EditForm";
import { useState } from "react";
import FormDetails from "pages/FormDetails/FormDetails";
/* Neste arquivo estão sendo chamados a lib de rotas para criar os caminhos da aplicação,
juntamente com elas (as rotas) fiz um header que aparece 
nas páginas home, edit e create mudando seu título através do hook useState*/
function AppointmentsRoutes() {
  const [title, setTitle] = useState("");
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout name={title} />}>
          <Route index element={<AppointmentHome setTitle={setTitle} />} />
          <Route path="/add" element={<CreateForm setTitle={setTitle} />} />
          <Route path="/edit/:id" element={<EditForm setTitle={setTitle} />} />
          <Route
            path="/details/:id"
            element={<FormDetails setTitle={setTitle} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default AppointmentsRoutes;
