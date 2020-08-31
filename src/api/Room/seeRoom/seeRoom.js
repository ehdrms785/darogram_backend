import { prisma } from "../../../../generated/prisma-client";
import { CHATROOM_FRAGMENT } from "../../../fragment";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const chatRoom = await prisma.$exists.chatRoom({
        participants_some: {
          id: user.id,
        },
      });
      if (chatRoom) {
        return prisma.chatRoom({ id }).$fragment(CHATROOM_FRAGMENT);
      } else {
        throw Error("Can not see chatRoom");
      }
    },
  },
};
