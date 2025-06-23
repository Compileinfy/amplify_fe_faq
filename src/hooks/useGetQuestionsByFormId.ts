// hooks/useGetQuestionsByFormId.ts
import { useQuery } from "@tanstack/react-query";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import { listQuestionModelByFormId } from "@/app/graphql/queries";

export const useQuestionsByFormId = (formId: string | null) => {
  return useQuery({
    queryKey: ["questionsByFormId", formId],
    queryFn: async () => {
      if (!formId) return [];

      const res = await client_with_token.graphql({
        query: listQuestionModelByFormId,
        variables: { formId },
      });

      const items = res.data?.listQuestionModelByFormId?.items || [];

      return items.map((item) => ({
        ...item,
        // ✅ Filter out nulls to match `string[]` type
        options: (item.options || []).filter((opt): opt is string => opt !== null),
      }));
    },
    enabled: !!formId,
  });
};
