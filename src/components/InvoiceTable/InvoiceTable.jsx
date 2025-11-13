import React from "react";
import { formatDate, getTotalAmount } from "../../Utils/Helper";
import "./InvoiceTable.css";
import ActionMenu from "./ActionMenu";
import { useNavigate } from "react-router-dom";

const InvoiceTable = ({ invoices = [], markInvoicePaid }) => {
  const navigate = useNavigate();
  const renderBadge = (type) => {
    return type.toLowerCase() === "paid" ? (
      <span className="badge badge--paid">
        <span className="badge__dot" />
        Paid
      </span>
    ) : (
      <span className="badge badge--due">
        <span className="badge__dot" />
        Due
      </span>
    );
  };

  return (
    <div className="table-wrapper">
      <table className="inv-history-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Date</th>
            <th>Client Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => {
            return (
              <tr key={inv.id}>
                <td>{inv.number}</td>
                <td>{formatDate(inv.date)}</td>
                <td>{inv.billTo.split("\n")[0]}</td>
                <td className="text-center-align">
                  {inv.currency}
                  {getTotalAmount(inv.items)}
                </td>
                <td>{renderBadge(inv.status)}</td>
                <td>
                  <ActionMenu
                    id={inv.id}
                    markInvoicePaid={markInvoicePaid}
                    onDuplicate={() => {
                      navigate("/details", { state: { invoice: inv, action: "duplicate" } });
                    }}
                    onView={() => {
                      navigate("/details", { state: { invoice: inv, action: "view" } });
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
