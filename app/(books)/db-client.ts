import { PrismaClient } from "@prisma/client";
// import React from "react";

// const dbCached = React.cache(
//   () =>
//     new PrismaClient({
//       log: ["query", "info", "warn", "error"],
//     })
// );

export const db = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
