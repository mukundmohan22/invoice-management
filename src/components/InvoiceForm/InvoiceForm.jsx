import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import "./InvoiceForm.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../Utils/Helper";
import { toast } from "react-toastify";

function InvoiceForm({ invoice, setInvoice, saveInvoice, editable = true }) {
  const navigation = useNavigate();
  const setField = (field, val) => setInvoice({ ...invoice, [field]: val });

  const updateItem = (idx, field, val) => {
    const items = invoice.items.map((it, i) =>
      i === idx ? { ...it, [field]: field === "description" ? val : +val } : it
    );
    setField("items", items);
  };

  const printSection = () => {
    const fileName = `Invoice-${invoice.number}-${formatDate(invoice.date)}.pdf`;
    const originalTitle = document.title;
    document.title = fileName;
    window.print();
    document.title = originalTitle;
  };

  const addItem = () => setField("items", [...invoice.items, { description: "", quantity: 1, rate: 0 }]);
  const rmItem = (idx) =>
    setField(
      "items",
      invoice.items.filter((_, i) => i !== idx)
    );

  const handleSave = () => {
    const missingValue =
      !invoice.currency ||
      !invoice.date ||
      !invoice.number ||
      !invoice.billTo ||
      !invoice.billFrom ||
      !invoice.bank ||
      invoice.items.length === 0;

    if (missingValue) {
      toast.warn("Please complete the form before saving");
    } else {
      saveInvoice(invoice);
    }
  };

  return (
    <section className="invoice-new-section">
      <div className="invoice-new-header">
        <div className="invoice-new-header-toolbar">
          <button className="button" onClick={() => navigation(-1)}>
            <IoMdArrowRoundBack color="black" size={24} />
          </button>
          <h1 className="invoice-main-title">Invoice details</h1>
        </div>
        {editable && (
          <div className="invoice-new-header-toolbar">
            <button className="invoice-btn" onClick={handleSave}>
              <FaSave color="white" size={20} />
              Save
            </button>
            <button className="invoice-btn" onClick={() => printSection()} title="Download">
              <FaDownload color="white" size={20} />
              Download
            </button>
          </div>
        )}
      </div>
      <div className="invoice-form-row">
        <select disabled={!editable} value={invoice.currency} onChange={(e) => setField("currency", e.target.value)}>
          {/* <option label="USD ($)">$</option> */}
          <option label="AUD ($)">$</option>
          <option label="INR (₹)">₹</option>
        </select>
        <select disabled={!editable} value={invoice.type} onChange={(e) => setField("type", e.target.value)}>
          <option>Invoice</option>
          <option>Estimate</option>
        </select>
        <input
          readOnly={!editable}
          type="date"
          placeholder="Due on"
          value={invoice.date}
          onChange={(e) => setField("date", e.target.value)}
        />
        <input
          type="text"
          readOnly={!editable}
          value={invoice.number}
          onChange={(e) => setField("number", e.target.value)}
          placeholder="Invoice #"
        />
      </div>
      <div className="invoice-form-row">
        <textarea
          readOnly={!editable}
          className="invoice-input-wide"
          placeholder="Bill to: Enter name and address"
          value={invoice.billTo}
          onChange={(e) => setField("billTo", e.target.value)}
        />
        <textarea
          readOnly={!editable}
          className="invoice-input-wide"
          placeholder="From: Enter your name and address"
          value={invoice.billFrom}
          onChange={(e) => setField("billFrom", e.target.value)}
        />
      </div>
      <div className="invoice-table-block">
        <div className="invoice-table-header">
          <span className="header-desc">Description</span>
          <span className="header-qty">Qty</span>
          <span className="header-rate">Rate</span>
          <span className="header-total">Total</span>
          <span className="header-action"></span>
        </div>
        {invoice?.items.map((it, idx) => (
          <div className="invoice-table-row" key={idx}>
            <textarea
              rows={1}
              type="text"
              readOnly={!editable}
              value={it.description}
              className="invoice-item-desc"
              placeholder="Description of service or product"
              onChange={(e) => updateItem(idx, "description", e.target.value)}
            />
            <input
              type="number"
              min="1"
              readOnly={!editable}
              value={it.quantity}
              className="invoice-item-qty"
              onChange={(e) => updateItem(idx, "quantity", e.target.value)}
            />
            <div className="input-group">
              <span className="input-group-addon">{invoice.currency}</span>
              <input
                type="number"
                min="1"
                value={it.rate}
                readOnly={!editable}
                className="invoice-item-rate input-no-left-border"
                onChange={(e) => updateItem(idx, "rate", e.target.value)}
              />
            </div>
            <div className="input-group">
              <span className="input-group-addon">{invoice.currency}</span>
              <input
                type="number"
                min="0"
                readOnly
                value={it.quantity * it.rate}
                className="invoice-item-rate input-no-left-border"
              />
            </div>
            <button disabled={!editable} className="invoice-remove-btn" onClick={() => rmItem(idx)} title="Remove">
              <MdDelete color="red" size={24} />
            </button>
          </div>
        ))}
        <div className="invoice-add-item-row">
          <button type="button" disabled={!editable} className="invoice-add-btn" onClick={addItem}>
            + Add Item
          </button>
        </div>
      </div>
      <div className="invoice-pay">
        <h2 className="invoice-pay-title">Invoice payment methods</h2>

        <div className="invoice-pay-comments">
          <span>Wire / Bank Transfer</span>
        </div>
        <textarea
          readOnly={!editable}
          className="invoice-input-wide"
          placeholder="Bank information here"
          value={invoice.bank}
          onChange={(e) => setField("bank", e.target.value)}
        />

        <div className="invoice-pay-comments">
          <span>Other notes and instructions</span>
          <span>*Optional</span>
        </div>
        <textarea
          readOnly={!editable}
          className="invoice-input-wide"
          placeholder="Enter any additional notes here"
          value={invoice.memo}
          onChange={(e) => setField("memo", e.target.value)}
        />
      </div>
    </section>
  );
}

export default InvoiceForm;
