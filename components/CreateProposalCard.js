import React from 'react';
import Link from 'next/link';

const CreateProposalTile = () => {
  return (
    <div 
      className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 backdrop-blur-xl relative overflow-visible group"
      style={{ background: 'rgba(0,0,0,0.3)' }}
    >
      <div className="absolute inset-[-4px] rounded-lg backdrop-hue-rotate-0 group-hover:backdrop-hue-rotate-60 transition-all duration-300 z-0" />
      <h3 className="mb-4 text-xl text-white font-bold z-10">Create New Proposal</h3>
      <p className="mb-6 text-white/80 text-center z-10">
        Start a new proposal for the community to vote on
      </p>
      <Link
        href="https://snapshot.org/#/ticketing-revolution.eth/create"
        target="_blank"
        className="px-6 py-2 border border-white/40 text-white hover:bg-opngreen/10 transition-all duration-300 rounded-lg z-10"
      >
        Create Proposal
      </Link>
    </div>
  );
};

export default CreateProposalTile; 