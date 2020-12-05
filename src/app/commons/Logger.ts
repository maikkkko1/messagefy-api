export default class Logger {
  static logError = (origin: string, msg: string) => {
    const environment = process.env.NODE_ENV;

    /** Ignore loggin when is running tests. */
    if (environment !== "test") {
      console.error(`[ERROR][${origin}] - Stacktrace: ${msg}`);
    }
  };
}
