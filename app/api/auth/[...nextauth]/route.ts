import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Create a minimal configuration
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simplified mock authentication
        if (credentials?.username === "user" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Demo User",
            email: "user@example.com",
          }
        }
        return null
      },
    }),
  ],
  secret: "development-secret-key",
  session: {
    strategy: "jwt",
  },
  // Simplified callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  // Debug mode for development
  debug: true,
})

export { handler as GET, handler as POST }

