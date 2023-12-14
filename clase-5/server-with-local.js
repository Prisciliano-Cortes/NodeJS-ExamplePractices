import { createApp } from "./app.js";

import { MovieModel } from "./models/local-database/movie.js";

createApp({ movieModel: MovieModel })