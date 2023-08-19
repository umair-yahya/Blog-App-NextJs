import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    if (data.password !== data.repeat) {
      alert("Password Not Match");
    } else {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        alert("Signup SuccessFull");
      }
    }
  };

  return (
    <div class="w-full max-w-xs mx-auto">
      <h1 className="text-3xl p-3 font-bold">SignUp</h1>
      <form
        class="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div class="mb-4">
          <label
            className="block text-gray-700  font-bold mb-2 text-lg"
            for="username"
          >
            Email
          </label>

          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("email", {
              required: true,
              maxLength: 20,
              minLength: 3,
            })}
            type="email"
            required
          />
        </div>
        <label
          className="block text-gray-700  font-bold mb-2 text-lg"
          for="username"
        >
          Firstname
        </label>
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("firstName", {
            required: true,
            maxLength: 20,
            minLength: 3,
          })}
          required
        />

        <label
          className="block text-gray-700  font-bold mb-2 text-lg"
          for="username"
        >
          Lastname
        </label>
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("lastName", {
            required: true,
            maxLength: 20,
            minLength: 1,
          })}
          required
        />
        <div class="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2 text-lg"
            for="password"
          >
            Password
          </label>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("password", {
              required: true,
              maxLength: 8,
            })}
            type="password"
            required
          />
          <label
            class="block text-gray-700 font-bold mb-2 text-lg"
            for="password"
          >
            Repeat Password
          </label>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("repeat", {
              required: true,
              maxLength: 8,
            })}
            type="password"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
