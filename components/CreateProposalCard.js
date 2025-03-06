import React from 'react';
import Link from 'next/link';

const CreateProposalTile = () => {
  return (
    <div className="bg-none hover:bg-dark flex flex-col rounded-lg border p-4 md:p-6 shadow-md hover:shadow-xl transition-bg duration-300 relative group">
      <h3 className="mb-2 text-lg text-slate-200 font-semibold md:text-xl">Create New Proposal</h3>
      <p className="mb-4 text-slate-200">Start a new proposal for the community to vote on.</p>
      <Link
        href="https://snapshot.org/#/ticketing-revolution.eth/create"
        target="_blank"
      >
        <button className="text-primary">Create Proposal</button>
      </Link>
    </div>
  );
};

export default CreateProposalTile; 