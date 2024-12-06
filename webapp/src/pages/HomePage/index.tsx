import { FC } from "react";

const HomePage: FC = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Food2Food</h1>
      <p className="text-lg text-center mb-8">Page under construction.</p>
      <a
        href="/about"
        className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Learn More
      </a>
    </main>
  );
};

export default HomePage;
