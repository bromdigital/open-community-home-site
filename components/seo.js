import Head from 'next/head';

const SEO = ({ title = 'Join the Revolution: Web3 Community for Onchain Ticketing', description = 'Engage with a forward-thinking community at the forefront of onchain ticketing. Utilizing blockchain, we combat scalping, reduce fees, and enhance the creator-fan connection, pioneering web3 solutions in the event industry.' }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="keywords" content="Blockchain ticketing, Web3 community, Onchain ticketing, Ticket scalping, Predatory fees, OPN token, Decentralized events, Fan engagement, Blockchain innovations, Event blockchain technology, Creator-fan ecosystem, Web3 ticketing solutions" />
  </Head>
);

export default SEO;
