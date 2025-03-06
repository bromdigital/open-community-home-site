import Layout from '../components/Layout';
import ProposalsComponent from '../components/ProposalsComponent';

export default function Proposals() {
  return (
    <Layout
      title="OPEN Community - DAO Proposals"
      description="View and participate in governance proposals for the OPEN ticketing ecosystem. Vote on key decisions that shape the future of decentralized ticketing."
      canonicalUrl="/proposals"
    >
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-8 text-center max-w-6xl mx-auto">
        <img src="/logo.png" alt="Logo" className="mb-6 sm:mb-10 max-h-16 sm:max-h-20" />
        
        <ProposalsComponent />
      </main>
    </Layout>
  );
} 