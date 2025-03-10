import React, { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import Link from 'next/link';

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, PieController);

// Token allocation data
const tokenData = {
  labels: ['DAO', 'UGF', 'Staking', 'VC Contracts', 'Circulating'],
  datasets: [
    {
      data: [2368974533, 607751000, 5648061554, 794411000, 13507729913],
      backgroundColor: [
        '#B8EC0C', // opngreen
        '#C28BE1', // opnpurple
        '#5dbea3',
        '#f7a35c',
        '#7798BF'
      ],
      borderWidth: 0,
    },
  ],
};

// Wallet data
const walletData = [
  { name: 'DAO (GET)', address: '0x0c6A327FcB01AAA53789998DC8B5EA8076F38Dc1', amount: '2,333,000,000.00', chain: 'ethereum' },
  { name: 'DAO Revenue (Polygon OPN)', address: '0x3Fb2C66d02aeD9dc67130C93261beEdA75cb3468', amount: '35,974,533.00', chain: 'polygon' },
  { name: 'UGF', address: '0x50b0b33b88970a2755d7Ed84fbED829FA4881771', amount: '607,751,000.00', chain: 'ethereum' },
  { name: 'OPN Staking Ethereum + Polygon', address: '0x686e8500B6bE8812EB198aAbbbFA14C95c03fC88', amount: '4,697,784,554.00', chain: 'ethereum' },
  { name: 'GET Staking Ethereum + Polygon', address: '0x3e49E9C890Cd5B015A18ed76E7A4093f569f1A04', amount: '950,277,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #1', address: '0xc2d456b8dDf6ba5F38a09c252DAAe231C45200E9', amount: '159,608,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #2', address: '0xa2029B06c6b3cA79C61B9F3bfb3634782C29D103', amount: '106,405,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #3', address: '0x57b2727f80bB2c1d75e028793D1f799005dE3515', amount: '79,804,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #4', address: '0x80a25562c90e3CaD944C27A30C12F6BFC478d7B8', amount: '0.00', chain: 'ethereum' },
  { name: 'VC Wallet #5', address: '0x428E210Ab6f6CA88029a7989F072c2878b0f29b7', amount: '0.00', chain: 'ethereum' },
  { name: 'VC Wallet #5 (2)', address: '0xBE8613c17F9B887cb3467e4f1Ce4af9f33a269F9', amount: '0.00', chain: 'ethereum' },
  { name: 'VC Wallet #6', address: '0xa6A8421bc9f9725e9b23ec3f82fd9087f198bEC0', amount: '0.00', chain: 'ethereum' },
  { name: 'VC Wallet #7', address: '0x9d6C0B2E0B1c95128Cc139e9616621aAEDcF7423', amount: '26,161,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #8', address: '0xD674A2A7f43e36cf461340CD0d1473EcFf9120d6', amount: '2,966,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #9', address: '0xE0089FF546238C56497f69A5D5901b713b71007E', amount: '0.00', chain: 'ethereum' },
  { name: 'VC Wallet #10', address: '0x47c85d273EdDBc920fd661720502d70153103ab9', amount: '0.00', chain: 'ethereum' },
  { name: 'VC Wallet #11', address: '0x72917164f580C5CC26c52f79031bEC8ea629BE66', amount: '0.00', chain: 'ethereum' },
  { name: 'VC Wallet #12', address: '0x223c1F014Ad0112a36D60c530a8D1dBef6040Ac2', amount: '4,106,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #13', address: '0x7B889640b27ad886aF99720604C4839418bDd19e', amount: '4,106,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #14', address: '0x4AB51C33fe7BFE0e40Be4D5aDB9Ef7829F619eaB', amount: '89,684,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #15', address: '0x766879C6216c4a523B90349236b12F81E0a1d714', amount: '27,425,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #16', address: '0x43D608bDc3BA5fFa36cfB6BB2638dDcADAA1214d', amount: '44,637,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #17', address: '0xEf5C1E4846ea0AFdE5bEfd280235450C479CAE4A', amount: '6,223,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #18', address: '0x9698b69A3351326e50BA9735432748152b015F60', amount: '8,471,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #19', address: '0xE34aA3bb715B18b1D5d819F85c0B9513B1D8Bca5', amount: '0.00', chain: 'ethereum' },
  { name: 'VC Wallet #20', address: '0xD40aA45E5759133328d5484e4cE0fe84fa8AC42A', amount: '9,074,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #21', address: '0xd6c96198A6b4faE64D868E673065283204A9D97c', amount: '62,500,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #22', address: '0xee47A8F300d2532f4f8842f6Fd3Bc92661468f55', amount: '12,953,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #23', address: '0xc2A643EF5Ec6F270D96534c6D28269BF46BA8B98', amount: '66,317,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #24', address: '0xa35C5ABCd60DD19a39Cb0edE9274a2a983F337DC', amount: '0.00', chain: 'ethereum' },
  { name: 'VC Wallet #25', address: '0x3977Bd137183dAd693F283e4D042aB2Dc37AE400', amount: '72,127,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #26', address: '0xF19752286c7911A839B0F0C5F79F80e368D7c6F4', amount: '6,056,000.00', chain: 'ethereum' },
  { name: 'VC Wallet #27', address: '0xA7959f2290419E6Eb4F72CE7EDFF6Ea6b3D20a08', amount: '5,788,000.00', chain: 'ethereum' },
];

