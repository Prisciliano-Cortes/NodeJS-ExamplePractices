import { createApp } from "./app.js";

import { MovieModel } from "./models/mysql-database/movie.js";

createApp({ movieModel: MovieModel })