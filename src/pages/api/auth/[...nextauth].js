import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getByEmail, verifyPass } from "@/services/user";

export const authOptions = {
  // Configure one or more authentication providers
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize({ email, password }, req) {
        const user = getByEmail(email);
        if (!user) {
          throw new Error("User Not Found");
        }
        const valid = await verifyPass(user.password, password);
        if (!valid) {
          throw new Error("Incorrect Password");
        }

        return { email };
      },
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
