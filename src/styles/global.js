import { createGlobalStyle } from "styled-components";
import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";
import { ptBR as ptBRGrid } from "@mui/x-data-grid";
import { ptBR as pickersPtBR } from "@mui/x-date-pickers";
import { ptBR as corePtBR } from "@mui/material/locale";

/* Neste arquivo estão sendo chamados a lib do styled-components para resetar o global,
lib da material UI para fazer temas customizáveis e além do tema optei 
por customizar a linguagem da aplicação */

// Custom Quaddro Theme:
export const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#002aff",
      },
      error: {
        main: "#ff1b1c",
      },
    },
  },
  ptBR,
  ptBRGrid,
  pickersPtBR,
  corePtBR
);

export const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        outline:0;
        font-family: 'Roboto';
        
    
        :root{
            --white:#f5f5f5;
        }

        button{
            cursor:pointer;
        }
        a{
            text-decoration:none;
        }
    }`;
