export const completion: Fig.Spec = {
  name: "django",
  description: "Django Commands",
  generateSpec: async (context, executeShellCommand) => {
    var out = await executeShellCommand("django-admin help --commands");
    var formatted = out.split("\n");
    const subcommands = [];

    try {
      const commandDefinition = JSON.parse(out);

      formatted.map(async (command) => {
        const bob = await executeShellCommand(`django-admin ${command} help`);
        subcommands.push({
          name: command.name,
          description: command.description,
          icon:
            "https://static.djangoproject.com/img/logos/django-logo-negative.png",

          args: Object.keys(command.definition.arguments).map((argumentKey) => {
            const argument = command.definition.arguments[argumentKey];

            return {
              name: argument.name,
              description: argument.description,
              isOptional: !argument.is_required,
            };
          }),
          options: Object.keys(command.definition.options).map((optionKey) => {
            const option = command.definition.options[optionKey];
            const names = [option.name];

            if (option.shortcut !== "") {
              names.push(option.shortcut);
            }

            return {
              name: names,
              description: option.description,
            };
          }),
        });
      });
    } catch (err) {
      //
    }

    return {
      name: "artisan",
      debounce: true,
      subcommands,
    };
  },
};
