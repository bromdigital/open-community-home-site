import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

const getStatusBadge = (state, derivedStatus) => {
    const status = derivedStatus || state;
    let bgColor = 'bg-zinc-700/50';
    let textColor = 'text-zinc-300';
    let label = status;
  
    switch (status) {
      case 'failed':
        bgColor = 'bg-red-900/60';
        textColor = 'text-red-200';
        label = 'Failed';
        break;
      case 'closed':
        bgColor = 'bg-gray-900/60';
        textColor = 'text-gray-200';
        label = 'Closed';
        break;
      case 'active':
        bgColor = 'bg-yellow-700/60';
        textColor = 'text-yellow-200';
        label = 'Active';
        break;
      case 'pending':
        bgColor = 'bg-blue-900/60';
        textColor = 'text-blue-200';
        label = 'Pending';
        break;
      case 'passed':
        bgColor = 'bg-green-900/60';
        textColor = 'text-green-200';
        label = 'Passed';
        break;
      default:
        break;
    }
  
    return (
      <div className={`px-3 py-1 rounded-full ${bgColor} ${textColor} font-semibold text-xs uppercase tracking-wide`}>
        {label}
      </div>
    );
};

const ProposalCard = ({ proposal, openModal, getVoteOutcome }) => {
    
  const truncateText = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
    
  return (
    <div 
        className="group block p-6 rounded-xl transition-all duration-300 ease-in-out bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
        onClick={() => openModal(proposal)}
    >
      <div className="flex items-start justify-between mb-4">
        {getStatusBadge(proposal.state, proposal.derivedStatus)}
        <a 
            href={`https://snapshot.org/#/ticketing-revolution.eth/proposal/${proposal.id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-zinc-400 hover:text-white transition-colors"
        >
            <FiExternalLink />
        </a>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 text-left">{truncateText(proposal.title, 60)}</h3>
      <p className="text-sm text-zinc-400 text-left mb-4 h-12">{truncateText(proposal.body, 100)}</p>
      <div className="border-t border-white/10 pt-4 text-left">
          <p className="text-xs text-zinc-500 mb-1">Winning Choice:</p>
          <p className="font-semibold text-white">{getVoteOutcome(proposal)}</p>
      </div>
    </div>
  );
};

export default ProposalCard; 