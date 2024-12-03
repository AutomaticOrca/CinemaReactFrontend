import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import SignInForm from "./SignInForm";

describe("SignInForm", () => {
  it("renders the form with all input fields and buttons", () => {
    render(
      <SignInForm
        onSignIn={vi.fn()}
        setIsLoginMode={vi.fn()}
        isSubmitting={false}
      />
    );

    // Check form elements
    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create a new account/i })
    ).toBeInTheDocument();
  });

  it("calls onSignIn with email and password when form is submitted", () => {
    const onSignInMock = vi.fn();
    render(
      <SignInForm
        onSignIn={onSignInMock}
        setIsLoginMode={vi.fn()}
        isSubmitting={false}
      />
    );

    // Fill the form
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Check if onSignIn was called with correct values
    expect(onSignInMock).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );
  });

  it("disables the Sign In button when isSubmitting is true", () => {
    render(
      <SignInForm
        onSignIn={vi.fn()}
        setIsLoginMode={vi.fn()}
        isSubmitting={true}
      />
    );

    const signInButton = screen.getByRole("button", { name: /signing in/i });
    expect(signInButton).toBeDisabled();
  });

  it("calls setIsLoginMode when 'Create a new account' button is clicked", () => {
    const setIsLoginModeMock = vi.fn();
    render(
      <SignInForm
        onSignIn={vi.fn()}
        setIsLoginMode={setIsLoginModeMock}
        isSubmitting={false}
      />
    );

    // Click "Create a new account" button
    fireEvent.click(
      screen.getByRole("button", { name: /create a new account/i })
    );

    // Check if setIsLoginMode was called with false
    expect(setIsLoginModeMock).toHaveBeenCalledWith(false);
  });
});
