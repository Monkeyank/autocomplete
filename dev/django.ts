export const completion: Fig.Spec = {
  name: "django",
  description: "Django Commands",
  generateSpec: async (context, executeShellCommand) => {
    var out = await executeShellCommand("django-admin help --commands");
    var formatted = out.split("\n");
    const subcommands = [];

    out.split("\n").map((command) => {
      subcommands.push({
        name: `${command}`,
        description: "jklsfjd",
      });
    });
    return {
      name: `django`,
      subcommands: [subcommands],
      description: `${subcommands}`,
    };
  },
};
