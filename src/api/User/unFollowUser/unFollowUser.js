import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unFollowUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { targetUnfollowId } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              disconnect: {
                id: targetUnfollowId,
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
