import React, { useState } from "react";

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
  setIsLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
}

const SignInForm: React.FC<SignInProps> = ({
  onSignIn,
  setIsLoginMode,
  isSubmitting,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSignIn(email, password);
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center font-playwrite">
        Sign In
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-raleway">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-raleway">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mt-10">
          <button
            className="font-raleway bg-ritzLightPink rounded-none border-none hover:bg-ritzHeaderPink hover:border-none mb-4"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
          <button
            className="font-raleway text-white rounded-none border-none bg-ritzBgBlue hover:text-ritzBgBlue hover:bg-white hover:border-none"
            onClick={() => setIsLoginMode(false)}
          >
            Create a new account
          </button>
        </div>
      </form>
    </>
  );
};
export default SignInForm;
