import { useQueries } from '@tanstack/react-query';
import { client_with_token } from '@/utils/amplifyGenerateClient';
import { listAnswerModels } from '@/app/graphql/queries';

export const useAllAnswers = (userId: string, questions: { questionId: string }[]) => {
  return useQueries({
    queries: questions.map((q) => ({
      queryKey: ['answersByUserAndQuestion', userId, q.questionId],
      queryFn: async () => {
        const { data } = await client_with_token.graphql({
          query: listAnswerModels,
          variables: {
            filter: {
              userId: { eq: userId },
              questionId: { eq: q.questionId },
            },
          },
        });
        return data?.listAnswerModels?.items ?? [];
      },
      enabled: !!userId,
    })),
  });
};
