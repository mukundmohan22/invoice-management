import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm";
import { useState } from "react";
import InvoicePreview from "../../components/InvoiceForm/InvoicePreview";
import "./CreateInvoice.css";
import { initState } from "../../Utils/Helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateInvoice = ({ userId, setLoading }) => {
  const [invoice, setInvoice] = useState(initState);
  const navigate = useNavigate();

  const saveInvoiceToFirestore = async (invoiceData) => {
    try {
      setLoading(true);
      await addDoc(collection(db, "users", userId, "invoices"), {
        ...invoiceData,
        createdAt: serverTimestamp(),
      });
      toast.success("Invoice saved!");
      setInvoice(initState);
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast.error("Error saving invoice: " + error.message);
    }
  };

  return (
    <div>
      <main className="invoice2-flex-main">
        <InvoiceForm invoice={invoice} setInvoice={setInvoice} saveInvoice={saveInvoiceToFirestore} />
        <InvoicePreview invoice={invoice} />
      </main>
    </div>
  );
};

export default CreateInvoice;
