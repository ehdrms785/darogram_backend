import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addRecomment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, commentId } = args;
      const { user } = request;
      const recomment = await prisma.createRecomment({
        user: {
          connect: {
            id: user.id,
          },
        },
        parentComment: {
          connect: {
            id: commentId,
          },
        },
        text,
      });
      return recomment;
    },
  },
};
