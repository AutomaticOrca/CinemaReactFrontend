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
