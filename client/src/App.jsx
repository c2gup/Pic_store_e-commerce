import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";

import GsapPage from "./components/GsapPage";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <BrowserRouter>
          <Navbar />

          <GsapPage />
        </BrowserRouter>
      </Provider>
    </>
  );
}
