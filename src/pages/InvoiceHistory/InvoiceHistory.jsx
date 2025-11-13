// import { useNavigate } from "react-router-dom";
import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import "./InvoiceHistory.css";
import { toast } from "react-toastify";
const InvoiceHistory = ({ invoices, refreshData, setLoading, userId }) => {
  // const navigate = useNavigate();

  const markInvoicePaid = async (invoiceId) => {
    try {
      setLoading(true);
      const invoiceRef = doc(db, "users", userId, "invoices", invoiceId);
      await updateDoc(invoiceRef, { status: "Paid" });
      toast.success("Invoice marked paid!");
      refreshData();
    } catch (error) {
      toast.error("Error saving invoice: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="invoice2-flex-main">
        <section className="inv-history-section">
          <div className="inv-history-header">
            <h1 className="inv-history-title">Invoice History</h1>
            <div className="inv-history-header-toolbar">
              <button className="button" onClick={() => refreshData()}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                  <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                </svg>
              </button>
            </div>
          </div>
          <InvoiceTable invoices={invoices} markInvoicePaid={markInvoicePaid}></InvoiceTable>
        </section>
      </main>
    </div>
  );
};

export default InvoiceHistory;
