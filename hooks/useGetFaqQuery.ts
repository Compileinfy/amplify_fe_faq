import { useQuery } from '@tanstack/react-query';
import { client_with_token } from '@/utils/amplifyGenerateClient';
import { listFormModels } from '@/app/graphql/queries';

export const useListFaqQuery = () =>
  useQuery({
    queryKey: ['faqList'],
    queryFn: async () => {
      const { data } = await client_with_token.graphql({
        query: listFormModels,
      });
      return data?.listFormModels?.items || [];
    },
  });
