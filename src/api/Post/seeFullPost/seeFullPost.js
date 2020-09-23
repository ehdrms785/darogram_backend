import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST_FRAGMENT } from "../../../fragment";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { postId } = args;
      return prisma.post({ id: postId });
    },
  },
};
