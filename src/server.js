import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middleware";
import "./passport";
const PORT = process.env.PORT || 4000;

// context = resolver 사이에서 정보를 공유할 때 사용
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
