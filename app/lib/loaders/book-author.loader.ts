import { db } from "@/app/(books)/db-client";
import { Author, User } from "@prisma/client";
import { AbstractDataLoader } from "./data-loader-base";
import React from "react";

interface AuthorWithUser extends Author {
  user: User;
}
class BookAuthorLoader extends AbstractDataLoader<number, AuthorWithUser> {
  batchLoadFunction = async (keys: readonly number[]) => {
    const authors = await db.author.findMany({
      where: {
        id: {
          in: [...keys],
        },
      },
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return this.groupByKeySingle(
      authors as AuthorWithUser[],
      (author) => author.id,
      [...keys]
    );
  };
}

export const bookAuthorLoader = React.cache(() => new BookAuthorLoader())();
