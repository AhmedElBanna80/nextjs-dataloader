import { PrismaClient } from "@prisma/client";
import dynamic from "next/dynamic";

const db = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const BookCard = dynamic(() => import("./book-card"));

const BookList: React.FC = async () => {
  const books = await db.book.findMany();
  return (
    <div className="w-full">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
