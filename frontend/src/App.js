import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseDetail from "./components/ExpenseDetail";
import ExpenseList from "./components/ExpenseList";
import ExpenseCreate from "./components/ExpenseCreate";
import CategoryCreate from "./components/CategoryCreate";
import MonthlyReport from "./components/MonthlyReports";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register"  element={<Register />} />
       <Route path="/" element={<PrivateRoute> <ExpenseList /> </PrivateRoute>}/>   
        <Route path="/expense/:slug" element={<PrivateRoute> <ExpenseDetail /> </PrivateRoute>} />
        <Route path="/add-expense" element={<PrivateRoute> <ExpenseCreate /> </PrivateRoute>} />
        <Route path="/add-category" element={<PrivateRoute> <CategoryCreate /> </PrivateRoute>} />
        <Route path="/monthly-report" element={<PrivateRoute><MonthlyReport /> </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
