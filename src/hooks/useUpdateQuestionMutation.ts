// hooks/useUpdateQuestionMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client_with_token } from '@/utils/amplifyGenerateClient';
import { updateQuestionModel } from '@/app/graphql/mutations';
import { UpdateQuestionModelMutationVariables } from '@/app/graphql/API';

export const useUpdateQuestionMutation = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: UpdateQuestionModelMutationVariables) => {
      const result = await client_with_token.graphql({
        query: updateQuestionModel,
        variables,
      });
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faqDetail'] }),

  });
};
