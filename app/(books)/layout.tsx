import { FC, PropsWithChildren } from "react";

const BooksLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="min-h-screen bg-black text-white flex flex-col">
    <header className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold">Books</h1>
      </div>
    </header>
    <main className="flex-grow container mx-auto py-8">{children}</main>
    <footer className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <p>© 2023 Books App. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

export default BooksLayout;
