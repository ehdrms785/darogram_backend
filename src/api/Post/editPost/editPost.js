import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";
export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      const checkCanEdit = await prisma.$exists.post({
        id,
        user: { id: user.id },
      });
      if (checkCanEdit) {
        if (action === EDIT) {
          return prisma.updatePost({
            data: { caption, location },
            where: { id },
          });
        } else if (action === DELETE) {
          return prisma.deletePost({
            id,
          });
        }
      } else {
        throw Error("You can't edit ");
      }
    },
  },
};
