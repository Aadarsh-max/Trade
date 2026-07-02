import { Sparkles } from 'lucide-react';
import AIChatWidget from '../features/ai/components/AIChatWidget';
import PortfolioInsights from '../features/ai/components/PortfolioInsights';

const AIPage = () => {

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/12">
          <Sparkles size={18} className="text-accent" />
        </span>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-textprimary">AI assistant</h1>
          <p className="text-xs text-textsecondary">Insights and answers from your portfolio</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
        <AIChatWidget />
        <PortfolioInsights />
      </div>
    </div>
  );
};

export default AIPage;