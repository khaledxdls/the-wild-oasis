import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import NewUsers from "./pages/Users";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyle from "./styles/GlobalSyles";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryclient}>
        <ReactQueryDevtools></ReactQueryDevtools>
        <GlobalStyle></GlobalStyle>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout></AppLayout>
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="dashboard"></Navigate>}
              ></Route>
              <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
              <Route path="bookings" element={<Bookings></Bookings>}></Route>
              <Route
                path="bookings/:bookingId"
                element={<Booking></Booking>}
              ></Route>
              <Route
                path="/checkin/:bookingId"
                element={<Checkin></Checkin>}
              ></Route>
              <Route path="cabins" element={<Cabins></Cabins>}></Route>
              <Route path="users" element={<NewUsers></NewUsers>}></Route>
              <Route path="settings" element={<Settings></Settings>}></Route>
              <Route path="account" element={<Account></Account>}></Route>
            </Route>

            <Route path="login" element={<Login></Login>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              padding: "16px 24px",
              maxWidth: "500px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        ></Toaster>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
