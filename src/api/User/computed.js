import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    postsCount: ({ id }) =>
      prisma
        .postsConnection({
          where: { user: { id } },
        })
        .aggregate()
        .count(),
    followingCount: ({ id }) =>
      prisma
        .usersConnection({
          where: { followers_some: { id } },
        })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({
          where: { followers_some: { id } },
        })
        .aggregate()
        .count(),
    isFollowing: (parent, _, { request }) => {
      const { user } = request; // request (me)
      const { id: parentId } = parent; // ask (SeeUser(id: "id")) 값의 id
      // console.log(user.id);
      // console.log(parentId);
      return prisma.$exists.user({
        AND: [
          { id: parentId },
          {
            followers_some: {
              id: user.id,
            },
          },
        ],
      });
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
