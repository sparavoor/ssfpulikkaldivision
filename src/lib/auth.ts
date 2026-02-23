import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const admin = await prisma.admin.findUnique({
                    where: { username: credentials.username },
                });

                if (!admin) return null;

                const isValid = await bcrypt.compare(credentials.password, admin.password);

                if (!isValid) return null;

                return {
                    id: admin.id,
                    name: admin.username,
                };
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
