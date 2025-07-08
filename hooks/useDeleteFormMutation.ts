// hooks/useDeleteFormMutation.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import {
  deleteFormModel,
  deleteQuestionModel,
  deleteAnswerModel,
} from "@/app/graphql/mutations";
import {
  DeleteFormModelMutationVariables,
  DeleteQuestionModelMutationVariables,
  DeleteAnswerModelInput,
} from "@/app/graphql/API";

import {
  listQuestionModels,
  listAnswerModels,
} from "@/app/graphql/queries"; // make sure these are correct imports

export const useDeleteFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: DeleteFormModelMutationVariables) => {
      const formId = variables.input.formId;

      // 1. Fetch all questions for the form
      const questionRes = await client_with_token.graphql({
        query: listQuestionModels,
        variables: {
          filter: { formId: { eq: formId } },
        },
      });

      const questions =
        (questionRes as any)?.data?.listQuestionModels?.items ?? [];

      for (const question of questions) {
        const questionId = question.questionId;

        // 2. Fetch all answers for each question
        const answerRes = await client_with_token.graphql({
          query: listAnswerModels,
          variables: {
            filter: { questionId: { eq: questionId } },
          },
        });

        const answers =
          (answerRes as any)?.data?.listAnswerModels?.items ?? [];

        // 3. Delete each answer
        for (const answer of answers) {
          await client_with_token.graphql({
            query: deleteAnswerModel,
            variables: {
              input: { answerId: answer.answerId } as DeleteAnswerModelInput,
            },
          });
        }

        // 4. Delete the question
        await client_with_token.graphql({
          query: deleteQuestionModel,
          variables: {
            input: { questionId },
            condition: null,
          },
        });
      }

      // 5. Delete the form
      const result = await client_with_token.graphql({
        query: deleteFormModel,
        variables,
      });

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
    },
  });
};

export const useDeleteQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: DeleteQuestionModelMutationVariables) => {
      const res = await client_with_token.graphql({
        query: deleteQuestionModel,
        variables,
      });
      return res.data?.deleteQuestionModel;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["faqDetail"] }),
  });
};
