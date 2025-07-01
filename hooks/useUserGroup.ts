import { listUserModels } from '@/app/graphql/queries';
import { client_with_token } from '@/utils/amplifyGenerateClient';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useCallback } from 'react';

/**
 * Hook to fetch the Cognito user groups from the auth session.
 * @returns An async function that resolves to the user's first group or null.
 */
export const useUserGroup = () => {
  const getUserGroup = useCallback(async (): Promise<string | null> => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken;
      const groups = token?.payload["cognito:groups"];

      if (Array.isArray(groups) && groups.length > 0) {
        console.log("groups: ", groups[0]);
        return String(groups[0]);
      } else {
        console.log("No groups found for user.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user group:", error);
      return null;
    }
  }, []);

  return { getUserGroup };
};


export const useListUsersQuery = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["userList"],
    enabled,
    queryFn: async () => {
      const res = await client_with_token.graphql({
        query: listUserModels,
      });

      return res?.data?.listUserModels?.items || [];
    },
  });
};
      