import { Routes, Route } from "react-router";
import Page from "./pages/Page";
import Login from "./pages/Login"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/painter" element={<Page />} />
      </Routes>
    </div>
  );
}

export default App;
