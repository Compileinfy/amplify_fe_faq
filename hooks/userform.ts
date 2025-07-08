// src/hooks/useUserAnswers.ts
import { useQuery } from "@tanstack/react-query";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import { listAnswerModels } from "@/app/graphql/queries";
import {
  ListAnswerModelsQuery,
  ListAnswerModelsQueryVariables,
} from "@/app/graphql/API";

export const useUserAnswers = (userId: string | null) => {
  return useQuery({
    queryKey: ["userAnswers", userId],
    enabled: !!userId,
    queryFn: async () => {
      const result = await client_with_token.graphql({
        query: listAnswerModels,
        variables: {
          filter: {
            userId: { eq: userId },
          },
        },
      });
      return result.data?.listAnswerModels?.items ?? [];
    },
  });
};
