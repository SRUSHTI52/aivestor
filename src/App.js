// ------------SIDE NAVBAR AND BITCOIN CHART ---------------
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import { Line } from "react-chartjs-2";
// import { motion } from "framer-motion";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const Dashboard = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=5')
//       .then(res => res.json())
//       .then(data => {
//         const labels = data.prices.map(entry => new Date(entry[0]).toLocaleDateString());
//         const prices = data.prices.map(entry => entry[1]);

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Bitcoin (USD)",
//               data: prices,
//               borderColor: "#007bff",
//               backgroundColor: "rgba(0, 123, 255, 0.1)",
//               tension: 0.4,
//               fill: true,
//             },
//           ],
//         });
//       });
//   }, []);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//       },
//     },
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <div style={{ width: '220px', minHeight: '100vh', background: '#343a40', color: '#fff', padding: '20px' }}>
//         <h2 style={{ color: '#fff' }}>Aivestor</h2>
//         <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
//           <Link to="/" style={{ color: '#adb5bd', textDecoration: 'none' }}>Dashboard</Link>
//           <Link to="/predict" style={{ color: '#adb5bd', textDecoration: 'none' }}>UptiqPredict</Link>
//           <Link to="/assistant" style={{ color: '#adb5bd', textDecoration: 'none' }}>Investment Assistant</Link>
//           <Link to="/tools" style={{ color: '#adb5bd', textDecoration: 'none' }}>Tools</Link>
//           <Link to="/insights" style={{ color: '#adb5bd', textDecoration: 'none' }}>Insights</Link>
//           <Link to="/education" style={{ color: '#adb5bd', textDecoration: 'none' }}>Education Hub</Link>
//           <Link to="/profile" style={{ color: '#adb5bd', textDecoration: 'none' }}>User Dashboard</Link>
//         </nav>
//       </div>

//       <div style={{ flex: 1, background: '#f1f3f5', padding: '24px' }}>
//         <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
//           <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Trending Investment Data</h2>
//           {chartData ? (
//             <Line data={chartData} options={options} />
//           ) : (
//             <p>Loading chart...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/predict" element={<div style={{ padding: '24px' }}>UptiqPredict Coming Soon</div>} />
//         <Route path="/assistant" element={<div style={{ padding: '24px' }}>Investment Assistant Coming Soon</div>} />
//         <Route path="/tools" element={<div style={{ padding: '24px' }}>Tools Section Coming Soon</div>} />
//         <Route path="/insights" element={<div style={{ padding: '24px' }}>Insights Dashboard Coming Soon</div>} />
//         <Route path="/education" element={<div style={{ padding: '24px' }}>Education Hub Coming Soon</div>} />
//         <Route path="/profile" element={<div style={{ padding: '24px' }}>User Profile Dashboard Coming Soon</div>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [btcData, setBtcData] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [mfData, setMfData] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=5')
      .then(res => res.json())
      .then(data => {
        const labels = data.prices.map(entry => new Date(entry[0]).toLocaleDateString());
        const prices = data.prices.map(entry => entry[1]);

        setBtcData({
          labels,
          datasets: [
            {
              label: "Bitcoin (USD)",
              data: prices,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      });

    fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=GZCFLPIXIOC0BXCC')
      .then(res => res.json())
      .then(data => {
        const gainers = data.top_gainers || [];
        setStockData(gainers.slice(0, 5));
      });

    fetch('https://api.mfapi.in/mf/100027')
      .then(res => res.json())
      .then(data => Array.isArray(data.data) ? setMfData(data.data.slice(0, 5)) : setMfData([]));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '220px', minHeight: '100vh', background: '#343a40', color: '#fff', padding: '20px' }}>
        <h2 style={{ color: '#fff' }}>Aivestor</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
          <Link to="/" style={{ color: '#adb5bd', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/predict" style={{ color: '#adb5bd', textDecoration: 'none' }}>UptiqPredict</Link>
          <Link to="/assistant" style={{ color: '#adb5bd', textDecoration: 'none' }}>Investment Assistant</Link>
          <Link to="/tools" style={{ color: '#adb5bd', textDecoration: 'none' }}>Tools</Link>
          <Link to="/insights" style={{ color: '#adb5bd', textDecoration: 'none' }}>Insights</Link>
          <Link to="/education" style={{ color: '#adb5bd', textDecoration: 'none' }}>Education Hub</Link>
          <Link to="/profile" style={{ color: '#adb5bd', textDecoration: 'none' }}>User Dashboard</Link>
        </nav>
      </div>

      <div style={{ flex: 1, background: '#f1f3f5', padding: '24px' }}>
        <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Trending Crypto Data</h2>
          {btcData ? (
            <Line data={btcData} options={options} />
          ) : (
            <p>Loading Bitcoin chart...</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, background: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h3>Trending Stocks</h3>
            {stockData ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {stockData.map((stock, idx) => (
                  <div key={idx} style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #dee2e6' }}>
                    <h4 style={{ margin: '0 0 4px 0' }}>{stock.ticker} - {stock.name}</h4>
                    <p style={{ margin: 0 }}><strong>Price:</strong> ${stock.price}</p>
                    {stock.change_percentage && <p style={{ margin: 0 }}><strong>Change:</strong> {stock.change_percentage}</p>}
                  </div>
                ))}
              </div>
            ) : <p>Loading stocks...</p>}
          </div>

          <div style={{ flex: 1, background: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h3>Trending Mutual Funds</h3>
            {mfData.length > 0 ? (
              <ul>
                {mfData.map((mf, idx) => (
                  <li key={idx}>{new Date(mf.date).toLocaleDateString()} - NAV: ₹{mf.nav}</li>
                ))}
              </ul>
            ) : <p>Loading mutual funds...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/predict" element={<div style={{ padding: '24px' }}>UptiqPredict Coming Soon</div>} />
        <Route path="/assistant" element={<div style={{ padding: '24px' }}>Investment Assistant Coming Soon</div>} />
        <Route path="/tools" element={<div style={{ padding: '24px' }}>Tools Section Coming Soon</div>} />
        <Route path="/insights" element={<div style={{ padding: '24px' }}>Insights Dashboard Coming Soon</div>} />
        <Route path="/education" element={<div style={{ padding: '24px' }}>Education Hub Coming Soon</div>} />
        <Route path="/profile" element={<div style={{ padding: '24px' }}>User Profile Dashboard Coming Soon</div>} />
      </Routes>
    </Router>
  );
};

export default App;