// Function to get explorer URL based on chain
const getExplorerUrl = (address, chain) => {
  switch(chain) {
    case 'ethereum':
      return `https://etherscan.io/address/${address}`;
    case 'polygon':
      return `https://polygonscan.com/address/${address}`;
    case 'base':
      return `https://basescan.org/address/${address}`;
    default:
      return `https://etherscan.io/address/${address}`;
  }
};

// Calculate percentages for token data
const totalTokens = tokenData.datasets[0].data.reduce((acc, val) => acc + val, 0);
tokenData.datasets[0].data.forEach((value, index) => {
  const percentage = ((value / totalTokens) * 100).toFixed(2);
  // Add percentage to the label
  tokenData.labels[index] = `${tokenData.labels[index]} (${percentage}%)`;
});

export default function TokenAllocation() {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      
      // Create new chart
      chartRef.current.chart = new Chart(ctx, {
        type: 'pie',
        data: tokenData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 20,
              bottom: 20,
              left: 20,
              right: 20
            }
          },
          plugins: {
            legend: {
              position: 'right',
              align: 'start',
              labels: {
                color: '#FFFFFF',
                font: {
                  size: 12
                },
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const labelIndex = context.dataIndex;
                  const value = context.dataset.data[labelIndex];
                  const formattedValue = new Intl.NumberFormat().format(value);
                  const percent = ((value / totalTokens) * 100).toFixed(2);
                  return `${context.chart.data.labels[labelIndex]}: ${formattedValue} (${percent}%)`;
                },
                title: function(context) {
                  return ''; // Remove title to save space
                }
              },
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              bodyFont: {
                size: 13
              },
              bodySpacing: 8,
              boxWidth: 8
            },
            datalabels: {
              display: false  // Don't show labels in the pie itself to avoid clutter
            }
          },
          elements: {
            arc: {
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.2)',
              hoverBorderColor: 'white',
              hoverBorderWidth: 2
            }
          },
          interaction: {
            mode: 'nearest',
            intersect: false
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, []);
  
  // Calculate total
  const total = tokenData.datasets[0].data.reduce((a, b) => a + b, 0);
  const formattedTotal = new Intl.NumberFormat().format(total);
  
  return (
    <Layout
      title="OPEN Token Allocation - Distribution Details"
      description="Explore the OPEN token allocation across DAO, UGF, Staking, VC Contracts, and circulating supply. View key wallet addresses and their holdings."
      canonicalUrl="/token-allocation"
    >
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-8 text-center max-w-6xl mx-auto">
        <img src="/logo.png" alt="Logo" className="mb-6 sm:mb-10 max-h-16 sm:max-h-20" />
        
        <h1 className="open-font text-white text-3xl sm:text-5xl uppercase mb-4 sm:mb-8">
          Token Allocation
        </h1>
        
        {/* Pie Chart Section */}
        <div className="w-full max-w-4xl mb-12">
          <div className="bg-black/20 backdrop-blur-md p-6 rounded-lg border-2 border-white/20">
            <h2 className="open-font text-white text-2xl uppercase mb-6">Distribution</h2>
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-[350px] sm:h-[400px] w-full sm:w-3/5">
                <canvas ref={chartRef} />
              </div>
              <div className="mt-6 sm:mt-0 sm:ml-6 sm:w-2/5">
                <div className="grid grid-cols-1 gap-3">
                  {tokenData.datasets[0].data.map((value, index) => {
                    const originalLabel = tokenData.labels[index].split(' (')[0];
                    const percentage = ((value / totalTokens) * 100).toFixed(2);
                    return (
                      <div key={index} className="flex items-center justify-between p-2 border-b border-white/10 hover:bg-white/5 transition-all rounded">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 mr-2 rounded-sm" 
                            style={{ backgroundColor: tokenData.datasets[0].backgroundColor[index] }}
                          />
                          <span className="text-white text-sm">{originalLabel}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-white font-mono text-sm">
                            {new Intl.NumberFormat().format(value)}
                          </span>
                          <span className="text-white/70 text-xs">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between p-2 border-b border-white/10 mt-2 bg-black/20 rounded font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white font-mono">{formattedTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wallets Table Section */}
        <h2 className="open-font text-white text-2xl sm:text-4xl uppercase mb-4 sm:mb-8">
          Key Wallets
        </h2>
        <div className="w-full overflow-x-auto mb-8">
          <table className="w-full text-white bg-black/20 backdrop-blur-md rounded-lg border-collapse">
            <thead className="open-font uppercase">
              <tr className="border-b-2 border-white/20">
                <th className="p-4 text-left">Wallet</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {walletData.map((wallet, index) => (
                <tr 
                  key={index} 
                  className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="p-4 text-left">{wallet.name}</td>
                  <td className="p-4 text-left font-mono text-sm">
                    <a 
                      href={getExplorerUrl(wallet.address, wallet.chain)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-opngreen hover:text-opnpurple transition-colors duration-200"
                    >
                      {wallet.address.substring(0, 6)}...{wallet.address.substring(38)}
                      <span className="inline-block ml-1 opacity-70 text-xs">
                        ({wallet.chain === 'ethereum' ? 'ETH' : wallet.chain === 'polygon' ? 'MATIC' : 'BASE'})
                      </span>
                    </a>
                  </td>
                  <td className="p-4 text-right font-mono">
                    {wallet.amount}
                  </td>
                </tr>
              ))}
              <tr className="bg-black/30 font-bold">
                <td className="p-4 text-left" colSpan={2}>Total in VC Contracts:</td>
                <td className="p-4 text-right font-mono">794,411,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
} 