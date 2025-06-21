import { FiExternalLink, FiStar } from 'react-icons/fi';

const PressCard = ({ article }) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`group block p-6 rounded-xl transition-all duration-300 ease-in-out bg-white/5 backdrop-blur-lg border ${article.featured ? 'border-opngreen/50 hover:border-opngreen' : 'border-white/10 hover:border-white/20'} hover:shadow-2xl hover:shadow-purple-500/10`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold text-white flex-1">{article.title}</h3>
      <FiExternalLink className="text-zinc-400 transition-colors duration-300 group-hover:text-white ml-4" />
    </div>
    <div className="mt-4 flex items-center justify-between text-sm">
        <span className={`font-semibold ${article.featured ? 'text-opngreen' : 'text-zinc-300'}`}>{article.source}</span>
        <div className="flex items-center gap-2">
            {article.featured && <FiStar className="text-yellow-400" />}
            <span className="text-zinc-400">{article.date}</span>
        </div>
    </div>
  </a>
);

export default PressCard; 