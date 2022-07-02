import { Button, Grid } from "@mui/material";
import {
  WelcomeDiv,
  TitleDiv,
  SubTitleDiv,
  themeButton,
  ContainerDiv,
} from "./style";
import { Link, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import "moment/locale/pt-br";
import { Appointment } from "models";
/* Criada uma página para visualizar detalhes do agendamento */
function AppointmentView() {
  let { id } = useParams();
  //recuperando informações do localstorage e transformando
  const data = JSON.parse(localStorage.getItem("@Quaddro:token") || "") || [];
  /*Usado filter para achar o mesmo id do link da rota para mostar na página
  e fazendo a conversao para new appointment*/
  const appointment = new Appointment(
    data.find((appointment: Appointment) => appointment.id === Number(id))
  );

  return (
    <>
      <Grid container>
        <WelcomeDiv>Olá, aqui está seu agendamento</WelcomeDiv>
      </Grid>
      <Paper
        sx={{ padding: "25px", marginTop: "25px", borderRadius: "12px" }}
        elevation={3}
      >
        <ContainerDiv>
          <Grid container direction="column" height="100%" gap={2} item xs={6}>
            <Grid container>
              <TitleDiv>Título:</TitleDiv>
              <SubTitleDiv>{appointment?.title}</SubTitleDiv>
            </Grid>

            <Grid container>
              <TitleDiv>Descrição:</TitleDiv>
              <SubTitleDiv>{appointment?.description}</SubTitleDiv>
            </Grid>
          </Grid>
          <Grid container direction="column" height="100%" gap={2} item xs={6}>
            <Grid container>
              <TitleDiv>Hora e data de criação:</TitleDiv>
              <SubTitleDiv>{appointment?.createDateFormatted()}</SubTitleDiv>
            </Grid>
            <Grid container>
              <TitleDiv>Data e hora do agendamento:</TitleDiv>
              <SubTitleDiv>
                {appointment?.startDateFormatted()} até{" "}
                {appointment?.endDateFormatted()}
              </SubTitleDiv>
            </Grid>
          </Grid>
        </ContainerDiv>
      </Paper>
      <Grid container>
        <Link to={"/"}>
          <Button type="submit" sx={themeButton} variant="contained">
            Voltar
          </Button>
        </Link>
      </Grid>
    </>
  );
}
export default AppointmentView;
