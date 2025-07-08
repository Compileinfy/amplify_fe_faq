import { useMutation } from "@tanstack/react-query";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import { createFormModel, createQuestionModel } from "@/app/graphql/mutations";
import { CreateFormModelMutationVariables, CreateQuestionModelMutationVariables } from "@/app/graphql/API";

// export const useAddFaqMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async()
//     })
// }

// export const useAddFaqMutation = () =>
//   useMutation({
//     mutationFn: async (inputVariable: CreateFormModelMutationVariables) => {
//       return client_with_token.graphql({
//         query: createFormModel,
//         variables: inputVariable,
//       });
//     },
//   });

export const useAddFaqMutation = () =>
  useMutation({
    mutationFn: async (inputVariable: CreateFormModelMutationVariables) => {
      try {
        const { data } = await client_with_token.graphql({
          query: createFormModel,
          variables: inputVariable,
        });
        return data.createFormModel;
      } catch (error) {
        console.error("Error creating FAQ form:", error);
        throw error;
      }
    },
  });


  export const useAddQuestionMutation = () =>
  useMutation({
    mutationFn: async (input: CreateQuestionModelMutationVariables) => {
      try {
        const { data } = await client_with_token.graphql({
          query: createQuestionModel,
          variables: input,
        });
        return data.createQuestionModel;
      } catch (error) {
        console.error("Error creating question:", error);
        throw error;
      }
    },
  });
