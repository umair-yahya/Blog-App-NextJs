import { getById } from "@/services/blog";
import React from "react";
import { getSession } from "next-auth/react";

const blogsId = ({ data }) => {
  return (
    <div>
      <div className="border-solid rounded-lg border-4 border-gray-600 p-3 m-2 break-words">
        <h1 className="text-4xl">{data.title}</h1>
        <h1 className="text-2xl">{data.blog}</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5">
          Delete
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Edit
        </button>
      </div>
    </div>
  );
};

export default blogsId;

export async function getStaticProps({ params }) {
  const { blogsId } = params;
  const data = getById(blogsId);

  return {
    props: {
      data,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          blogsId: "1",
        },
      },
    ],
    fallback: "blocking", // false or "blocking"
  };
}
// export async function getServerSideProps({ req }) {
//   const blogData = getBlogs();
//   const session = await getSession({ req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       blogData,
//     },
//   };
// }
