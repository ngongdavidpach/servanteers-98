
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApiKeyForm } from '@/components/ui/api-key-form';
import { callEdgeFunction } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ApiKeys = () => {
  const [isLoadingOpenAI, setIsLoadingOpenAI] = useState(false);
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);

  const saveApiKey = async (service: string, apiKey: string) => {
    const setLoading = {
      'openai': setIsLoadingOpenAI,
      'stripe': setIsLoadingStripe,
      'resend': setIsLoadingResend,
    }[service];
    
    setLoading(true);
    
    try {
      await callEdgeFunction('save-api-key', { service, apiKey });
      toast.success(`${service.charAt(0).toUpperCase() + service.slice(1)} API key saved successfully!`);
    } catch (error) {
      console.error(`Failed to save ${service} API key:`, error);
      toast.error(`Failed to save ${service} API key. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Manage API Keys</h1>
        <p className="text-muted-foreground mb-6">
          Configure API keys for various services that power your application's features.
          These keys are securely stored in Supabase Secrets.
        </p>
        
        <Tabs defaultValue="openai" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="resend">Resend (Email)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="openai" className="mt-6">
            <ApiKeyForm
              serviceName="OpenAI"
              description="Connect OpenAI to power AI features like chatbots and content generation."
              onSave={(apiKey) => saveApiKey('openai', apiKey)}
              isLoading={isLoadingOpenAI}
            />
          </TabsContent>
          
          <TabsContent value="stripe" className="mt-6">
            <ApiKeyForm
              serviceName="Stripe"
              description="Connect Stripe to process payments and subscriptions securely."
              onSave={(apiKey) => saveApiKey('stripe', apiKey)}
              isLoading={isLoadingStripe}
            />
          </TabsContent>
          
          <TabsContent value="resend" className="mt-6">
            <ApiKeyForm
              serviceName="Resend"
              description="Connect Resend to send beautiful, transactional emails to your users."
              onSave={(apiKey) => saveApiKey('resend', apiKey)}
              isLoading={isLoadingResend}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ApiKeys;
