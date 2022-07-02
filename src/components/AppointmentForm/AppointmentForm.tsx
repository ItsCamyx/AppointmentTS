import { Button, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBrLocale from "date-fns/locale/pt-BR";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { themeTextField, themeButton, DateError } from "./style";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Appointment } from "models";

//Passado por props a criação/ edição e dados do agendamento
function AppointmentForm(prop: { save: Function; appointment: Appointment }) {
  const moment = require("moment");

  const appointment = prop.appointment;
  //usado para setar e armazenar o titulo pelo input
  const [title, setTitle] = useState(appointment.title || "");
  //usado para setar e armazenar a descrição pelo input
  const [description, setDescription] = useState(appointment.description || "");
  //usado para setar e armazenar a data de inicio
  const [startDate, setStartDate] = useState(
    appointment.startDate ? new Date(appointment.startDate) : new Date()
  );
  //para evitar conflitos com a verificação foi setado 1 hora mais da data atual
  const nextHour = moment(new Date()).add(1, "Hours").toDate();
  //usado para setar e armazenar a data de fim
  const [endDate, setEndDate] = useState(
    appointment.endDate ? new Date(appointment.endDate) : nextHour
  );
  //Verificação por YUP
  const schema = yup.object().shape({
    title: yup.string(),
    description: yup.string(),
    startDate: yup
      .date()
      .transform(() => {
        return startDate;
      })
      .test({
        name: "higher",
        exclusive: false,
        params: {},
        message: "Data de início deve ser menor que data de fim",
        test: function () {
          //Função de verificação de data que impede de salvar
          return startDate < endDate;
        },
      }),
    endDate: yup
      .date()
      .transform(() => {
        return endDate;
      })
      .test({
        name: "lower",
        exclusive: false,
        params: {},
        message: "Data de fim deve ser maior que data de início",
        test: function () {
          //Função de verificação de data que impede de salvar
          return endDate > startDate;
        },
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //função que recebe os dados e faz verficações
  const onSubmitFunction = (d: { [x: string]: any }) => {
    // se condção for verdadeira
    if (appointment.id) {
      //setar o id
      d.id = appointment.id;
      // setar a data
      d.createdDate = appointment.createdDate;
    }
    //função de criar/editar o usuário
    prop.save(d as Appointment);
    //notificação em tela pro usuário
    toast.success("Sucesso!");
  };
  const navigate = useNavigate();
  // função para o botão de cancelar
  function handleClick() {
    navigate("/");
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <Grid container>
            <TextField
              sx={themeTextField}
              placeholder="Digite seu título"
              {...register("title")}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid container>
            <TextField
              sx={themeTextField}
              placeholder="Digite a sua descrição"
              {...register("description")}
              multiline
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <LocalizationProvider
                adapterLocale={ptBrLocale}
                dateAdapter={AdapterDateFns}
              >
                <DateTimePicker
                  {...register("startDate")}
                  renderInput={(props) => (
                    <Grid>
                      <TextField
                        sx={{ paddingRight: "12px", width: "100%" }}
                        {...props}
                      />
                      <DateError>{errors.startDate?.message}</DateError>
                    </Grid>
                  )}
                  label="Data e hora de início"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue || new Date());
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider
                adapterLocale={ptBrLocale}
                dateAdapter={AdapterDateFns}
              >
                <DateTimePicker
                  {...register("endDate")}
                  renderInput={(props) => (
                    <Grid>
                      <TextField sx={{ width: "100%" }} {...props} />
                      <DateError>{errors.endDate?.message}</DateError>
                    </Grid>
                  )}
                  label="Data e hora de encerramento"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue || new Date());
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container gap={2}>
            <Button type="submit" sx={themeButton} variant="contained">
              Salvar
            </Button>
            <Button onClick={handleClick} sx={themeButton} variant="outlined">
              Cancelar
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
}

export default AppointmentForm;
