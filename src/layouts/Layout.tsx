import { GlobalStyle } from "styles/global";
import { Outlet } from "react-router-dom";
import Header from "components/Header/Header";
import { PageContainer } from "./style";

/* Este arquivo de layout foi criado para ser chamado no AppointmentRoutes.
   Contém o arquivo de reset da página (criado no global),
   tem o componente header, PageContainer que cuida do espaçamento do header para o
   componente outlet que pertence a lib router e é necessário ser colocado para
   exibir o conteúdo que foi setado nas rotas
*/
function Layout(prop: { name: string }) {
  return (
    <>
      <GlobalStyle />
      <Header name={prop.name} />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
}

export default Layout;
