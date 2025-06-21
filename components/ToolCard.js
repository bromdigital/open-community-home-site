import { FiExternalLink, FiCode } from 'react-icons/fi';

const ToolCard = ({ tool }) => (
  <a
    href={tool.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block p-6 rounded-xl transition-all duration-300 ease-in-out bg-zinc-800/50 hover:bg-zinc-700/60 border border-zinc-700 hover:border-opngreen"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <FiCode className="text-opngreen text-2xl"/>
        <h3 className="text-xl font-bold text-white">{tool.name}</h3>
      </div>
      <FiExternalLink className="text-zinc-400 transition-colors duration-300 group-hover:text-white" />
    </div>
    <p className="mt-3 text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">{tool.description}</p>
  </a>
);

export default ToolCard; 