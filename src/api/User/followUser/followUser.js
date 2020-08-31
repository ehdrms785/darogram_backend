import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    followUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { targetFollowId } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: {
            id: user.id,
          },
          data: {
            following: {
              connect: {
                id: targetFollowId,
              },
            },
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
