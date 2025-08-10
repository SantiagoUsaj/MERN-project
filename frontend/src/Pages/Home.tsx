import { useState } from "react";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center pb-8 text-justify">
      <h1 className="text-4xl font-bold mt-8">Welcome to Our Website</h1>
      <p className="mt-4 px-4">
        This is a sample homepage built with React and Tailwind CSS.
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        onClick={() => setClickCount(clickCount + 1)}
      >
        Click me
      </button>
      <p className="mt-4">Button clicked {clickCount} times</p>
    </main>
  );
}
