import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import express from "express";
import cors from "cors";
import http from "http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./models/userModel.js";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import dotenv from "dotenv";
import dataLoaders from "./dataloaders.js";

mongoose.set("strictQuery", false);

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => {
    console.log("error connection to MongoDB:", err.message);
  });

mongoose.set({ debug: true });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        return { currentUser: null, dataLoaders };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(
    "/",
    expressMiddleware(server, {
      context: async ({ req }) => {
        let currentUser = null;
        const auth = req?.headers?.authorization;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          currentUser = await User.findById(decodedToken.id);
        }
        return { currentUser, dataLoaders };
      },
    })
  );
  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();
