import React from "react";
import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getBlogs } from "@/services/blog";
import Link from "next/link";

const dashboard = ({ blogData }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const res = await fetch("/api/BlogApi/blogApi", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      alert("Blog Added");
    }
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="w-full max-w-xs mx-auto">
        <div className="bg-slate-100">
          <h1 className="text-3xl font-bold">Dash Board</h1>
        </div>
        <div class="mb-4">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Placeholder"
            {...register("title", {
              required: true,
            })}
          />
        </div>

        <div class="mb-6">
          <textarea
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Whats on your mind"
            {...register("blog", {
              required: true,
            })}
          ></textarea>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            type="submit"
          >
            Submit Post
          </button>
        </div>

        {blogData.map((data) => {
          return (
            <Link href={`/dashboard/${data.id}`}>
              <div className="border-solid rounded-lg border-4 border-gray-600 p-3 m-2 break-words">
                <h1>{data.title}</h1>
                <h1>{data.blog}</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5">
                  Delete
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Edit
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </form>
  );
};

export default dashboard;

export async function getServerSideProps({ req }) {
  const blogData = getBlogs();
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      blogData,
    },
  };
}
