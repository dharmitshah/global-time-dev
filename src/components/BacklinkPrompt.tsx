
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

const BacklinkPrompt = () => {
  return (
    <div className="bg-navy-light border border-slate-dark rounded-lg p-5">
      <h3 className="text-lg font-medium mb-3 text-cyan flex items-center gap-2">
        <Share2 className="h-5 w-5" />
        Share This Tool
      </h3>
      <p className="text-slate mb-4">
        Found Sync My Clock helpful? Help others discover this free tool by sharing it with your team, 
        on social media, or mentioning it on relevant forums and communities.
      </p>
      
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" className="border-slate-dark hover:bg-navy-dark hover:text-cyan">
          <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20free%20timezone%20converter%20for%20developers%20and%20remote%20teams:%20https://syncmyclock.com" 
            target="_blank" rel="noopener noreferrer" className="flex items-center">
            Share on Twitter
          </a>
        </Button>
        <Button variant="outline" size="sm" className="border-slate-dark hover:bg-navy-dark hover:text-cyan">
          <a href="https://www.reddit.com/submit?url=https://syncmyclock.com&title=Free%20Timezone%20Converter%20for%20Developers%20and%20Remote%20Teams" 
            target="_blank" rel="noopener noreferrer" className="flex items-center">
            Share on Reddit
          </a>
        </Button>
        <Button variant="outline" size="sm" className="border-slate-dark hover:bg-navy-dark hover:text-cyan">
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://syncmyclock.com" 
            target="_blank" rel="noopener noreferrer" className="flex items-center">
            Share on LinkedIn
          </a>
        </Button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-dark">
        <p className="text-sm text-slate">
          <strong className="text-cyan">For website owners:</strong> Feel free to link to our tool or embed 
          it on your site. Contact us for a custom embedding solution or widget for your website.
        </p>
      </div>
    </div>
  );
};

export default BacklinkPrompt;
