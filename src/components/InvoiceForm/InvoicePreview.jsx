import { formatDate } from "../../Utils/Helper";
import logo from "../../assets/logo.png";

function InvoicePreview({ invoice }) {
  const currentCode = invoice.currency;
  const subtotal = invoice.items.reduce((sum, it) => sum + it.quantity * it.rate, 0);

  return (
    <section id="print-section" className="invoice-preview-section">
      <h1 className="invoice-new-header">PDF preview</h1>
      <div className="invoice-preview-card">
        <div style={{ padding: "1rem" }}>
          <div className="invoice-preview-header">
            <div>
              <h2 className="invoice-preview-heading">{invoice.type}</h2>
              <p style={{ fontSize: "1em", marginBottom: "8px", color: "#222", letterSpacing: "1px", margin: 0 }}>
                #{invoice.number} • {formatDate(invoice.date)}
              </p>
            </div>
            <img src={logo} alt="Logo" width={120} />
          </div>
          <table className="invoice-preview-table">
            <tbody>
              <tr>
                <th style={{ textAlign: "left", width: "50%" }}>From:</th>
                <th style={{ textAlign: "left" }}>Bill To:</th>
              </tr>
              <tr>
                <td style={{ borderBottom: "none" }}>{invoice.billFrom}</td>
                <td style={{ borderBottom: "none" }}>{invoice.billTo}</td>
              </tr>
            </tbody>
          </table>
          <table className="invoice-preview-table">
            <thead>
              <tr style={{ background: "rgb(242, 242, 242)" }}>
                <th
                  style={{
                    borderRadius: "4px 0px 0px 4px",
                    padding: "8px",
                    textAlign: "left",
                    width: "60%",
                  }}
                >
                  Description
                </th>
                <th style={{ textAlign: "center" }}>Qty</th>
                <th style={{ textAlign: "center" }}>Rate</th>
                <th
                  style={{
                    borderRadius: "4px 0px 0px 4px",
                    padding: "8px",
                    textAlign: "right",
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((it, idx) => (
                <tr key={idx}>
                  <td>{it.description}</td>
                  <td style={{ textAlign: "center" }}>{it.quantity}</td>
                  <td style={{ textAlign: "center" }}>
                    {currentCode}
                    {it.rate}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                    }}
                  >
                    {currentCode}
                    {(it.quantity * it.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table style={{ marginBottom: "36px", width: "100%", padding: "12px 0px" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    borderBottom: "none",
                    paddingRight: "24px",
                    textAlign: "left",
                    verticalAlign: "bottom",
                    width: "60%",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <p className="font-header">Memo:</p>
                  {invoice.memo}
                  <br />
                  <br />
                  <p className="font-header">Wire / Bank Transfer: </p>
                  {invoice.bank}
                </td>
                <td style={{ borderBottom: "none", padding: 0, textAlign: "left" }}>
                  <table style={{ width: "100%" }} className="invoice-preview-table">
                    <tbody>
                      <tr>
                        <td>Subtotal:</td>
                        <td style={{ textAlign: "right" }}>
                          {currentCode}
                          {subtotal.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td>Tax:</td>
                        <td style={{ textAlign: "right" }}>
                          {currentCode}
                          {0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total:</td>
                        <td style={{ textAlign: "right" }}>
                          {currentCode}
                          {subtotal.toFixed(2)}
                        </td>
                      </tr>
                      <tr className="invoice-preview-table-total">
                        <td style={{ textAlign: "left", borderBottom: "none" }}>Balance Due:</td>
                        <td style={{ textAlign: "right", borderBottom: "none" }}>
                          <div className="invoice-preview-due-balance">
                            {currentCode}
                            {subtotal.toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
export default InvoicePreview;
