import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book } from "@prisma/client";
import { bookAuthorLoader } from "../lib/loaders/book-author.loader";

interface BookCardProps {
  book: Book;
}
export const dynamic = "force-dynamic";

const BookCard: React.FC<BookCardProps> = async ({ book }) => {
  const author = await bookAuthorLoader.load(book.authorId);
  return (
    <Card key={book.id} className="w-full ">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.authorId}</CardDescription>
      </CardHeader>
      <CardContent>book written by {author?.user?.name}</CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

export default BookCard;
