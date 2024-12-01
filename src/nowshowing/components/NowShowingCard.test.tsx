import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Session } from "../../shared/Models";
import NowShowingCard from "../components/NowShowingCard";

// Mock API Functions
vi.mock("../../shared/utils/api", () => ({
  fetchMovieById: vi.fn(),
  fetchCinemaById: vi.fn(),
}));

// Mock navigate function from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

import { fetchMovieById, fetchCinemaById } from "../../shared/utils/api";
import { useNavigate } from "react-router-dom";

describe("NowShowingCard Component", () => {
  const mockNavigate = vi.fn();
  const sessionData: Session = {
    movieId: "123",
    cinemaId: "456",
    date: "2024-12-01",
    time: 18,
    _id: "session1",
    available_seats: 50,
    price: 20,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("renders successfully with movie and cinema data", async () => {
    vi.mocked(fetchMovieById).mockResolvedValue({
      title: "Test Movie",
      runtime: 120,
      genres: ["Drama"],
      directors: ["Director One"],
      cast: ["Actor A", "Actor B"],
      plot: "This is a test plot.",
      poster: "http://test.com/poster.jpg",
    });

    vi.mocked(fetchCinemaById).mockResolvedValue({
      name: "Test Cinema",
    });

    render(
      <MemoryRouter>
        <NowShowingCard sessionData={sessionData} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Movie")).toBeInTheDocument();
      expect(
        screen.getByText((content, element) => {
          const hasText =
            content.includes("2 hrs") && content.includes("Drama");
          const isCorrectElement = element?.tagName.toLowerCase() === "p";
          return hasText && isCorrectElement;
        })
      ).toBeInTheDocument();
      expect(screen.getByText("Director One")).toBeInTheDocument();
      expect(screen.getByText("Test Cinema")).toBeInTheDocument();
    });
  });

  it("displays an error message if fetching data fails", async () => {
    vi.mocked(fetchMovieById).mockRejectedValue(
      new Error("Failed to fetch movie")
    );
    vi.mocked(fetchCinemaById).mockRejectedValue(
      new Error("Failed to fetch cinema")
    );

    render(
      <MemoryRouter>
        <NowShowingCard sessionData={sessionData} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          (content) =>
            content.includes("Sorry, something wrong happend") &&
            content.includes("Error fetching session by id")
        )
      ).toBeInTheDocument();
    });
  });

  it("navigates to session details page on button click", async () => {
    vi.mocked(fetchMovieById).mockResolvedValue({
      title: "Test Movie",
      runtime: 120,
      genres: ["Drama"],
      directors: ["Director One"],
      cast: ["Actor A", "Actor B"],
      plot: "This is a test plot.",
      poster: "http://test.com/poster.jpg",
    });

    vi.mocked(fetchCinemaById).mockResolvedValue({
      name: "Test Cinema",
    });

    render(
      <MemoryRouter>
        <NowShowingCard sessionData={sessionData} />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Test Movie"));

    const button = screen.getByText("View Details");
    button.click();

    expect(mockNavigate).toHaveBeenCalledWith("/session/session1");
  });
});
