import React from 'react';
import { Briefcase as BriefcaseBusiness } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-800 to-primary-600">
      <BriefcaseBusiness size={24} className="text-white" />
    </div>
  );
};

export default Logo;