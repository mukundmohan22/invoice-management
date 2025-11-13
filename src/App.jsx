/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

import { collection, query, getDocs, orderBy, onSnapshot } from "firebase/firestore";

import Dashboard from "./pages/Dashboard/Dashboard";
import InvoiceHistory from "./pages/InvoiceHistory/InvoiceHistory";
import InvoiceDetails from "./pages/InvoiceDetails";
import CreateInvoice from "./pages/CreateInvoice/CreateInvoice";
import Login from "./components/Login/Login"; // Your login component
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import Loader from "./components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      fetchInvoices(currentUser.uid)
        .then(setInvoices)
        .then(() => setLoading(false));
    });
    return () => unsubscribe();
  }, []);

  const refreshData = () => {
    setLoading(true);
    fetchInvoices(user.uid)
      .then(setInvoices)
      .then(() => {
        setLoading(false);
        toast.info("Data refreshed successfully.");
      });
  };

  const logout = () => {
    signOut(auth).then(() => setUser(null));
  };

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((error) => toast.error(error.message));
  };

  const fetchInvoices = async (userId) => {
    const q = query(collection(db, "users", userId, "invoices"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  if (!user) return <Login login={login} />;
  return (
    <div style={{ display: "flex" }}>
      <Router>
        {loading && <Loader />}
        <Sidebar user={user} logout={logout} open={open} setOpen={setOpen} />
        <div className={open ? "app-wrapper" : "app-closed-wrapper"}>
          <Routes>
            <Route path="/" element={<Dashboard user={user} invoices={invoices} refreshData={refreshData} />} />
            <Route
              path="/invoices"
              element={
                <InvoiceHistory
                  userId={user.uid}
                  invoices={invoices}
                  refreshData={refreshData}
                  setLoading={setLoading}
                />
              }
            />
            <Route path="/details" element={<InvoiceDetails userId={user.uid} setLoading={setLoading} />} />
            <Route
              path="/create"
              element={<CreateInvoice userId={user.uid} setLoading={setLoading} fetchInvoices={fetchInvoices} />}
            />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
