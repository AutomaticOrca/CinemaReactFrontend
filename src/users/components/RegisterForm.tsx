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
            <span className="label-text font-raleway">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-raleway">Confirm Password</span>
          </label>
          <input
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
