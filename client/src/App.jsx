import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";

import GsapPage from "./components/GsapPage";
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
  <>
   <Toaster position="top-center" reverseOrder={false} />
 <BrowserRouter>
 <Navbar/>

<GsapPage/>
 
 </BrowserRouter>
   </>
  )
}
