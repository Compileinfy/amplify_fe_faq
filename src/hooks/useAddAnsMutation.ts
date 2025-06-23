import { CreateAnswerModelMutationVariables } from "@/app/graphql/API";
import { createAnswerModel } from "@/app/graphql/mutations";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import { useMutation } from '@tanstack/react-query';

export const useAddAnsMutation = () =>
  useMutation({
    mutationFn: async (inputVariable: CreateAnswerModelMutationVariables) => {
      try {
        const { data } = await client_with_token.graphql({
          query: createAnswerModel,
          variables: inputVariable,
        });
        console.log("FAQ form created successfully:", data.createAnswerModel);
        return data.createAnswerModel;
      } catch (error) {
        console.error("Error creating FAQ form:", error);
        throw error;
      }
    },
  });


