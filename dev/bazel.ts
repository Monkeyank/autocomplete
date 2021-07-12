export const completion: Fig.Spec = {
  name: "bazel",
  description: "",
  subcommands: [
    {
      name: "analyze-profile",
      description: "Analyzes build profile data",
    },
    {
      name: "aquery",
      description: "Executes a query on the post-analysis action graph",
    },
    {
      name: "build",
      description: "Builds the specified targets",
    },
    {
      name: "canonicalize-flags",
      description: "Canonicalize Bazel flags",
    },
    {
      name: "clean",
      description: "Removes output files and optionally stops the server",
    },
    {
      name: "cquery",
      description: "Executes a post-analysis dependency graph query",
    },
    {
      name: "dump",
      description: "Dumps the internal state of the Bazel server process",
    },
    {
      name: "help",
      description: "Prints help for commands, or the index",
    },
    {
      name: "info",
      description: "Displays runtime info about the bazel server",
    },
    {
      name: "fetch",
      description: "Fetches all external dependencies of a target",
    },
    {
      name: "mobile-install",
      description: "Installs apps on mobile devices",
    },
    {
      name: "query",
      description: "Executes a dependency graph query",
    },
    {
      name: "run",
      description: "Runs the specified target",
    },
    {
      name: "shutdown",
      description: "Stops the Bazel server",
    },
    {
      name: "test",
      description: "Builds and runs the specified test targets",
    },
    {
      name: "version",
      description: "Prints version information for Bazel",
    },
  ],
  options: [],
  // Only uncomment if bazel takes an argument
  // args: {}
};
