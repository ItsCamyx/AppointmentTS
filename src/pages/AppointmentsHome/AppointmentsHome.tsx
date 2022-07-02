import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Data } from "../../Data";
import AppointmentActions from "../../components/AppointmentActions/AppointmentActions";
import InputAdornment from "@mui/material/InputAdornment";
import { ContainerInput, themeSearch, themeButton } from "./style";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { GridFilterModel } from "@mui/x-data-grid/models";
import { Link } from "react-router-dom";
import NewModal from "components/Modal/Modal";
import { Appointment } from "models";

/* Este arquivo possui a tabela de agendamentos 
  Utilizei a lib MUI para tabela,
  Usei lib styled para criar estilos customizáveis,
  Usei hooks de useEffect para mudar nome do Header de acordo com a página

*/

function AppointmentHome(prop: { setTitle: Function }) {
  //Chamada da lib moment pra ser utilizada na página
  const moment = require("moment");
  //Usado useEffects para trocar nome no título
  useEffect(() => {
    prop.setTitle("Dashboard");
  });
  /* Utilizado o useState para abrir e fechado modal num nível maior
para utilizar em dois componentes*/
  const [open, setOpen] = useState(false);
  //CONSTRUÇÃO E PERSONALIZAÇÃO DO GRID
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Título",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "createdDate",
      headerName: "Data de criação",
      flex: 1,
      renderCell: (params) => {
        return (
          <span>
            {moment(params.row.createdDate).format("DD/MM/yyyy HH:mm")}
          </span>
        );
      },
    },
    {
      field: "startDate",
      headerName: "Data de Início",
      flex: 1,
      renderCell: (params) => {
        return (
          <span>{moment(params.row.startDate).format("DD/MM/yyyy HH:mm")}</span>
        );
      },
    },
    {
      field: "endDate",
      headerName: "Data de Encerramento",
      flex: 1,
      renderCell: (params) => {
        return (
          <span>{moment(params.row.endDate).format("DD/MM/yyyy HH:mm")}</span>
        );
      },
    },
    /*Coluna de ações personalizada com componente e lib,
    passado por prop o setOpen e setando o Agendamento corrente para 
    a manipulação das ações e passado os dados do agendamento 
    do row por props*/
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => {
        return (
          <AppointmentActions
            setOpen={setOpen}
            setCurrentAppointment={setCurrentAppointment}
            appointment={params.row}
          />
        );
      },
    },
  ];
  //Armazenado e setado a quantidade agendamentos por página
  const [pageSize, setPageSize] = useState(5);

  //VERIFICAÇÃO
  //setado uma váriável pra verificar se há algum localStorage
  let dataLocalStorage = localStorage.getItem("@Quaddro:token") || "";
  //Se eu nunca tiver logado e não obtiver um localstorage
  if (!dataLocalStorage || dataLocalStorage.length === 0) {
    //será setado um local storage com a base de dados criada e...
    localStorage.setItem("@Quaddro:token", JSON.stringify(Data));
    //... atribuido a variável que foi declarada acima
    dataLocalStorage = JSON.stringify(Data);
  }
  /*Utilizado data e setData após a verificação pois ela é dependente
   da mesma para passar como props pro modal para exclusão de agendamentos */
  const [data, setData] = useState<Array<Appointment>>(
    /*Foi feito uma conversão de string para Objeto dentro do 
    useState para conseguir fazer manipulação de dados
    no modal*/
    JSON.parse(dataLocalStorage)
  );
  const [filter, setFilter] = useState("");
  /* Criada a função para acompanhar as mudança do campo de input
  e setado no filtro de useState */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  /*Criada a função para acompanhar as mudança do campo do input do 
  grid e setado no filtro de useState */
  const handleFilterModelChange = (filter: GridFilterModel) => {
    setFilter(filter.items[0].value);
  };
  /* As duas funções acima compartilham do mesmo state fazendo os dois 
  ficarem sincronizado 
  Obs¹:No momento essa funcionalidade só funciona para título pois há uma
  limitação imposta pelo Grid a ser solucionada 
  Obs²: Dentro do grid temos a funcionalidade de filtrar 
  por todas as colunas*/

  const [currentAppointment, setCurrentAppointment] = useState<Appointment>(
    new Appointment()
  );

  return (
    <>
      <NewModal
        open={open}
        setOpen={setOpen}
        appointment={currentAppointment}
        setData={setData}
        data={data}
      />
      <ContainerInput>
        <TextField
          value={filter}
          sx={themeSearch}
          placeholder="Digite aqui a sua pesquisa"
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span>
                  <SearchIcon />
                </span>
              </InputAdornment>
            ),
          }}
        />
      </ContainerInput>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Link to="/add">
          <Button sx={themeButton} variant="contained" color="primary">
            <AddIcon />
          </Button>
        </Link>
      </Grid>
      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          disableSelectionOnClick
          filterModel={{
            items: [
              {
                columnField: "title",
                operatorValue: "contains",
                value: filter,
              },
            ],
          }}
          onFilterModelChange={handleFilterModelChange}
          rows={data}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          rowsPerPageOptions={[3, 5, 25, 30, 50, 100]}
        />
      </div>
    </>
  );
}

export default AppointmentHome;
