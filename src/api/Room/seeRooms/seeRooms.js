import { prisma } from "../../../../generated/prisma-client";
import { CHATROOM_FRAGMENT } from "../../../fragment";

export default {
  Query: {
    seeRooms: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma
        .chatRooms({
          where: {
            participants_some: {
              id: user.id,
            },
          },
        })
        .$fragment(CHATROOM_FRAGMENT);
    },
  },
};
