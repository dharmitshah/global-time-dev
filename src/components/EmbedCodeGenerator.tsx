
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Code, Link as LinkIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type EmbedOption = {
  id: string;
  name: string;
  description: string;
  height: string;
  width: string;
  path: string;
  audience: string;
};

const embedOptions: EmbedOption[] = [
  {
    id: 'converter',
    name: 'Time Zone Converter',
    description: 'Embed our time zone converter tool in your company portal or team dashboard',
    height: '450',
    width: '100%',
    path: '/world-clock-sync-tool',
    audience: 'Global Teams'
  },
  {
    id: 'meeting',
    name: 'Meeting Planner',
    description: 'Help team members schedule international meetings across time zones',
    height: '500',
    width: '100%',
    path: '/meeting-scheduler',
    audience: 'Project Managers'
  },
  {
    id: 'parser',
    name: 'Log Timestamp Parser',
    description: 'Parse and analyze log timestamps from different timezones',
    height: '400',
    width: '100%',
    path: '/time-zone-converter-for-developers',
    audience: 'Developers'
  },
  {
    id: 'utc-ist',
    name: 'UTC to IST Converter',
    description: 'Perfect for teams working between US/Europe and India',
    height: '350',
    width: '100%',
    path: '/utc-to-ist',
    audience: 'US-India Teams'
  }
];

const EmbedCodeGenerator = () => {
  const [selectedTool, setSelectedTool] = useState<EmbedOption>(embedOptions[0]);
  
  const generateIframeCode = () => {
    return `<iframe 
  src="https://syncmyclock.com${selectedTool.path}" 
  width="${selectedTool.width}" 
  height="${selectedTool.height}" 
  style="border: 1px solid #2D3748; border-radius: 8px;" 
  title="${selectedTool.name} - Sync My Clock"
  loading="lazy">
</iframe>
<p style="font-size: 12px; text-align: right;">
  Powered by <a href="https://syncmyclock.com" target="_blank" rel="noopener">Sync My Clock</a>
</p>`;
  };
  
  const generateJsCode = () => {
    return `<div id="sync-my-clock-widget"></div>
<script>
  (function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://syncmyclock.com/widgets/embed.js';
    s.setAttribute('data-widget-type', '${selectedTool.id}');
    s.setAttribute('data-widget-height', '${selectedTool.height}');
    s.async = true;
    d.getElementById('sync-my-clock-widget').appendChild(s);
  })();
</script>`;
  };
  
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(
      () => {
        toast({
          title: "Copied to clipboard!",
          description: "The embed code has been copied to your clipboard.",
        });
      },
      (err) => {
        toast({
          title: "Failed to copy",
          description: "There was an error copying to clipboard.",
          variant: "destructive",
        });
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <Card className="border border-slate-dark bg-navy-light">
      <CardHeader>
        <CardTitle className="text-cyan flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Embed Time Zone Tools in Your Workspace
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate mb-4">
          Integrate our time zone tools directly into your company portal, team dashboard, or development 
          environment. Choose from the options below, copy the embed code, and enhance your workflow with 
          instant timezone conversion and coordination tools.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-light mb-2">
            Select a tool to embed:
          </label>
          <Select 
            value={selectedTool.id} 
            onValueChange={(value) => {
              const selected = embedOptions.find(option => option.id === value);
              if (selected) setSelectedTool(selected);
            }}
          >
            <SelectTrigger className="w-full bg-navy border-slate-dark">
              <SelectValue placeholder="Select a tool" />
            </SelectTrigger>
            <SelectContent className="bg-navy border-slate-dark">
              {embedOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-navy-dark p-4 rounded-md mb-4">
          <h3 className="text-md font-medium mb-2">{selectedTool.name}</h3>
          <p className="text-sm text-slate mb-4">{selectedTool.description}</p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate mb-2">
            <span className="font-medium">Recommended Size:</span> 
            <span>{selectedTool.width} × {selectedTool.height}px</span>
            <span className="sm:ml-auto px-2 py-1 rounded bg-navy text-xs">
              Best for: {selectedTool.audience}
            </span>
          </div>
        </div>
        
        <Tabs defaultValue="iframe" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="iframe">iFrame Embed</TabsTrigger>
            <TabsTrigger value="js">JavaScript Embed</TabsTrigger>
          </TabsList>
          <TabsContent value="iframe" className="mt-4">
            <Textarea 
              className="font-mono text-sm h-40 bg-navy border-slate-dark"
              readOnly
              value={generateIframeCode()}
            />
            <Button 
              onClick={() => copyToClipboard(generateIframeCode())} 
              className="mt-2 w-full bg-cyan text-navy hover:bg-cyan-dark"
            >
              <Code className="mr-2 h-4 w-4" />
              Copy iFrame Code
            </Button>
          </TabsContent>
          <TabsContent value="js" className="mt-4">
            <div className="mb-2 text-sm text-slate">
              JavaScript method (recommended for responsive portals)
            </div>
            <Textarea 
              className="font-mono text-sm h-40 bg-navy border-slate-dark"
              readOnly
              value={generateJsCode()}
            />
            <Button 
              onClick={() => copyToClipboard(generateJsCode())} 
              className="mt-2 w-full bg-cyan text-navy hover:bg-cyan-dark"
            >
              <Code className="mr-2 h-4 w-4" />
              Copy JavaScript Code
            </Button>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-6 bg-slate-dark" />
        
        <div className="text-sm text-slate">
          <h4 className="font-medium mb-2 text-slate-light">Benefits for Teams & Developers:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Integrate time tools directly into your workflow</li>
            <li>Simplify meeting coordination for distributed teams</li>
            <li>Provide easy log timestamp conversion for developers</li>
            <li>No performance impact - our tools load asynchronously</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmbedCodeGenerator;
