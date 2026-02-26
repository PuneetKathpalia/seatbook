// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import './index.css'
// import App from './App.tsx'
// import { SeatProvider } from './context/SeatContext.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <SeatProvider>
//         <App />
//       </SeatProvider>
//     </BrowserRouter>
//   </StrictMode>,
// )

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SeatProvider } from "./context/SeatContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SeatProvider>
      <App />
    </SeatProvider>
  </BrowserRouter>
);