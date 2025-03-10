import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import CreateProposalTile from './CreateProposalCard';

const ProposalsComponent = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProposal, setCurrentProposal] = useState({});

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
          // Process proposal data to determine if closed proposals passed or failed
          const processedProposals = response.data.data.proposals.map(proposal => {
            // Add a derived status property that indicates pass/fail for closed proposals
            let derivedStatus = proposal.state;
            
            if (proposal.state === 'closed') {
              // Check if we have scores to determine if it passed or failed
              if (proposal.scores && proposal.scores.length > 0) {
                // Find the highest score
                const maxScore = Math.max(...proposal.scores);
                const maxIndex = proposal.scores.indexOf(maxScore);
                
                // If the highest score is at index 0 and it's not 0, consider it as passed
                // This assumes the first choice is usually "Yes" or "For" - adjust as needed
                if (maxIndex === 0 && maxScore > 0) {
                  derivedStatus = 'passed';
                } else if (maxScore > 0) {
                  derivedStatus = 'failed';
                }
                
                // If all scores are 0, it's a failed proposal due to no participation
                if (proposal.scores_total === 0 || maxScore === 0) {
                  derivedStatus = 'failed';
                }
              }
            }
            
            return {
              ...proposal,
              derivedStatus
            };
          });
          
          setProposals(processedProposals);
          console.log("Proposals with derived status:", processedProposals);
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const truncateText = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (proposal) => {
    setCurrentProposal(proposal);
    setModalOpen(true);
  };

  // Move these helper functions outside the main component
  const getBorderColorClass = (state, derivedStatus) => {
    // Use derived status if available, otherwise fall back to state
    const status = derivedStatus || state;
    
    switch (status) {
      case 'failed':
        return 'border-red-500';
      case 'active':
        return 'border-yellow-500';
      case 'pending':
        return 'border-blue-500';
      case 'passed':
        return 'border-green-500';
      default:
        return 'border-white/40';
    }
  };

  const getStatusBadge = (state, derivedStatus) => {
    // Use derived status if available, otherwise fall back to state
    const status = derivedStatus || state;
    
    let bgColor = 'bg-white/10';
    let textColor = 'text-white/70';
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
      <div className={`px-3 py-1.5 rounded-full ${bgColor} ${textColor} font-semibold text-xs uppercase tracking-wide`}>
        {label}
      </div>
    );
  };

  // Add this helper function to categorize proposals
  const categorizeProposals = (proposals) => {
    return {
      active: proposals.filter(p => p.state === 'active'),
      completed: proposals.filter(p => p.state !== 'active')
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-xl open-font">Loading proposals...</div>
      </div>
    );
  }

  const { active, completed } = categorizeProposals(proposals);

  return (
    <div className="w-full mt-6 sm:mt-10">
      <h1 className='open-font text-white text-3xl sm:text-5xl uppercase mb-4 sm:mb-8'>
        DAO Proposals
      </h1>
      
      {/* Active Proposals Section */}
      <div className="mb-12">
        <h2 className="text-white text-2xl sm:text-3xl mb-4">Active Proposals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {active.length > 0 ? (
            active.map((proposal, index) => (
              <ProposalCard 
                key={index} 
                proposal={proposal} 
                openModal={openModal}
                getBorderColorClass={getBorderColorClass}
                getStatusBadge={getStatusBadge}
                truncateText={truncateText}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-white/80">
              No active proposals at the moment
            </div>
          )}
        </div>
      </div>

      {/* Completed Proposals Section */}
      <div>
        <h2 className="text-white text-2xl sm:text-3xl mb-4">Completed Proposals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {completed.map((proposal, index) => (
            <ProposalCard 
              key={index} 
              proposal={proposal} 
              openModal={openModal}
              getBorderColorClass={getBorderColorClass}
              getStatusBadge={getStatusBadge}
              truncateText={truncateText}
            />
          ))}
        </div>
      </div>

      {/* Create Proposal Tile */}
      <div className="mt-12">
        <div 
          className="rounded-lg p-6 flex flex-col items-center justify-center border-2 border-white/40 transition-all duration-300 ease-in-out hover:border-white/60 backdrop-blur-xl relative h-full overflow-hidden group"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <h3 className="mb-4 text-xl text-white font-bold">Create Proposal</h3>
          <p className="mb-6 text-white/80 text-center">
            Start by discussing your proposal on our Discord community
          </p>
          <Link
            href="https://discord.gg/5zDK5FvP"
            target="_blank"
            className="mt-auto px-6 py-2 border border-white/40 hover:border-white text-white hover:bg-white/10 transition-all duration-300 rounded-lg"
          >
            Join Discord Discussion
          </Link>
        </div>
      </div>

      {/* Modal for proposal details */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className={`bg-black/90 border-2 ${getBorderColorClass(currentProposal.state, currentProposal.derivedStatus)} p-8 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white">{currentProposal.title}</h3>
              {getStatusBadge(currentProposal.state, currentProposal.derivedStatus)}
            </div>
            
            <div className="text-white/80 whitespace-pre-line mb-6">{currentProposal.body}</div>
            
            {/* Display voting choices and results if available */}
            {currentProposal.choices && currentProposal.choices.length > 0 && (
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">Voting Results:</h4>
                <div className="space-y-2">
                  {currentProposal.choices.map((choice, i) => {
                    const score = currentProposal.scores?.[i] || 0;
                    const totalScore = currentProposal.scores_total || 1; // Prevent division by zero
                    const percentage = (score / totalScore) * 100 || 0;
                    
                    return (
                      <div key={i} className="text-white/80">
                        <div className="flex justify-between mb-1">
                          <span>{choice}</span>
                          <span>{score.toFixed(2)} ({percentage.toFixed(2)}%)</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white/50" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-between items-center">
              <span className="text-white/60">
                ID: <span className="text-white/80">{currentProposal.id?.substring(0, 8)}...</span>
              </span>
              
              <div className="flex gap-4">
                <button onClick={closeModal} className="text-white/80 hover:text-white">
                  Close
                </button>
                
                <Link
                  href={`https://snapshot.org/#/ticketing-revolution.eth/proposal/${currentProposal.id}`}
                  target="_blank"
                  className="text-white hover:text-white/80 border-b border-white/40 pb-1"
                >
                  View on Snapshot
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ProposalCard component can now access these functions
const ProposalCard = ({ 
  proposal, 
  openModal, 
  getBorderColorClass, 
  getStatusBadge,
  truncateText 
}) => {
  return (
    <div 
      className={`rounded-lg p-6 flex flex-col items-start justify-start border-2 ${getBorderColorClass(proposal.state, proposal.derivedStatus)} transition-all duration-300 ease-in-out hover:border-opacity-100 backdrop-blur-xl relative overflow-hidden group`}
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="absolute top-2 right-2">
        {getStatusBadge(proposal.state, proposal.derivedStatus)}
      </div>
      
      <h3 className="mb-2 text-lg text-white font-bold md:text-xl mt-4 pr-16">
        {proposal.title}
      </h3>
      
      <p className="mb-6 text-white/80 text-sm">
        {truncateText(proposal.body, 100)}
      </p>
      
      <div className="mt-auto w-full flex justify-between items-center">
        <Link
          href={`https://snapshot.org/#/ticketing-revolution.eth/proposal/${proposal.id}`}
          target="_blank"
          className="text-white hover:text-white/80 border-b border-white/40 pb-1 transition-all"
        >
          View on Snapshot
        </Link>
        
        <button 
          onClick={() => openModal(proposal)} 
          className="text-white/70 hover:text-white transition-all"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ProposalsComponent; 