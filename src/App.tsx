import { ThemeProvider } from "@mui/material/styles";
import { theme } from "styles/global";
import AppointmentsRoutes from "Routes/AppointmentRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <AppointmentsRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
