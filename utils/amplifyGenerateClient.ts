import { generateClient } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
// import { Amplify } from "aws-amplify";
// import outputs from "@/amplify_outputs.json";

// Amplify.configure(outputs);

export const client_with_token = generateClient({
  headers: async () => {
    const session = await fetchAuthSession();
    return {
      authorization: String(session?.tokens?.idToken ?? ""),
    };
  },
 });

// export const client = generateClient();
