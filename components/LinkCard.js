import { FiExternalLink } from 'react-icons/fi';

const LinkCard = ({ link }) => (
  <a
    href={link.url}
    target={link.url.startsWith('/') ? '_self' : '_blank'}
    rel="noopener noreferrer"
    className="group block p-6 rounded-xl transition-all duration-300 ease-in-out bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
  >
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-white">{link.name}</h3>
      {!link.url.startsWith('/') && <FiExternalLink className="text-zinc-400 transition-colors duration-300 group-hover:text-white" />}
    </div>
    <p className="mt-2 text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">{link.description}</p>
  </a>
);

export default LinkCard; 