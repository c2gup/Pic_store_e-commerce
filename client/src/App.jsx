import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";

import GsapPage from "./components/GsapPage";

export default function App() {
  return (
  <>
 <BrowserRouter>
 <Navbar/>

<GsapPage/>
 
 </BrowserRouter>
   </>
  )
}
