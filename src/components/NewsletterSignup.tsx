
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import useNewsletterApi from "@/hooks/useNewsletterApi";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const { subscribeToNewsletter, isLoading } = useNewsletterApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    const success = await subscribeToNewsletter(email);
    
    if (success) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <div className="bg-navy-dark border border-slate-dark rounded-lg p-6 text-left">
      <h2 className="text-xl font-bold mb-3 text-slate-light">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-slate mb-4">
        Stay updated with the latest time zone tools, tips, and features.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-dark" />
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="bg-cyan hover:bg-cyan-dark text-navy font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
