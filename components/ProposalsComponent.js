import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ProposalCard from './ProposalCard';
import { FiX } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

const ProposalsComponent = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProposal, setCurrentProposal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://hub.snapshot.org/graphql', {
          query: `
            query {
              proposals (
                first: 20,
                skip: 0,
                where: {
                  space_in: ["ticketing-revolution.eth"],
                },
                orderBy: "created",
                orderDirection: desc
              ) {
                id
                title
                body
                choices
                start
                end
                snapshot
                state
                scores
                scores_by_strategy
                scores_total
                scores_updated
                author
                space {
                  id
                  name
                }
                scores_state
                votes
              }
            }
          `
        });

        if (response.data && response.data.data && response.data.data.proposals) {
          const processedProposals = response.data.data.proposals.map(proposal => {
            let derivedStatus = proposal.state;
            if (proposal.state === 'closed') {
              if (proposal.scores && proposal.scores.length > 0) {
                const maxScore = Math.max(...proposal.scores);
                if (maxScore > 0) {
                  derivedStatus = proposal.scores.indexOf(maxScore) === 0 ? 'passed' : 'failed';
                } else {
                  derivedStatus = 'failed';
                }
              }
            }
            return { ...proposal, derivedStatus };
          });
          setProposals(processedProposals);
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setCurrentProposal(null);
  };

  const openModal = (proposal) => {
    setCurrentProposal(proposal);
    setModalOpen(true);
  };

  const getVoteOutcome = (proposal) => {
    if (!proposal.scores || proposal.scores.length === 0 || proposal.scores_total === 0) {
      return 'No votes yet';
    }
    const maxScore = Math.max(...proposal.scores);
    const winningIndex = proposal.scores.indexOf(maxScore);
    return `${proposal.choices[winningIndex]} (${((maxScore / proposal.scores_total) * 100).toFixed(1)}%)`;
  };

  const categorizeProposals = (proposals) => ({
    active: proposals.filter(p => p.state === 'active'),
    completed: proposals.filter(p => p.state !== 'active')
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-xl">Loading proposals...</div>
      </div>
    );
  }

  const { active, completed } = categorizeProposals(proposals);

  return (
    <div className="w-full">
      {/* Active Proposals Section */}
      <div className="mb-16">
        <h2 className="text-5xl font-bold mb-10 text-left bg-clip-text text-transparent bg-gradient-to-r from-white via-opngreen to-opngreen">
          Active Proposals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {active.length > 0 ? (
            active.map((proposal) => (
              <ProposalCard 
                key={proposal.id} 
                proposal={proposal} 
                openModal={openModal}
                getVoteOutcome={getVoteOutcome}
              />
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-white/5 rounded-xl border border-white/10">
              <p className="text-zinc-300 mb-4">No active proposals right now.</p>
              <Link
                href="https://snapshot.org/#/ticketing-revolution.eth"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-2.5 rounded-full text-base font-bold tracking-wider inline-flex items-center gap-2 transition-all duration-300 hover:bg-white/20"
              >
                Create a Proposal
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Completed Proposals Section */}
      <div>
        <h2 className="text-5xl font-bold mb-10 text-left bg-clip-text text-transparent bg-gradient-to-r from-white via-opngreen to-opngreen">
          Completed Proposals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completed.map((proposal) => (
            <ProposalCard 
              key={proposal.id} 
              proposal={proposal} 
              openModal={openModal}
              getVoteOutcome={getVoteOutcome}
            />
          ))}
        </div>
      </div>

      {/* Proposal Modal */}
      {modalOpen && currentProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors">
              <FiX size={24} />
            </button>
            <h2 className="text-3xl font-bold text-white mb-4">{currentProposal.title}</h2>
            <div className="prose prose-invert prose-p:text-zinc-300 max-w-none">
                <ReactMarkdown>{currentProposal.body}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalsComponent; 