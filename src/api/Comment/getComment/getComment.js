import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getComment: async (_, args) => {
      const { commentId } = args;
      return prisma.comment({ id: commentId });
    },
  },
};
