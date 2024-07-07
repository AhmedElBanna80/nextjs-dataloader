import { Suspense } from "react";

import dynamic from "next/dynamic";

const BookList = dynamic(() => import("./bookList"));
export default async function BooksPage() {
  return (
    <Suspense>
      <BookList />
    </Suspense>
  );
}
