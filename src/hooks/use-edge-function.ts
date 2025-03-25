
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { callEdgeFunction } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useEdgeFunction<TData = unknown, TPayload = unknown>(
  functionName: string,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    queryKey?: string[];
    enabled?: boolean;
    successMessage?: string;
    errorMessage?: string;
  }
) {
  const [isLoading, setIsLoading] = useState(false);
  
  // For GET-like operations (fetching data)
  const query = useQuery({
    queryKey: options?.queryKey || [functionName],
    queryFn: async () => {
      try {
        return await callEdgeFunction<TData>(functionName);
      } catch (error) {
        if (options?.errorMessage) {
          toast.error(options.errorMessage);
        }
        throw error;
      }
    },
    enabled: options?.enabled !== false,
  });
  
  // For POST/PUT/DELETE-like operations (modifying data)
  const mutation = useMutation({
    mutationFn: async (payload: TPayload) => {
      setIsLoading(true);
      try {
        const result = await callEdgeFunction<TData>(functionName, payload);
        if (options?.successMessage) {
          toast.success(options.successMessage);
        }
        return result;
      } catch (error) {
        if (options?.errorMessage) {
          toast.error(options?.errorMessage || 'Something went wrong');
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error: Error) => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
  
  return {
    // For GET operations
    data: query.data,
    isLoading: query.isLoading || isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    
    // For mutation operations
    mutate: mutation.mutate,
    reset: mutation.reset,
  };
}

// Example usage for fetching data:
// const { data, isLoading } = useEdgeFunction<UserData>('get-user-data', {
//   queryKey: ['user', userId],
//   enabled: !!userId,
//   errorMessage: 'Failed to load user data'
// });

// Example usage for sending data:
// const { mutate, isLoading } = useEdgeFunction<SuccessResponse, PaymentDetails>('process-payment', {
//   onSuccess: (data) => console.log(data),
//   successMessage: 'Payment processed successfully!',
//   errorMessage: 'Payment failed'
// });
// 
// Then call it with: mutate({ amount: 100, ... });
