import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            username,
          },
          { email },
        ],
      });
      if (exists) {
        throw Error("This user name / email is already taken");
      }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });
      return true;
    },
    updateAccount: async (_, args) => {
      const { findName, firstName, lastName } = args;
      const user = await prisma.updateUser({
        data: {
          firstName,
          lastName,
        },
        where: {
          username: findName,
        },
      });
      return user;
    },
    deleteAccount: async (_, args) => {
      const { findName } = args;
      const user = await prisma.deleteUser({
        where: {
          username: findName,
        },
      });
    },
  },
};
