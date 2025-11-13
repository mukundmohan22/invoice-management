import { useState } from "react";
import "./CreateInvoice/CreateInvoice.css";
import { useLocation, useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";
import InvoicePreview from "../components/InvoiceForm/InvoicePreview";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { initState } from "../Utils/Helper";
import { toast } from "react-toastify";

const InvoiceDetails = ({ userId, setLoading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const receivedObject = location.state;
  const edit = receivedObject.action === "duplicate" ? true : false;
  if (edit) {
    delete receivedObject.invoice.id;
  }
  const [invoice, setInvoice] = useState(receivedObject.invoice);
  const [isEditable] = useState(edit);

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
        <InvoiceForm
          invoice={invoice}
          setInvoice={setInvoice}
          editable={isEditable}
          saveInvoice={saveInvoiceToFirestore}
        />

        {isEditable && <InvoicePreview invoice={invoice} />}
      </main>
    </div>
  );
};

export default InvoiceDetails;
