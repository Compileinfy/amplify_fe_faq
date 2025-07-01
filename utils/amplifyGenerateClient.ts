import { generateClient } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";

export const client_with_token = generateClient({
  headers: async () => {
    const session = await fetchAuthSession();
    return {
      authorization: String(session?.tokens?.idToken ?? ""),
    };
  },
 });

export const client = generateClient();
