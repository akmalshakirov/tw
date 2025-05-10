import { motion } from "framer-motion";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <App />
        </motion.div>
        <ToastContainer position='top-right' autoClose={3000} limit={5} />
    </>
);
