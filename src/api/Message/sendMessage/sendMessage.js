import { prisma } from "../../../../generated/prisma-client";
import { CHATROOM_FRAGMENT, MESSAGE_FRAGMENT } from "../../../fragment";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, to } = args;
      let room;
      if (roomId === undefined) {
        if (user.id !== to) {
          room = await prisma
            .createChatRoom({
              participants: {
                connect: [{ id: to }, { id: user.id }],
              },
            })
            .$fragment(CHATROOM_FRAGMENT);
        }
      } else {
        room = await prisma
          .chatRoom({ id: roomId })
          .$fragment(CHATROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("Room not found");
      }
      const getTo = room.participants.filter(
        (participant) => participant.id !== user.id
      )[0];
      return prisma.createMessage({
        to: {
          connect: { id: roomId ? getTo.id : to },
        },
        from: {
          connect: { id: user.id },
        },
        text: message,
        room: {
          connect: {
            id: room.id,
          },
        },
      });
    },
  },
};
