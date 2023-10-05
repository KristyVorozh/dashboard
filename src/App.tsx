import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import List from "./pages/List";

function App() {
  return (
            <BrowserRouter>
                <Routes>
                    <Route index element={<Dashboard />} path='/' />
                    <Route element={<List />} path='/list' />
                </Routes>
            </BrowserRouter>
  )
}

export default App
