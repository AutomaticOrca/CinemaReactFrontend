import React, { useState } from "react";

interface RegisterProps {
  onRegister: (email: string, username: string, password: string) => void;
  setIsLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterProps> = ({
  onRegister,
  setIsLoginMode,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onRegister(email, username, password);
  };

  return (
    <>
      {" "}
      <h2 className="text-2xl font-bold mb-4 text-center font-playwrite">
        Register
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label htmlFor="email" className="label">
            <span className="label-text font-raleway">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="username" className="label">
            <span className="label-text font-raleway">Username</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="password" className="label">
            <span className="label-text font-raleway">Password</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="confirmPassword" className="label">
            <span className="label-text font-raleway">Confirm Password</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mt-10">
          <button
            className="font-raleway bg-ritzLightPink rounded-none border-none hover:bg-ritzHeaderPink hover:border-none mb-4"
            type="submit"
          >
            Register
          </button>
          <button
            className="font-raleway text-white rounded-none border-none bg-ritzBgBlue hover:text-ritzBgBlue hover:bg-white hover:border-none"
            onClick={() => setIsLoginMode(true)}
          >
            Already have an account? Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
