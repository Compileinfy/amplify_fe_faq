// hooks/useDeleteFormMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import { deleteFormModel } from "@/app/graphql/mutations";
import { DeleteFormModelMutationVariables } from "@/app/graphql/API";

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
