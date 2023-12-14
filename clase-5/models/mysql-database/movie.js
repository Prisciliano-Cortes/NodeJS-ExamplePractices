import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'admin',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()

            const [ genres ] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
            )

            //*** No genre found */
            if (genre.length === 0) {
                return []
            }

            const [{ id }] = genres

            return []
        }

        const [ movies ] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie'
        )

        return movies
    }

    static async getById ({ id }) {
        const [ movies ] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
            [id]
        )

        if (movies.length === 0) {
            return null
        }

        return movies[0]
    }

    static async create ({ input }) {
        const { genre, title, year, duration, director, rate, poster } = input

        const [ uuidResult ] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        try {
            await connection.query(
                `INSERT INTO movie (
                    id, title, year, director, duration, poster, rate
                ) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
                [uuid, title, year, duration, director, rate, poster ]
            )
        } catch (error) {
            throw new Error('Error creating movie')
        }


        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        )

        return movies[0]
    }   

    static async delete ({ id }) {
        
    }

    static async update ({ id, input }) {
        
    }
}