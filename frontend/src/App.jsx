
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/SignUp.jsx";
import { Signin } from "./pages/SignIn.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { SendMoney } from "./pages/SendMoney.jsx";
import { PaymentStatus } from "./pages/PaymentStatus.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/paymentstatus" element={<PaymentStatus />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;