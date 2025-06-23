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


// import { useUserGroup } from '@/hooks/useUserGroup'; 
// const { getUserGroup } = useUserGroup();
// const group = await getUserGroup(); 
//       console.log("group: ", group);
      