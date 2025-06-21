import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiHexagon } from 'react-icons/fi';

const iconMap = {
  FiAlertTriangle: FiAlertTriangle,
  FiCheckCircle: FiCheckCircle,
  FiHexagon: FiHexagon,
};

const InfoCard = ({ item }) => {
  const Icon = iconMap[item.icon];

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
      <div className="flex items-center gap-4 mb-4">
        {Icon && <Icon className="text-opngreen text-3xl" />}
        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
      </div>
      <p className="text-zinc-300 leading-relaxed">{item.content}</p>
    </div>
  );
};

export default InfoCard; 