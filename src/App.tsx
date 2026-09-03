import { Routes, Route } from "react-router";
import { AuthPage } from "@/pages/Auth";
import { Test } from "@/pages/Test";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
