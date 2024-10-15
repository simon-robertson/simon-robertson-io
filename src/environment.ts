export const HOST = process.env.APP_HOST!

export const TURSO_DATABASE = process.env.APP_TURSO_DATABASE!

export const TURSO_TOKEN = process.env.APP_TURSO_TOKEN!

export const IS_DEVELOPMENT = HOST === "http://localhost:4040"

export const IS_PRODUCTION = HOST !== "http://localhost:4040"
