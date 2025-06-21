import Layout from '../components/Layout';
import { siteData } from '../data/community-data';
import { pressData } from '../data/press';
import { toolsData } from '../data/tools';
import Link from 'next/link';
import LinkCard from '../components/LinkCard';
import PressCard from '../components/PressCard';
import ToolCard from '../components/ToolCard';
import InfoCard from '../components/InfoCard';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <Layout
      title="OPEN Community Hub - Join the Ticketing Revolution"
      description="The official community hub for the OPEN Ticketing Revolution. Find resources, developer tools, news, and get involved with the mission to bring ticketing onchain."
      canonicalUrl="/"
    >
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 text-center max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="w-full text-center py-20 md:py-28">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-opnpurple via-opngreen to-white">
            {siteData.main.title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-10">
            {siteData.main.description}
          </p>
          <Link
            href="#join-community"
            className="group bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-full text-xl font-bold tracking-wider inline-flex items-center gap-3 transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <span>Join the Community</span>
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="w-full mt-16 space-y-20">
          
          {/* Education Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData.education.map((item, index) => (
              <InfoCard key={index} item={item} />
            ))}
          </div>

          {/* About Section */}
          {siteData.about && (
            <div className="text-left bg-zinc-900/50 p-8 rounded-2xl border border-white/10">
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-opngreen to-opngreen">
                {siteData.about.title}
              </h2>
              <p className="text-lg text-zinc-300 max-w-4xl mb-8">{siteData.about.content}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteData.about.links.map((link, linkIndex) => (
                  <LinkCard key={linkIndex} link={link} />
                ))}
              </div>
            </div>
          )}
          
          {/* Tools Section */}
          {toolsData.length > 0 && (
            <div>
              <h2 className="text-5xl font-bold mb-10 text-left bg-clip-text text-transparent bg-gradient-to-r from-white via-opngreen to-opngreen">
                Tools for the Revolution
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toolsData.map((tool, index) => (
                  <ToolCard key={index} tool={tool} />
                ))}
              </div>
            </div>
          )}

          {/* Press Section */}
          {pressData.length > 0 && (
            <div>
              <h2 className="text-5xl font-bold mb-10 text-left bg-clip-text text-transparent bg-gradient-to-r from-white via-opngreen to-opngreen">
                In The News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pressData.map((article, index) => (
                  <PressCard key={index} article={article} />
                ))}
              </div>
            </div>
          )}

          {/* Action Sections */}
          {siteData.actionSections.map((section, index) => (
            <div key={index} id={section.title.toLowerCase().replace(/ /g, '-')}>
              <h2 className="text-5xl font-bold mb-10 text-left bg-clip-text text-transparent bg-gradient-to-r from-white via-opngreen to-opngreen">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.links.map((link, linkIndex) => (
                  <LinkCard key={linkIndex} link={link} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
