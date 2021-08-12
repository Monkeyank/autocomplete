const jsonGenerator: Fig.Generator = {
  template: "filepaths",
  filterTemplateSuggestions: function (paths) {
    return paths
      .filter((file) => {
        if (typeof file.name === "string") {
          return file.name.endsWith(".json") || file.name.endsWith("/");
        }
        return false;
      })
      .map((file) => {
        const isJSONFile =
          typeof file.name === "string" && file.name.endsWith(".json");

        return {
          ...file,
          priority: isJSONFile && 76,
        };
      });
  },
};

export const completion: Fig.Spec = {
  name: "conan",
  description: "C/C++ package manager",
  subcommands: [
    {
      name: "install",
      description:
        "Installs the requirements specified in a recipe (conanfile.py or conanfile.txt)",
      args: [
        {
          name: "path_or_reference",
          description:
            "Path to a folder containing a recipe (conanfile.py or conanfile.txt) or to a recipe file. e.g., ./my_project/conanfile.txt",
          template: ["folders", "filepaths"],
        },
        {
          name: "reference",
          description:
            "Reference for the conanfile path of the first argument: user/channel, version@user/channel or pkg/version@user/channel(if name or version declared in conanfile.py, they should match)",
        },
      ],
      options: [
        {
          name: ["-h", "--help"],
          description: "Show this help message and exit",
        },
        {
          name: ["-g", "--generator"],
          description: "Generators to use",
          args: {
            name: "GENERATOR",
          },
        },
        {
          name: ["-if", "--install-folder"],
          description:
            "Use this directory as the directory where to put the generatorfiles. e.g., conaninfo/conanbuildinfo.txt",
          args: {
            name: "INSTALL_FOLDER",
            template: "folders",
          },
        },
        {
          name: ["-m", "--manifests"],
          description:
            "Install dependencies manifests in folder for later verify. Default folder is .conan_manifests, but can be changed",
          args: {
            name: "manifests",
            template: "folders",
            isOptional: true,
            default: ".conan_manifests",
          },
        },
        {
          name: ["-mi", "--manifests-interactive"],
          description:
            "Install dependencies manifests in folder for later verify, asking user for confirmation. Default folder is .conan_manifests, but can be changed",
          args: {
            name: "MANIFESTS_INTERACTIVE",
            template: "folders",
            isOptional: true,
            default: ".conan_manifests",
          },
        },
        {
          name: ["-v", "--verify"],
          description: "Verify dependencies manifests against stored ones",
          args: {
            name: "Verify",
            isOptional: true,
          },
        },
        {
          name: "--no-imports",
          description: "Install specified packages but avoid running imports",
        },
        {
          name: "--build-require",
          description: "The provided reference is a build-require",
        },
        {
          name: ["-j", "--json"],
          description:
            "Path to a json file where the install information will be written",
          args: {
            name: "JSON",
            generators: jsonGenerator,
          },
        },
        {
          name: ["-b", "--build"],
          description:
            "Specify which packages to build from source. Combining multiple '--build' options on one command line is allowed. For dependencies, the optional 'build_policy' attribute in their conanfile.py takes precedence over the command line parameter",
          args: {
            name: "build",
            isOptional: true,
            suggestions: [
              {
                name: "never",
                description:
                  "Disallow build for all packages, use binary packages or fail if a binary package is not found. Cannot be combined with other '--build' options",
              },
              {
                name: "missing",
                description:
                  "Build packages from source whose binary package is not found",
              },
              {
                name: "outdated",
                description:
                  "Build packages from source whose binary package was not generated from the latest recipe or is not found",
              },
              {
                name: "cascade",
                description:
                  "Build packages from source that have at least one dependency being built from source",
              },
            ],
          },
        },
        {
          name: ["-r", "--remote"],
          description: "Look in the specified remote server",
          args: {
            name: "remote",
          },
        },
        {
          name: ["-u", "--update"],
          description:
            "Will check the remote and in case a newer version  and/or revision of the dependencies exists there, it will install those in the local cache. When using version ranges, it will install the latest version that satisfies the range. Also, if using revisions, it will update to the latest revision for the resolved version range",
        },
        {
          name: ["-l", "--lockfile"],
          description: "Path to a lockfile",
          args: {
            name: "LOCKFILE",
            template: "filepaths",
          },
        },
        {
          name: "--lockfile-out",
          description: "Filename of the updated lockfile",
          args: {
            name: "LOCKFILE_OUT",
            template: "filepaths",
          },
        },
        {
          name: ["-e", "--env"],
          description:
            "Environment variables that will be set during the package build (host machine). e.g.: -e CXX=/usr/bin/clang++",
          args: {
            name: "env host",
          },
        },
        {
          name: ["-e:b", "--env:build"],
          description:
            "Environment variables that will be set during the package build (build machine). e.g.: -e:b CXX=/usr/bin/clang++",
          args: {
            name: "env build",
          },
        },
        {
          name: ["-e:h", "--env:host ENV_HOST"],
          description:
            "Environment variables that will be set during the package build (host machine). e.g.: -e:h CXX=/usr/bin/clang++",
          args: {
            name: "env host",
          },
        },
        {
          name: ["-o", "--options"],
          description:
            "Define options values (host machine), e.g.: -o Pkg:with_qt=true",
          args: {
            name: "options host",
          },
        },
        {
          name: ["-o:b", "--options:build"],
          description:
            "Define options values (build machine), e.g.: -o:b Pkg:with_qt=true",
          args: {
            name: "options build",
          },
        },
        {
          name: ["-o:h", "--options:host"],
          description:
            "Define options values (host machine), e.g.: -o:h Pkg:with_qt=true",
          args: {
            name: "options host",
          },
        },
        {
          name: ["-pr", "--profile"],
          description: "Apply the specified profile to the host machine",
          args: {
            name: "profile host",
          },
        },
        {
          name: ["-pr:b", "--profile:build"],
          description: "Apply the specified profile to the build machine",
          args: {
            name: "profile build",
          },
        },
        {
          name: ["-pr:h", "--profile:host"],
          description: "Apply the specified profile to the host machine",
          args: {
            name: "profile host",
          },
        },
        {
          name: ["-s", "--settings"],
          description:
            "Settings to build the package, overwriting the defaults (host machine). e.g.: -s compiler=gcc",
          args: {
            name: "settings host",
          },
        },
        {
          name: ["-s:b", "--settings:build"],
          description:
            "Settings to build the package, overwriting the defaults (build machine). e.g.: -s:b compiler=gcc",
          args: {
            name: "settings build",
          },
        },
        {
          name: ["-s:h", "--settings:host"],
          description:
            "Settings to build the package, overwriting the defaults (host machine). e.g.: -s:h compiler=gcc",
          args: {
            name: "settings host",
          },
        },
        {
          name: ["-c", "--conf"],
          description:
            "Configuration to build the package, overwriting the defaults (host machine). e.g.: -c tools.cmake.cmaketoolchain:generator=Xcode",
          args: {
            name: "CONF_HOST",
          },
        },
        {
          name: ["-c:b, --conf:build"],
          description:
            "Configuration to build the package, overwriting the defaults (build machine). e.g.: -c:b tools.cmake.cmaketoolchain:generator=Xcode",
          args: {
            name: "CONF_BUILD",
          },
        },
        {
          name: ["-c:h", "--conf:host"],
          description:
            "Configuration to build the package, overwriting the defaults (host machine). e.g.: -c:h tools.cmake.cmaketoolchain:generator=Xcode",
          args: {
            name: "CONF_HOST",
          },
        },
        {
          name: "--lockfile-node-id",
          description: "NodeID of the referenced package in the lockfile",
          args: {
            name: "LOCKFILE_NODE_ID",
          },
        },
        {
          name: "--require-override",
          description: "Define a requirement override",
          args: {
            name: "REQUIRE_OVERRIDE",
          },
        },
      ],
    },
    {
      name: "config",
      description: "Manages Conan configuration",
      subcommands: [
        {
          name: "get",
          description: "Get the value of configuration item",
          args: {
            name: "config item",
          },
        },
        {
          name: "home",
          description: "Retrieve the Conan home directory",
        },
        {
          name: "install",
          description: "Install a full configuration from a local or remote",
        },
        {
          name: "rm",
          description: "Remove an existing config element",
          args: {
            name: "config element",
          },
        },
        {
          name: "set",
          description: "Set a value for a configuration item",
          args: {
            name: "config item",
          },
        },
        {
          name: "init",
          description: "Initializes Conan configuration files",
        },
        {
          name: "list",
          description: "List Conan configuration properties",
        },
      ],
      options: [
        {
          name: ["-h", "--help"],
          description: "Show this help message and exit",
        },
      ],
    },
    {
      name: "config install",
      description: "Manages Conan configuration and install",
      subcommands: [
        {
          name: "item",
          description:
            "git repository, local file or folder or zip file (local or http) where the configuration is stored",
          args: {
            name: "item",
            template: ["filepaths", "folders"],
          },
        },
      ],
      options: [
        {
          name: ["-h", "--help"],
          description: "Show this help message and exit",
        },
        {
          name: "--verify-ssl",
          description: "Verify SSL connection when downloading file",
          args: {
            name: "verify ssl",
            isOptional: true,
          },
        },
        {
          name: ["--type", "-t"],
          description: "Type of remote config",
          args: {
            name: "type",
            suggestions: ["git", "dir", "file", "url"],
          },
        },
        {
          name: ["--args", "-a"],
          description: "String with extra arguments for git clone",
          args: {
            name: "args",
          },
        },
        {
          name: ["-sf", "--source-folder"],
          description:
            "Install files only from a source subfolder from the specified origin",
          args: {
            name: "SOURCE_FOLDER",
            template: "folders",
          },
        },
        {
          name: ["-tf", "--target-folder"],
          description: "Install to that path in the conan cache",
          args: {
            name: "TARGET_FOLDER",
            template: "folders",
          },
        },
        {
          name: ["-l", "--list"],
          description: "List stored configuration origins",
        },
        {
          name: ["-r", "--remove"],
          description:
            "Remove configuration origin by index in list (index provided by --list argument)",
          args: {
            name: "remove",
          },
        },
      ],
    },
    {
      name: "get",
      description:
        "Gets a file or list a directory of a given reference or package",
      args: [
        {
          name: "reference",
          description:
            "Recipe reference or package reference e.g., 'MyPackage/1.2@user/channel', 'MyPackage/1.2@user/channel:af7901d8bdfde621d086181aa1c495c25a17b137'",
        },
        {
          name: "path",
          description:
            "Path to the file or directory. If not specified will get the conanfile if only a reference is specified and a conaninfo.txt file contents if the package is also specified",
          template: ["filepaths", "folders"],
        },
      ],
      options: [
        {
          name: ["-h", "--help"],
          description: "Show this help message and exit",
        },
        {
          name: ["-p", "--package"],
          description: "Package ID [DEPRECATED: use full reference instead]",
          args: {
            name: "Package",
          },
        },
        {
          name: ["-r", "--remote"],
          description: "Get from this specific remote",
          args: {
            name: "remote",
          },
        },
        {
          name: ["-raw", "--raw"],
          description: "Do not decorate the text",
        },
      ],
    },
    {
      name: "info",
      description: "Gets the dependency graph of a recipe",
      options: [
        {
          name: ["-h", "--help"],
          description: "Show this help message and exit",
        },
        {
          name: ["-g", "--graph"],
          description:
            "Creates file with project dependencies graph. It will generate a DOT or HTML file depending on the filename extension",
          args: {
            name: "GRAPH",
          },
        },
        {
          name: ["-if", "--install-folder"],
          description:
            "Use this directory as the directory where to put the generatorfiles. e.g., conaninfo/conanbuildinfo.txt",
          args: {
            name: "INSTALL_FOLDER",
            template: "folders",
          },
        },
        {
          name: ["-n", "--only"],
          description: "Show only the specified fields",
          args: {
            name: "manifests",
            suggestions: [
              "id",
              "build_id",
              "remote",
              "url",
              "license",
              "requires",
              "update",
              "required",
              "date",
              "author",
              "description",
              "provides",
              "deprecated",
              "None",
            ],
          },
        },
        {
          name: ["-j", "--json"],
          description:
            "Path to a json file where the install information will be written",
          args: {
            name: "JSON",
            generators: jsonGenerator,
          },
        },
        {
          name: ["-b", "--build"],
          description:
            "Given a build policy, return an ordered list of packages that would be built from sources during the install command",
          args: {
            name: "build",
            isOptional: true,
            suggestions: [
              {
                name: "never",
                description:
                  "Disallow build for all packages, use binary packages or fail if a binary package is not found. Cannot be combined with other '--build' options",
              },
              {
                name: "missing",
                description:
                  "Build packages from source whose binary package is not found",
              },
              {
                name: "outdated",
                description:
                  "Build packages from source whose binary package was not generated from the latest recipe or is not found",
              },
              {
                name: "cascade",
                description:
                  "Build packages from source that have at least one dependency being built from source",
              },
            ],
          },
        },
        {
          name: ["-db", "--dry-build"],
          description:
            "Apply the --build argument to output the information, as it would be done by the install command",
          args: {
            name: "dry build",
          },
        },
        {
          name: ["-r", "--remote"],
          description: "Look in the specified remote server",
          args: {
            name: "remote",
          },
        },
        {
          name: ["-u", "--update"],
          description:
            "Will check the remote and in case a newer version  and/or revision of the dependencies exists there, it will install those in the local cache. When using version ranges, it will install the latest version that satisfies the range. Also, if using revisions, it will update to the latest revision for the resolved version range",
        },
        {
          name: ["-l", "--lockfile"],
          description: "Path to a lockfile",
          args: {
            name: "LOCKFILE",
            template: "filepaths",
          },
        },
        {
          name: "--lockfile-out",
          description: "Filename of the updated lockfile",
          args: {
            name: "LOCKFILE_OUT",
            template: "filepaths",
          },
        },
        {
          name: ["-e", "--env"],
          description:
            "Environment variables that will be set during the package build (host machine). e.g.: -e CXX=/usr/bin/clang++",
          args: {
            name: "env host",
          },
        },
        {
          name: ["-e:b", "--env:build"],
          description:
            "Environment variables that will be set during the package build (build machine). e.g.: -e:b CXX=/usr/bin/clang++",
          args: {
            name: "env build",
          },
        },
        {
          name: ["-e:h", "--env:host ENV_HOST"],
          description:
            "Environment variables that will be set during the package build (host machine). e.g.: -e:h CXX=/usr/bin/clang++",
          args: {
            name: "env host",
          },
        },
        {
          name: ["-o", "--options"],
          description:
            "Define options values (host machine), e.g.: -o Pkg:with_qt=true",
          args: {
            name: "options host",
          },
        },
        {
          name: ["-o:b", "--options:build"],
          description:
            "Define options values (build machine), e.g.: -o:b Pkg:with_qt=true",
          args: {
            name: "options build",
          },
        },
        {
          name: ["-o:h", "--options:host"],
          description:
            "Define options values (host machine), e.g.: -o:h Pkg:with_qt=true",
          args: {
            name: "options host",
          },
        },
        {
          name: ["-pr", "--profile"],
          description: "Apply the specified profile to the host machine",
          args: {
            name: "profile host",
          },
        },
        {
          name: ["-pr:b", "--profile:build"],
          description: "Apply the specified profile to the build machine",
          args: {
            name: "profile build",
          },
        },
        {
          name: ["-pr:h", "--profile:host"],
          description: "Apply the specified profile to the host machine",
          args: {
            name: "profile host",
          },
        },
        {
          name: ["-s", "--settings"],
          description:
            "Settings to build the package, overwriting the defaults (host machine). e.g.: -s compiler=gcc",
          args: {
            name: "settings host",
          },
        },
        {
          name: ["-s:b", "--settings:build"],
          description:
            "Settings to build the package, overwriting the defaults (build machine). e.g.: -s:b compiler=gcc",
          args: {
            name: "settings build",
          },
        },
        {
          name: ["-s:h", "--settings:host"],
          description:
            "Settings to build the package, overwriting the defaults (host machine). e.g.: -s:h compiler=gcc",
          args: {
            name: "settings host",
          },
        },
        {
          name: ["-c", "--conf"],
          description:
            "Configuration to build the package, overwriting the defaults (host machine). e.g.: -c tools.cmake.cmaketoolchain:generator=Xcode",
          args: {
            name: "CONF_HOST",
          },
        },
        {
          name: ["-c:b, --conf:build"],
          description:
            "Configuration to build the package, overwriting the defaults (build machine). e.g.: -c:b tools.cmake.cmaketoolchain:generator=Xcode",
          args: {
            name: "CONF_BUILD",
          },
        },
        {
          name: ["-c:h", "--conf:host"],
          description:
            "Configuration to build the package, overwriting the defaults (host machine). e.g.: -c:h tools.cmake.cmaketoolchain:generator=Xcode",
          args: {
            name: "CONF_HOST",
          },
        },
      ],
      args: {
        name: "path_or_reference",
        description:
          "Path to a folder containing a recipe (conanfile.py or conanfile.txt) or to a recipe file. e.g., ./my_project/conanfile.txt. It could also be a reference",
        template: "filepaths",
      },
    },
    {
      name: "search",
      description:
        "Searches package recipes and binaries in the local cache or a remote. Unless a remote is specified only the local cache is searched",
      options: [
        {
          name: ["-h", "--help"],
          description: "Show this help message and exit",
        },
        {
          name: ["-r", "--remote"],
          description: "Remote to search in. '-r all' searches all remotes",
          args: {
            name: "remote",
          },
        },
        {
          name: "--raw",
          description: "Print just the list of recipes",
        },
        {
          name: "--table",
          description:
            "Outputs html file with a table of binaries. Only valid for a reference search",
          args: {
            name: "TABLE",
          },
        },
        {
          name: ["-j", "--json"],
          description:
            "Json file path where the search information will be written to",
          args: {
            name: "JSON",
            generators: jsonGenerator,
          },
        },
        {
          name: ["-rev", "--revisions"],
          description:
            "Get a list of revisions for a reference or a package reference",
        },
        {
          name: ["-o", "--outdated"],
          description:
            "Show only outdated from recipe packages. This flag can only be used with a reference",
        },
        {
          name: ["-q", "--query"],
          description:
            "Packages query: 'os=Windows AND (arch=x86 OR compiler=gcc)'. The 'pattern_or_reference' parameter has to be a reference: MyPackage/1.2@user/channel",
          args: {
            name: "QUERY",
          },
        },
        {
          name: "--case-sensitive",
          description:
            "Make a case-sensitive search. Use it to guarantee case-sensitive search in Windows or other case-insensitive file systems",
        },
      ],
      args: {
        name: "path_or_reference",
        description:
          "Path to a folder containing a recipe (conanfile.py or conanfile.txt) or to a recipe file. e.g., ./my_project/conanfile.txt. It could also be a reference",
        template: "filepaths",
      },
    },
    // {
    //   name: "create",
    // },
    // {
    //   name: "export",
    // },
    // {
    //   name: "export-pkg",
    // },
    // {
    //   name: "new",
    // },
    // {
    //   name: "upload",
    // },
    // {
    //   name: "test",
    // },
    // {
    //   name: "source",
    // },
    // {
    //   name: "build",
    // },
    // {
    //   name: "package",
    // },
    // {
    //   name: "editable",
    // },
    // {
    //   name: "workspace",
    // },
    // {
    //   name: "profile",
    // },
    // {
    //   name: "remote",
    // },
    // {
    //   name: "user",
    // },
    // {
    //   name: "imports",
    // },
    // {
    //   name: "copy",
    // },
    // {
    //   name: "download",
    // },
    // {
    //   name: "remove",
    // },
    // {
    //   name: "alias",
    // },
    // {
    //   name: "inspect",
    // },
    // {
    //   name: "lock",
    // },
    // {
    //   name: "lock bundle",
    // },
    // {
    //   name: "help",
    // },
  ],
};
