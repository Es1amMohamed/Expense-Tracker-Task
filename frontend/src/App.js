import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseDetail from "./components/ExpenseDetail";
import ExpenseList from "./components/ExpenseList";
import ExpenseCreate from "./components/ExpenseCreate";
import CategoryCreate from "./components/CategoryCreate";
import MonthlyReport from "./components/MonthlyReports";


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
        <Route path="/" element={<ExpenseList />} />
        <Route path="/expense/:slug" element={<ExpenseDetail />} />
        <Route path="/add-expense" element={<ExpenseCreate />} />
        <Route path="/add-category" element={<CategoryCreate />} />
        <Route path="/monthly-report" element={<MonthlyReport />} />
      </Routes>
    </Router>
  );
}

export default App;
