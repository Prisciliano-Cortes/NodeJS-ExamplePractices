import { createApp } from "./app.js";

import { MovieModel } from "./models/mongo-database/movie.js";

createApp({ movieModel: MovieModel })