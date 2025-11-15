import InvoiceGraph from "../../components/InvoiceGraph";
import { getLatestMonthData, getTotalAmountHistory, getDueAmount } from "../../Utils/Helper";

import "./Dashboard.css";
const Dashboard = ({ user, invoices, refreshData }) => {
  // Calculate summary for graph - e.g. total invoices, total amount
  const totalInvoices = invoices.length;
  const currency = invoices[0]?.currency ?? "$";
  const totalAmount = getTotalAmountHistory(invoices);
  const lastMonth = getLatestMonthData(invoices);
  const dueAmount = getDueAmount(invoices);

  return (
    <div className="d-wrapper">
      <div className="d-container">
        <div className="d-user-info">
          <span className="d-user-info--title">Welcome, {user.displayName}</span>
        </div>
        <div className="ds-container">
          <div className="ds-container-header">
            <div className="ds-title">Invoice Summary</div>
            <button className="button" onClick={() => refreshData()}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
              </svg>
            </button>
          </div>

          <div className="ds-content">
            <div className="ds-card card-yellow">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFF">
                <path d="M120-80.67v-798.66l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v798.66l-60-60-60 60-60-60-60 60-60-60-60 60-60-59.9-60 59.9-60-59.9-60 59.9-60-59.9-60 59.9Zm118-210h486.67v-66.66H238v66.66Zm0-156h486.67v-66.66H238v66.66Zm0-156.66h486.67V-670H238v66.67Zm-51.33 416.66h586.66v-586.66H186.67v586.66Zm0-586.66v586.66-586.66Z" />
              </svg>
              <p>Total Invoices</p>
              <p>{totalInvoices}</p>
            </div>
            <div className="ds-card card-purple">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFF">
                <path d="M208-254v-319.33h66.67V-254H208Zm241.33 0v-319.33H516V-254h-66.67ZM80-120.67v-66.66h800v66.66H80ZM685.33-254v-319.33H752V-254h-66.67ZM80-640v-62l400-218.67L880-702v62H80Zm148.67-66.67h502.66-502.66Zm0 0h502.66L480-844.67l-251.33 138Z" />
              </svg>
              <p>Total Amount</p>
              <p>
                {currency}
                {totalAmount.toFixed(2)}
              </p>
            </div>

            <div className="ds-card card-blue">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFF">
                <path d="M447.67-120v-84.67Q392-215.33 354.83-249q-37.16-33.67-53.83-88.33l62-25.34q16.33 48 47.5 72t77.17 24q45.66 0 75.83-22.16Q593.67-311 593.67-352T568-415.83Q542.33-438.67 465-464q-76.67-24.33-111-62.17Q319.67-564 319.67-620q0-58.33 37.66-95 37.67-36.67 90.34-41.67V-840h66.66v83.33q46.67 6 79.17 31.84Q626-699 642.33-660l-62 26.67q-13.33-32-36.33-47t-61-15q-45.33 0-71 20.5t-25.67 54.16q0 36.34 30 58.34T525-516.67q68.33 20.67 101.83 61.5 33.5 40.84 33.5 99.84 0 65.66-38.66 103.66-38.67 38-107.34 48.34V-120h-66.66Z" />
              </svg>
              <p>Last Payment</p>
              <p>
                {currency}
                {lastMonth.toFixed(2)}
              </p>
            </div>

            <div className="ds-card card-red">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFF">
                <path d="M546.67-426.67q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM240-293.33q-27.5 0-47.08-19.59-19.59-19.58-19.59-47.08v-373.33q0-27.5 19.59-47.09Q212.5-800 240-800h613.33q27.5 0 47.09 19.58Q920-760.83 920-733.33V-360q0 27.5-19.58 47.08-19.59 19.59-47.09 19.59H240ZM333.33-360H760q0-39 27.17-66.17 27.16-27.16 66.16-27.16V-640q-39 0-66.16-27.17Q760-694.33 760-733.33H333.33q0 39-27.16 66.16Q279-640 240-640v186.67q39 0 66.17 27.16Q333.33-399 333.33-360ZM800-160H106.67q-27.5 0-47.09-19.58Q40-199.17 40-226.67V-680h66.67v453.33H800V-160ZM240-360v-373.33V-360Z" />
              </svg>
              <p>Pending Invoices</p>
              <p>
                {currency}
                {dueAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder for a graph */}
        <div style={{ width: "400px", height: "200px", backgroundColor: "#eee", marginTop: "20px" }}>
          <InvoiceGraph invoices={invoices} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
