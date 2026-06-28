import AIChatWidget from '../features/ai/components/AIChatWidget';
import PortfolioInsights from '../features/ai/components/PortfolioInsights';

const AIPage = () => {
  return (
    <div>
      <h1 className="text-xl font-medium text-textprimary mb-6">AI assistant</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <AIChatWidget />
        <PortfolioInsights />
      </div>
    </div>
  );
};

export default AIPage;