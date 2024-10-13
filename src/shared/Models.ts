/* --- redux --- */
export type TicketType = "NORMAL" | "DISCOUNTED";

// Define the interface for each ticket type (NORMAL, DISCOUNTED)
export interface Ticket {
  quantity: number; // The number of tickets of this type
  unitPrice: number; // The price per ticket of this type
}

// Define the interface for the current purchase
export interface CurrentPurchase {
  originUnitPrice: number; // The base price of a normal ticket before any discounts
  tickets: {
    [key in TicketType]: Ticket;
  };
  status: "PENDING" | "PAID" | "CANCELLED"; // The purchase status, can be one of these three
  sessionId?: string; // Optional: the ID of the session (movie showtime)
  userId?: string; // Optional: the ID of the user making the purchase
}

/* --- API --- */
// ticket api send to backend
export interface ApiTicket {
  type: "NORMAL" | "DISCOUNTED";
  number: number;
  price: number;
}

// send order data from frontend to backend
export interface OrderSent {
  sessionId: string;
  userId: string;
  tickets: ApiTicket[];
}

export interface Session {
  _id: string; // Unique identifier for the session
  movieId: string; // Movie associated with this session
  cinemaId: string; // Cinema associated with this session
  available_seats: number; // Number of available seats
  date: string; // Session date (ISO format) "2024-10-06T20:39:59.703Z"
  time: number; // Session start time (in hours) eg 15 means 3:00pm
  price: number; // Price per ticket eg 25 means 25 dollars
}

export interface Movie {
  _id: string; // Unique identifier for the movie
  plot: string; // Description of the movie plot
  genres: string[]; // Array of genres
  runtime: number; // Runtime in minutes
  cast: string[]; // Array of cast member names
  poster: string | null; // URL to the movie poster
  title: string; // Movie title
  countries: string[]; // Array of countries associated with the movie
  released: string; // Release date (ISO format)
  directors: string[]; // Array of director names
  awards: string; // Awards the movie has won
  year: number; // Year the movie was released
  rated: string; // Movie rating (e.g., "PG")
  rateTomato: number; // Rotten Tomatoes score
  rateImdb: number; // IMDb rating
  rateMetacritic: number; // Metacritic rating
  id: string; // Duplicate of _id (can be removed if redundant)
}

export interface Cinema {
  _id: string; // Unique identifier for the cinema
  name: string; // Name of the cinema
  address: string; // Address of the cinema
  lat: number; // Latitude for the cinema's location
  lng: number; // Longitude for the cinema's location
  imgUrl: string; // URL for the cinema's image
  id: string; // Duplicate of _id (can be removed if redundant)
}

// order data fetched from /api/purchase
export interface Order {
  _id: string;
  sessionId: string;
  userId: string;
  tickets: Ticket[];
  status: string;
  createdAt: string;
}

// order data fetched from get purchase by Id
export interface Purchase {
  _id: string;
  sessionId: {
    _id: string;
    movieId: string;
    cinemaId: string;
    date: string;
    time: number;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  tickets: ApiTicket[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

// get Purchase (Order) By Id
export interface PurchaseGotById {
  purchaseId: string;
  sessionDate: string; // ISO format date string
  sessionTime: string; // Formatted session start time (HH:MM)
  sessionEndTime: string; // Formatted session end time (HH:MM)
  movieName: string; // Movie title
  movieImg: string; // Movie poster
  movieDuration: string; // Formatted movie duration (e.g., "2 hrs 25 mins")
  cinemaName: string; // Cinema name
  userName: string; // User's name
  userEmail: string; // User's email
  tickets: ApiTicket[]; // Array of tickets purchased
  status: "PENDING" | "PAID"; // Purchase status
  createdAt: string; // ISO format date string
}
