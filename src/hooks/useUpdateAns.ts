import { UpdateAnswerModelMutationVariables } from "@/app/graphql/API";
import { updateAnswerModel } from "@/app/graphql/mutations";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import { useMutation} from '@tanstack/react-query';

export const useUpdateAns = () => {
  return useMutation({
    mutationFn: async (input: UpdateAnswerModelMutationVariables) => {
      const res = await client_with_token.graphql({
        query: updateAnswerModel,
        variables: input,
      });
      return res.data?.updateAnswerModel;
    }
  });
};
