import Layout from '../components/Layout';
import ProposalsComponent from '../components/ProposalsComponent';

export default function Proposals() {
  return (
    <Layout
      title="DAO Proposals - Join the Ticketing Revolution"
      description="View and participate in governance proposals for the OPEN Ticketing Revolution. Your vote shapes the future of onchain ticketing."
      canonicalUrl="/proposals"
    >
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-24 text-center max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-opnpurple via-opngreen to-white">
          DAO Proposals
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-16">
          The Ticketing Revolution is governed by the community. Here you can view and vote on proposals that shape the future of the ecosystem.
        </p>
        <ProposalsComponent />
      </main>
    </Layout>
  );
} 