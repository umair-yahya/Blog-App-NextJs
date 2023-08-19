import Image from "next/image";
import { Inter } from "next/font/google";

import { getBlogs } from "@/services/blog";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogData }) {
  return (
    <>
      <div className="text-4xl bg-slate-600 text-white font-bold mt-3 p-4">
        Good Morning Readers
      </div>
      <div className="text-4xl bg-slate-600 text-white font-bold mt-3 p-4">ALL BLOGS</div>
      {blogData.map((data) => {
        return (
          <div className="border-solid rounded-lg border-4 border-gray-600 p-3 m-2 break-words">
            <h1>{data.title}</h1>
            <h1>{data.blog}</h1>
          </div>
        );
      })}
    </>
  );
}
export async function getServerSideProps({ req }) {
  const blogData = getBlogs();

  return {
    props: {
      blogData,
    },
  };
}
