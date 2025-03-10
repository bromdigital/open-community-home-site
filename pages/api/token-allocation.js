/**
 * TOKEN ALLOCATION DATA SOURCE
 * 
 * INSTRUCTIONS FOR UPDATING:
 * 1. To update the data, modify the values in this file
 * 2. Update the distribution values and labels as needed
 * 3. Add, remove or update wallet addresses and amounts
 * 4. Set the lastUpdated timestamp below to the current date
 *    when you make changes, or leave as "auto" to use the current date
 * 
 * The lastUpdated date is shown on the Token Allocation page
 */

// Set to "auto" to use current date, or set manually like "2023-06-15T10:30:00Z"
const LAST_UPDATED = "auto"; 

// Token allocation data
const tokenAllocationData = {
  distribution: {
    labels: ['DAO', 'UGF', 'Staking', 'VC Contracts', 'Circulating'],
    values: [2368974533, 607751000, 5648061554, 794411000, 13507729913],
    colors: [
      '#B8EC0C', // opngreen
      '#C28BE1', // opnpurple
      '#5dbea3',
      '#f7a35c',
      '#7798BF'
    ],
  },
  wallets: [
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
  ],
  totals: {
    vcContracts: '794,411,000.00',
    allTokens: '22,926,928,000.00',
    lastUpdated: LAST_UPDATED === "auto" ? new Date().toISOString() : LAST_UPDATED
  }
};

/**
 * In a real-world scenario, you could:
 * 1. Fetch data from a database
 * 2. Query blockchain directly for wallet balances
 * 3. Use external APIs for token price/market data
 * 4. Implement caching mechanisms
 */

export default function handler(req, res) {
  // You could add authentication here if needed
  
  // Add a small artificial delay to simulate network latency
  // setTimeout(() => {
  //   res.status(200).json(tokenAllocationData);
  // }, 300);
  
  // For now, just return the data immediately
  res.status(200).json(tokenAllocationData);
} 