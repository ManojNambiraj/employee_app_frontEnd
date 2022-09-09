import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListItem from "./Components/ListItems/ListItem";
import CreateUser from "./Components/CreateUser/CreateUser";
import EditUser from "./Components/EditUser/EditUser";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListItem />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/editUser/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
