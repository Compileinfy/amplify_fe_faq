// hooks/useDeleteFormMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import { deleteFormModel, deleteQuestionModel } from "@/app/graphql/mutations";
import { DeleteFormModelMutationVariables, DeleteQuestionModelMutationVariables } from "@/app/graphql/API";

export const useDeleteFormMutation = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: DeleteFormModelMutationVariables) => {
      const result = await client_with_token.graphql({
        query: deleteFormModel,
        variables,
      });
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faqList'] }),
  });
};

export const useDeleteQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: DeleteQuestionModelMutationVariables) => {
      const res = await client_with_token.graphql({
        query: deleteQuestionModel,
        variables: input,
      });
      return res.data?.deleteQuestionModel;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faqDetail'] }),
  });
};
