import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import Link from 'next/link';

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, PieController);

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

export default function TokenAllocation() {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [walletData, setWalletData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to fetch token allocation data from API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/token-allocation');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Prepare chart data
        const chartData = {
          labels: data.distribution.labels,
          datasets: [
            {
              data: data.distribution.values,
              backgroundColor: data.distribution.colors,
              borderWidth: 0,
            },
          ],
        };
        
        setTokenData(chartData);
        setWalletData(data.wallets);
        setLastUpdated(data.totals.lastUpdated);
        setError(null);
      } catch (err) {
        console.error('Error fetching token data:', err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Initialize and update chart when data changes
  useEffect(() => {
    if (chartRef.current && tokenData) {
      // Calculate total for percentages
      const totalTokens = tokenData.datasets[0].data.reduce((acc, val) => acc + val, 0);
      
      // Add percentages to labels
      const labelsWithPercentages = tokenData.labels.map((label, index) => {
        const percentage = ((tokenData.datasets[0].data[index] / totalTokens) * 100).toFixed(2);
        return `${label} (${percentage}%)`;
      });
      
      const chartDataWithPercentages = {
        ...tokenData,
        labels: labelsWithPercentages,
      };
      
      // Destroy previous chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      
      // Create new chart
      chartRef.current.chart = new Chart(ctx, {
        type: 'pie',
        data: chartDataWithPercentages,
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
              display: false, // Hide the legend since we have the table
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const labelIndex = context.dataIndex;
                  const value = context.dataset.data[labelIndex];
                  const formattedValue = new Intl.NumberFormat().format(value);
                  const percent = ((value / totalTokens) * 100).toFixed(2);
                  return `${tokenData.labels[labelIndex]}: ${formattedValue} (${percent}%)`;
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
  }, [tokenData]);
  
  // Calculate total from data
  const totalTokens = tokenData?.datasets[0]?.data.reduce((a, b) => a + b, 0) || 0;
  const formattedTotal = new Intl.NumberFormat().format(totalTokens);
  
  return (
    <Layout
      title="OPEN Token Allocation - Distribution Details"
      description="Explore the OPEN token allocation across DAO, UGF, Staking, VC Contracts, and circulating supply. View key wallet addresses and their holdings."
      canonicalUrl="/token-allocation"
    >
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-8 text-center max-w-6xl mx-auto">
        <a href="/" className="block mb-6 sm:mb-10">
          <img src="/logo.png" alt="Logo" className="max-h-16 sm:max-h-20 transition-transform duration-300 hover:scale-105" />
        </a>
        
        <div className="w-full text-center mb-8">
          <h1 className="open-font text-white text-3xl sm:text-5xl uppercase mb-4">
            Token Allocation
          </h1>
          
          {lastUpdated && (
            <div className="text-white/70 text-sm">
              Last updated: {formatDate(lastUpdated)}
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="w-full py-20 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-16 w-16 bg-white/20 rounded-full mb-4"></div>
              <div className="h-4 w-40 bg-white/20 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="w-full py-20 bg-red-500/20 rounded-lg border border-red-500/30 text-white">
            <h2 className="text-xl mb-4">Error Loading Data</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md transition-all duration-300"
            >
              Reload Page
            </button>
          </div>
        ) : (
          <>
            {/* Pie Chart Section */}
            <div className="w-full max-w-4xl mb-12">
              <div className="backdrop-blur-md p-6 rounded-lg border-2 border-white/20 bg-black/10">
                <h2 className="open-font text-white text-2xl uppercase mb-6">Distribution</h2>
                <div className="flex flex-col lg:flex-row">
                  <div className="relative h-[350px] sm:h-[400px] w-full mb-6 lg:mb-0 lg:w-3/5">
                    <canvas ref={chartRef} />
                  </div>
                  <div className="w-full lg:ml-6 lg:w-2/5">
                    <div className="grid grid-cols-1 gap-3">
                      {tokenData.datasets[0].data.map((value, index) => {
                        const originalLabel = tokenData.labels[index].split(' (')[0];
                        const percentage = ((value / totalTokens) * 100).toFixed(2);
                        return (
                          <div key={index} className="flex items-center justify-between p-2 border-b border-white/10 hover:bg-white/5 transition-all rounded">
                            <div className="flex items-center min-w-0 pr-2">
                              <div 
                                className="w-4 h-4 mr-2 flex-shrink-0 rounded-sm" 
                                style={{ backgroundColor: tokenData.datasets[0].backgroundColor[index] }}
                              />
                              <span className="text-white text-sm truncate">{originalLabel}</span>
                            </div>
                            <div className="flex flex-col items-end flex-shrink-0">
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
              <table className="w-full text-white backdrop-blur-md rounded-lg border-collapse border-2 border-white/20 bg-black/10">
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
          </>
        )}
      </main>
    </Layout>
  );
} 