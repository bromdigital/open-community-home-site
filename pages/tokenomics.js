import { useState } from 'react';
import Layout from '../components/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, ComposedChart, Legend } from 'recharts';
import { TrendingUp, Flame, Coins, PiggyBank, Target, Activity } from 'lucide-react';

export default function Tokenomics() {
  // Get current month to make projections dynamic
  const currentMonth = new Date().getMonth(); // 0-indexed (June = 5)
  const currentMonthName = new Date().toLocaleString('default', { month: 'short' });

  // State for sliders
  const [annualTickets, setAnnualTickets] = useState(19000000); // Starting with CM.com's volume
  const [avgTicketPrice, setAvgTicketPrice] = useState(50);
  const [resaleRate, setResaleRate] = useState(8); // 8% default resale rate mentioned in blog
  const [currentTokenPrice, setCurrentTokenPrice] = useState(0.0004358); // Updated to realistic current price
  const [scalperTaxRate, setScalperTaxRate] = useState(15); // Average of 5-30% range
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to the first month for detailed view
  
  // --- Core Assumptions from OPN Tokenomics Blog ---
  const MINTING_FEE = 0.03; // $0.03 per ticket
  const SECONDARY_MARKET_FEE = 0.02; // Using 2% as average of 1-3% range
  const SCALPER_PROTOCOL_SHARE = 0.5; // Protocol receives 50% of the scalper tax
  const SCALPER_PROFIT_MARGIN = 0.5; // Assumption: Scalpers make an average of 50% profit
  const SCALPER_ACTIVITY_RATE = 0.3; // Assumption: 30% of resales are by scalpers

  // Seasonal multipliers for ticket sales (illustrative) - Normalized to sum to 12
  const rawSeasonalMultipliers = [
    0.7, 0.6, 0.9, 1.1, 1.3, 1.4, 1.2, 1.1, 1.3, 1.4, 1.2, 0.8
  ];
  const sumOfMultipliers = rawSeasonalMultipliers.reduce((a, b) => a + b, 0);
  const allSeasonalMultipliers = rawSeasonalMultipliers.map(m => m * 12 / sumOfMultipliers);

  // Create seasonal multipliers starting from current month
  const seasonalMultipliers = [];
  const monthNames = [];
  const fullMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth + i) % 12;
    seasonalMultipliers.push(allSeasonalMultipliers[monthIndex]);
    monthNames.push(fullMonthNames[monthIndex]);
  }

  // Helper function to format large numbers
  const formatLargeNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 border border-slate-600 shadow-lg">
          <p className="font-bold text-purple-300">{label}</p>
          <ul className="text-sm mt-2 space-y-1">
            {payload.map((pld, index) => (
              <li key={index} style={{ color: pld.color }}>
                <span className="font-semibold">{pld.name}:</span>{' '}
                <span className="font-normal">
                  {
                    pld.name.toLowerCase().includes('pressure') || pld.name.toLowerCase().includes('revenue') || pld.name.toLowerCase().includes('fees')
                      ? `$${pld.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                      : pld.name.toLowerCase().includes('apy')
                      ? `${pld.value.toFixed(1)}%`
                      : pld.name.toLowerCase().includes('price')
                      ? `$${pld.value.toFixed(6)}`
                      : `${pld.value.toLocaleString(undefined, { maximumFractionDigits: 0 })} OPN`
                  }
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  const formatCurrency = (num) => `$${(num || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}`;

  // Calculated metrics
  const monthlyTickets = annualTickets / 12;
  const monthlyResales = (monthlyTickets * resaleRate) / 100;
  const mintingRevenue = monthlyTickets * MINTING_FEE; // $0.03 per ticket
  const secondaryFeeRevenue = monthlyResales * avgTicketPrice * SECONDARY_MARKET_FEE; // 2% average secondary fee
  const scalperTaxRevenue = (monthlyResales * SCALPER_ACTIVITY_RATE) * (avgTicketPrice * SCALPER_PROFIT_MARGIN) * (scalperTaxRate / 100) * SCALPER_PROTOCOL_SHARE;
  
  const totalMonthlyRevenue = mintingRevenue + secondaryFeeRevenue + scalperTaxRevenue;
  
  // Token distribution (40% burn, 40% stakers, 20% treasury)
  const burnAmount = totalMonthlyRevenue * 0.4;
  const stakerRewards = totalMonthlyRevenue * 0.4;
  const treasuryFunds = totalMonthlyRevenue * 0.2;
  
  // Token buyback calculation (burn amount divided by token price) - will be recalculated monthly
  const tokensForStaking = stakerRewards / currentTokenPrice;
  
  const calculateMonthlyProgression = () => {
    const months = [];
    let currentPrice = currentTokenPrice;
    let cumulativeTokensBurned = 0;
    let cumulativeRevenue = 0;
    let cumulativeStakerRewards = 0;

    for (let i = 0; i < 12; i++) {
      const seasonalMultiplier = seasonalMultipliers[i];
      const monthlyTicketsThisMonth = (annualTickets / 12) * seasonalMultiplier;
      const monthlyResalesThisMonth = (monthlyTicketsThisMonth * resaleRate) / 100;

      // 1. Revenue Calculation
      const mintingRevenue = monthlyTicketsThisMonth * MINTING_FEE;
      const secondaryFeeRevenue = monthlyResalesThisMonth * avgTicketPrice * SECONDARY_MARKET_FEE;
      const scalperProfit = (monthlyResalesThisMonth * SCALPER_ACTIVITY_RATE) * (avgTicketPrice * SCALPER_PROFIT_MARGIN);
      const scalperTax = scalperProfit * (scalperTaxRate / 100);
      const protocolScalperRevenue = scalperTax * SCALPER_PROTOCOL_SHARE;
      const totalProtocolRevenue = mintingRevenue + secondaryFeeRevenue + protocolScalperRevenue;

      // 2. Distribution & Buy Pressure
      const burnValue = totalProtocolRevenue * 0.4;
      const stakerRewardsValue = totalProtocolRevenue * 0.4;
      const treasuryValue = totalProtocolRevenue * 0.2;
      const buyingPressure = burnValue + stakerRewardsValue; // Total value used to buy OPN from the market

      // 3. Price Impact (Simplified)
      const CIRCULATING_SUPPLY = 250000000; // Constant assumption
      const marketCap = currentPrice * CIRCULATING_SUPPLY;
      const priceChangeRatio = marketCap > 0 ? buyingPressure / marketCap : 0;
      const nextPrice = currentPrice * (1 + priceChangeRatio);

      // 4. Accumulate monthly and cumulative data
      const tokensBurnedThisMonth = burnValue / currentPrice;
      cumulativeTokensBurned += tokensBurnedThisMonth;
      cumulativeRevenue += totalProtocolRevenue;
      cumulativeStakerRewards += stakerRewardsValue;

      months.push({
        month: monthNames[i],
        price: nextPrice,
        tokensBurnedThisMonth,
        monthlyPriceIncrease: ((nextPrice - currentPrice) / currentPrice) * 100,
        monthlyRevenue: totalProtocolRevenue,

        // --- Data for Transparent Calculation Display ---
        mintingRevenue,
        secondaryFeeRevenue,
        protocolScalperRevenue,
        burnValue,
        stakerRewardsValue,
        treasuryValue,
        buyingPressure,
        marketCap,
        priceChangeRatio,
        // --- Cumulative Data ---
        cumulativeTokensBurned,
        cumulativeRevenue,
        cumulativeStakerRewards
      });

      currentPrice = nextPrice;
    }
    return months;
  };

  const monthlyProgression = calculateMonthlyProgression();
  
  // Data for the selected month to drive the dynamic cards
  const selectedData = monthlyProgression[selectedMonth - 1] || monthlyProgression[0];
  const priceIncreaseFromToday = selectedData && currentTokenPrice > 0 ? ((selectedData.price - currentTokenPrice) / currentTokenPrice) * 100 : 0;
  const isPeakSeason = seasonalMultipliers[selectedMonth - 1] >= 1.3;

  // Updated metrics using first month's calculations for display
  const firstMonth = monthlyProgression[0];
  const tokensBurnedMonthly = firstMonth?.tokensBurnedThisMonth || 0;
  const updatedMonthlyPriceIncrease = firstMonth?.monthlyPriceIncrease || 0;

  // Data for charts - Totals over the 12-month projection
  const yearlyTotals = monthlyProgression.reduce((acc, month) => {
    acc.burnValue += month.burnValue;
    acc.stakerRewardsValue += month.stakerRewardsValue;
    acc.treasuryValue += month.treasuryValue;
    acc.mintingRevenue += month.mintingRevenue;
    acc.secondaryFeeRevenue += month.secondaryFeeRevenue;
    acc.protocolScalperRevenue += month.protocolScalperRevenue;
    return acc;
  }, { 
    burnValue: 0, stakerRewardsValue: 0, treasuryValue: 0, 
    mintingRevenue: 0, secondaryFeeRevenue: 0, protocolScalperRevenue: 0 
  });

  const revenueDistribution = [
    { name: 'Token Burns (40%)', value: yearlyTotals.burnValue, color: '#ff4444' },
    { name: 'Staker Rewards (40%)', value: yearlyTotals.stakerRewardsValue, color: '#44ff44' },
    { name: 'Treasury (20%)', value: yearlyTotals.treasuryValue, color: '#4444ff' }
  ];

  const revenueBreakdown = [
    { name: 'Ticket Minting', value: yearlyTotals.mintingRevenue, color: '#8884d8' },
    { name: 'Secondary Fees', value: yearlyTotals.secondaryFeeRevenue, color: '#82ca9d' },
    { name: 'Scalper Tax', value: yearlyTotals.protocolScalperRevenue, color: '#ffc658' }
  ];

  // Projected growth data using the month-by-month calculations
  const projectedData = monthlyProgression.map(month => ({
    month: month.month,
    price: month.price,
    'Tokens Burned': month.tokensBurnedThisMonth,
    'Monthly Revenue': month.monthlyRevenue,
  }));

  return (
    <Layout
      title="OPN Tokenomics Dashboard"
      description="Interactive dashboard to visualize the impact of OPN's tokenomics. See how ticket volume, resales, and scalper taxes drive token burns, staking rewards, and price."
      canonicalUrl="/tokenomics"
    >
      <div className="max-w-7xl mx-auto text-white p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in pt-24">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            OPN Tokenomics: A Strategic View
          </h1>
          <p className="text-gray-300 text-lg">
            An interactive model based on the official OPN tokenomics documentation.
          </p>
          <p className="text-sm text-purple-300 mt-2">
            Projections starting from {currentMonthName} {new Date().getFullYear()}
          </p>
        </div>

        {/* Calculation Methodology */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 mb-8 animate-slide-up transition-all duration-300 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Tokenomics Model Explained</h2>
          <p className="text-sm text-gray-400 mb-4">This model implements the tokenomics described in the <a href="https://mirror.xyz/openticketing.eth/t9_sGCTKH9UsAXTMHLohSpK0ZOmo2apDnKBTdPJpla4" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">official blog post</a>. It focuses on core revenue generation and its direct impact on token price.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-300">Revenue Generation</h3>
              <ul className="space-y-1 text-xs">
                <li>• <strong>Minting Fee:</strong> A flat $0.03 per ticket.</li>
                <li>• <strong>Secondary Fee:</strong> An average 2% fee on the ticket&apos;s resale price.</li>
                <li>• <strong>Scalper Tax:</strong> The protocol receives 50% of a {scalperTaxRate}% tax, which is applied *only* to the estimated profit from scalped tickets.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-green-300">Price Impact Mechanism</h3>
              <ul className="space-y-1 text-xs">
                <li>• <strong>80% Buy Pressure:</strong> 80% of protocol revenue (40% for Token Burns + 40% for Staker Rewards) is used to buy OPN from the open market.</li>
                <li>• <strong>Deflation & Yield:</strong> This creates direct upward price pressure while funding deflation (burns) and staker yield.</li>
                <li>• <strong>Price Growth:</strong> The price impact is calculated based on the ratio of this total buy pressure to the token&apos;s market cap.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Control Sliders - Moved to top */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 mb-8 animate-slide-up transition-all duration-300 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Tokenomics Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            
            <div className="space-y-2 animate-fade-in group">
              <label className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                Annual Tickets: {formatLargeNumber(annualTickets)}
              </label>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={annualTickets}
                onChange={(e) => setAnnualTickets(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider transition-all duration-200 hover:h-3"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1M</span>
                <span>100M</span>
              </div>
            </div>

            <div className="space-y-2 animate-fade-in group">
              <label className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                Average Ticket Price: ${avgTicketPrice}
              </label>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={avgTicketPrice}
                onChange={(e) => setAvgTicketPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider transition-all duration-200 hover:h-3"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>$10</span>
                <span>$500</span>
              </div>
            </div>

            <div className="space-y-2 animate-fade-in group">
              <label className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                Resale Rate: {resaleRate}%
              </label>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={resaleRate}
                onChange={(e) => setResaleRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider transition-all duration-200 hover:h-3"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1%</span>
                <span>25%</span>
              </div>
            </div>

            <div className="space-y-2 animate-fade-in group">
              <label className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                Token Price: ${currentTokenPrice.toFixed(6)}
              </label>
              <input
                type="range"
                min="0.0001"
                max="0.01"
                step="0.0001"
                value={currentTokenPrice}
                onChange={(e) => setCurrentTokenPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider transition-all duration-200 hover:h-3"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>$0.0001</span>
                <span>$0.01</span>
              </div>
            </div>

            <div className="space-y-2 animate-fade-in group">
              <label className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                Scalper Tax Rate: {scalperTaxRate}%
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={scalperTaxRate}
                onChange={(e) => setScalperTaxRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider transition-all duration-200 hover:h-3"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>5%</span>
                <span>30%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Future Month Projection - As per user image */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 mb-8 animate-slide-up">
          <h2 className="text-xl font-bold mb-6 text-orange-400">Future Month Projection</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Select Month for Detailed Analysis: {selectedData.month} ({selectedMonth} months from now)
            </label>
            <input
              type="range" min="1" max="12" step="1" value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 month</span>
              <span>6 months</span>
              <span>12 months</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-orange-500/30">
              <p className="text-orange-400 text-sm font-semibold mb-2 flex items-center"><Target className="w-4 h-4 mr-2" />Token Price</p>
              <p className="text-2xl font-bold text-white">${selectedData.price.toFixed(6)}</p>
              <p className="text-xs text-green-400">+{priceIncreaseFromToday.toLocaleString(undefined, {maximumFractionDigits: 0})}% from today</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
              <p className="text-red-400 text-sm font-semibold mb-2 flex items-center"><Flame className="w-4 h-4 mr-2" />Cumulative Tokens Burned</p>
              <p className="text-2xl font-bold text-white">{selectedData.cumulativeTokensBurned.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              <p className="text-xs text-gray-400">in {selectedMonth} month{selectedMonth > 1 ? 's' : ''}</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
              <p className="text-green-400 text-sm font-semibold mb-2 flex items-center"><PiggyBank className="w-4 h-4 mr-2" />Cumulative Staker Rewards</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(selectedData.cumulativeStakerRewards)}</p>
              <p className="text-xs text-gray-400">over {selectedMonth} month{selectedMonth > 1 ? 's' : ''}</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
              <p className="text-blue-400 text-sm font-semibold mb-2 flex items-center"><TrendingUp className="w-4 h-4 mr-2" />Cumulative Revenue</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(selectedData.cumulativeRevenue)}</p>
              <p className="text-xs text-gray-400">over {selectedMonth} month{selectedMonth > 1 ? 's' : ''}{isPeakSeason && ' (incl. peak)'}</p>
            </div>
          </div>

          <div className="p-3 bg-slate-900/40 rounded-lg text-center text-sm text-gray-400 border border-slate-700">
            <p><strong>Scenario Analysis:</strong> Use this slider to explore tokenomics at any future point. Watch how seasonal variations and compound price effects impact burns, rewards, and growth rates.</p>
          </div>
        </div>
        
        {/* Transparent Calculation Breakdown */}
        {(() => {
          if (!selectedData) return null;

          return (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 mb-8 animate-slide-up">
              <h2 className="text-xl font-bold mb-4 text-cyan-400 text-center">
                Detailed Calculation for: {selectedData.month}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h3 className="font-semibold text-cyan-300 mb-2">1. Revenue Generation</h3>
                  <ul className="space-y-1 text-xs">
                    <li>Minting Fees: <span className="float-right font-mono">{formatCurrency(selectedData.mintingRevenue)}</span></li>
                    <li>Secondary Fees: <span className="float-right font-mono">{formatCurrency(selectedData.secondaryFeeRevenue)}</span></li>
                    <li>Scalper Tax (Protocol Share): <span className="float-right font-mono">{formatCurrency(selectedData.protocolScalperRevenue)}</span></li>
                    <li className="font-bold text-white pt-1 mt-2 border-t border-cyan-800">Total Revenue: <span className="float-right font-mono">{formatCurrency(selectedData.monthlyRevenue)}</span></li>
                  </ul>
                </div>
                
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h3 className="font-semibold text-cyan-300 mb-2">2. Buy Pressure</h3>
                  <ul className="space-y-1 text-xs">
                    <li>Value to Burn (40%): <span className="float-right font-mono">{formatCurrency(selectedData.burnValue)}</span></li>
                    <li>Value to Stakers (40%): <span className="float-right font-mono">{formatCurrency(selectedData.stakerRewardsValue)}</span></li>
                    <li className="font-bold text-white pt-1 mt-2 border-t border-cyan-800">Total Buy Pressure: <span className="float-right font-mono">{formatCurrency(selectedData.buyingPressure)}</span></li>
                  </ul>
                </div>

                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h3 className="font-semibold text-cyan-300 mb-2">3. Price Impact</h3>
                  <ul className="space-y-1 text-xs">
                    <li>Total Buy Pressure: <span className="float-right font-mono">{formatCurrency(selectedData.buyingPressure)}</span></li>
                    <li>/ Est. Market Cap: <span className="float-right font-mono">{formatCurrency(selectedData.marketCap)}</span></li>
                    <li className="font-bold text-white pt-1 mt-2 border-t border-cyan-800">Price Increase Ratio: <span className="float-right font-mono">{(selectedData.priceChangeRatio * 100).toFixed(4)}%</span></li>
                  </ul>
                </div>

              </div>
            </div>
          )
        })()}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          
          {/* Revenue Distribution */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold mb-4 text-purple-400">Revenue Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={5}
                >
                  {revenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: "12px" }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Sources */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold mb-4 text-purple-400">Revenue Sources</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueBreakdown} margin={{ top: 5, right: 0, left: 0, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${formatLargeNumber(value)}`}
                />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projected Token Price Growth */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 mb-8">
          <h3 className="text-xl font-bold mb-4 text-purple-400">Projected Token Price Growth</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={projectedData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3,3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#10b981" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value.toFixed(5)}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fill="url(#priceGradient)" name="Token Price" />
            </AreaChart>
          </ResponsiveContainer>

          {/* Additional seasonal insights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2">Peak Season Impact</h4>
              <p className="text-sm text-gray-300">
                Summer months show {Math.max(...seasonalMultipliers).toFixed(1)}x ticket volume, creating maximum buying pressure and token burns.
              </p>
            </div>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2">Low Season Strategy</h4>
              <p className="text-sm text-gray-300">
                Winter months provide accumulation opportunities with {Math.min(...seasonalMultipliers).toFixed(1)}x reduced activity but continued staking rewards.
              </p>
            </div>
            <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
              <h4 className="font-semibold text-purple-400 mb-2">Compound Effect</h4>
              <p className="text-sm text-gray-300">
                As price increases, the dollar value of revenue burns fewer tokens, creating a natural, sustainable growth curve.
              </p>
            </div>
          </div>
        </div>

        {/* Key Tokenomics Features */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold mb-4 text-purple-400">Key Tokenomics Features</h3>
          
          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <ul className="space-y-1 text-sm text-gray-300 mb-4">
              <li>• <strong>Mandatory minting:</strong> &quot;$0.03 worth of OPN to mint&quot; each ticket creates base demand</li>
              <li>• <strong>Secondary market capture:</strong> &quot;1–3% (as flat fee) of ticket value&quot; on every resale</li>
              <li>• <strong>Progressive fee structure:</strong> Higher fees for excessive markups protect fans</li>
              <li>• <strong>Deflationary mechanics:</strong> 40% of all revenue permanently burns tokens</li>
              <li>• <strong>Real yield:</strong> 40% distributed to stakers as &quot;real yield to OPN stakers&quot;</li>
            </ul>
            <div className="p-3 bg-slate-800/50 rounded text-xs border-t border-purple-500/20">
              <p className="text-gray-400 italic mb-2">
                <strong>From the tokenomics blog:</strong> &quot;By bringing more tickets onchain through strategic partnerships, we&apos;re creating a powerful network effect. When tickets become NFTs, they unlock innovative payment rails that automatically generate value for the OPN ecosystem.&quot;
              </p>
              <p className="text-gray-400 italic">
                &quot;This pivot transforms OPEN into a high-throughput, low-cost protocol where usage = token demand. With deals like CM.com confirmed and Azerion on the way, we&apos;re seeing real-world validation.&quot;
              </p>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
} 