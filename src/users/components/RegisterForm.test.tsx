import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  it("renders the form with all input fields and buttons", () => {
    render(<RegisterForm onRegister={vi.fn()} setIsLoginMode={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByText("Already have an account? Sign In")
    ).toBeInTheDocument();
  });

  it("calls onRegister with correct values when form is submitted", () => {
    const onRegisterMock = vi.fn();
    render(
      <RegisterForm onRegister={onRegisterMock} setIsLoginMode={vi.fn()} />
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(onRegisterMock).toHaveBeenCalledWith(
      "test@example.com",
      "testuser",
      "password123"
    );
  });

  it("shows an alert when passwords do not match", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<RegisterForm onRegister={vi.fn()} setIsLoginMode={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(alertMock).toHaveBeenCalledWith("Passwords do not match!");
    alertMock.mockRestore();
  });

  it("calls setIsLoginMode when 'Sign In' button is clicked", () => {
    const setIsLoginModeMock = vi.fn();
    render(
      <RegisterForm onRegister={vi.fn()} setIsLoginMode={setIsLoginModeMock} />
    );

    fireEvent.click(screen.getByText("Already have an account? Sign In"));

    expect(setIsLoginModeMock).toHaveBeenCalledWith(true);
  });
});
