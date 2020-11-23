import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { startPoint = 0 } = args;
      console.log("SeeFeed startPoint: " + startPoint);

      const { user } = request;
      console.log("\n\n------------");
      console.log(user);
      const following = await prisma.user({ id: user.id }).following();
      return prisma.posts({
        skip: startPoint,
        first: 2,
        where: {
          user: {
            id_in: [...following.map((user) => user.id), user.id],
          },
        },

        orderBy: "createdAt_DESC",
      });
    },
  },
};
