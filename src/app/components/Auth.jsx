"use client";
import { Router, useRouter } from "next/navigation";

const { useAuth } = require("@/contexts/auth");
const { useState, useEffect } = require("react");

const Auth = () => {
  const auth = useAuth(); //Ger tillgång till alla value.
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(true);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      if (isRegister) {
        const name = e.target[2].value;
        auth.actions.register(email, password, name);
      } else {
        auth.actions.login(email, password);
        setError(error.message || "Wrong username or password!");
      }
    } catch (error) {
      setError(error.message || "Wrong username or password!");
    }
  };
  useEffect(() => {
    if (auth.isLoggedIn) {
      router.push("/");
    }
  }, [auth.isLoggedIn, router]);

  if (auth.isLoggedIn) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-400 mb-10">
        Speak mellon and enter
      </h1>
      <h2 className="text-2ml font-bold text-grey-500 mb-10">or log in</h2>
      <form
        className="flex flex-col items-center justify-center bg-blue-300 shadow-lg p-8 rounded-lg gap-2  h-[400px]"
        onSubmit={onSubmit}
      >
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            className="p-2 m-2 border border-gray-300 rounded-md"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="p-2 m-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 m-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full p-2 m-2 border bg-yellow-300 border-gray-300 rounded-md hover:bg-blue-600 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <button
          type="button"
          className="w-full p-2 m-2 border bg-yellow-300 border-gray-300 rounded-md hover:bg-blue-600 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have a Account?" : "Create new Account"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
        {/* Display error */}
      </form>
    </div>
  );
};

export default Auth;
