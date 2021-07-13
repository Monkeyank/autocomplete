const bazelBuildFiles: Fig.Generator = {
  script: `FILES=( $(find ./ -name BUILD) ); for f in $FILES; do echo "----$f"; cat "$f"; done`,
  // returns filepaths and contents in the form below, note the "----" to indicate the filepath
  // ----.//lib/BUILD
  // load("@rules_cc//cc:defs.bzl", "cc_library")

  // cc_library(
  //     name = "hello-time",
  //     srcs = ["hello-time.cc"],
  //     hdrs = ["hello-time.h"],
  //     visibility = ["//main:__pkg__"],
  // )

  postProcess: function (out) {
    const lines = out.split("\n");
    // return lines
    const targets = [];
    let currPath = "";
    for (let i = 0; i < lines.length; i++) {
      const isFilepath = lines[i].match("----.(.*)/BUILD");
      const isBazelTarget = lines[i].match('name = "(.*)"');
      if (isFilepath) {
        currPath = isFilepath[1] + ":";
      } else if (isBazelTarget) {
        targets.push({
          name: currPath + isBazelTarget[1],
          description: "bazel target",
          icon: "🎯",
          priority: 80,
        });
      }
    }
    return targets;
  },
};

const booleanArg: Fig.Arg = {
  name: "boolean",
  isOptional: true,
  suggestions: [
    {
      name: ["true", "yes", "1"],
    },
    {
      name: ["false", "no", "0"],
    },
  ],
};

const pathArg: Fig.Arg = {
  name: "path",
  template: "filepaths",
};

const sharedOptions: Fig.Option[] = [
  {
    name: "--experimental_oom_more_eagerly_threshold",
    description:
      "If this flag is set to a value less than 100, Bazel will OOM if, after two full GC's, more than this percentage of the (old gen) heap is still occupied",
    args: {
      name: "integer",
      default: "100",
    },
  },
  {
    name: "--experimental_ui_max_stdouterr_bytes",
    description:
      "The maximum size of the stdout / stderr files that will be printed to the console",
    args: {
      name: "integer",
      description: "(-1) to 1073741819 range. -1 implies no limit",
      default: "1048576",
    },
  },
  {
    name: "--repo_env",
    description:
      "Specifies additional environment variables to be available only for repository rules",
    args: {
      name: "key value pairs",
      description: "name=value",
      variadic: true,
    },
  },
  {
    name: "--experimental_allow_tags_propagation",
    description:
      "If set to true, tags will be propagated from a target to the actions' execution requirements",
    args: booleanArg,
  },
  {
    name: "--noexperimental_allow_tags_propagation",
    description: "Tags are not propagated",
  },
  {
    name: "--experimental_cc_shared_library",
    description:
      "If set to true, rule attributes and Starlark API methods needed for the rule cc_shared_library will be available",
    args: booleanArg,
  },
  {
    name: "--noexperimental_cc_shared)library",
    description:
      "Rule attributes and Starlark API methods needed for the rule cc_shared_library will NOT be available",
  },
  {
    name: "--experimental_disable_external_package",
    description:
      "If set to true, the auto-generated //external package will not be available anymore",
    args: booleanArg,
  },
  {
    name: "--noexperimental_disable_external_package",
    description: "Auto-generated //external pacakges will still be available",
  },
  {
    name: "--experimental_enable_android_migration_apis",
    description:
      "If set to true, enables the APIs required to support the Android Starlark migration",
    args: booleanArg,
  },
  {
    name: "--noexperimental_enable_android_migration_apis",
    description:
      "Disables the APIs required to support the Android Starlark migration",
  },
  {
    name: "--experimental_google_legacy_api",
    description:
      "If set to true, exposes a number of experimental pieces of Starlark build API pertaining to Google legacy code",
    args: booleanArg,
  },
  {
    name: "--noexperimental_google_legacy_api",
    description:
      "Doesn't expose experimental pieces of Starlark build API pertaining to Google legacy code",
  },
  {
    name: "--experimental_ninja_actions",
    description: "If set to true, enables Ninja execution functionality",
    args: booleanArg,
  },
  {
    name: "--noexperimental_ninja_actions",
    description: "Disables Ninja execution functionality",
  },
];

export const completionSpec: Fig.Spec = {
  name: "bazel",
  description: "Bazel the build system!",
  subcommands: [
    {
      name: "analyze-profile",
      description: "Analyzes build profile data",
      options: [...sharedOptions],
    },
    {
      name: "aquery",
      description: "Executes a query on the post-analysis action graph",
      options: [...sharedOptions],
    },
    {
      name: "canonicalize-flags",
      description: "Canonicalize Bazel flags",
      options: [...sharedOptions],
    },
    {
      name: "clean",
      description: "Removes output files and optionally stops the server",
      options: [...sharedOptions],
    },
    {
      name: "cquery",
      description: "Executes a post-analysis dependency graph query",
      options: [...sharedOptions],
    },
    {
      name: "dump",
      description: "Dumps the internal state of the Bazel server process",
      options: [...sharedOptions],
    },
    {
      name: "help",
      description: "Prints help for commands, or the index",
      options: [...sharedOptions],
    },
    {
      name: "info",
      description: "Displays runtime info about the bazel server",
      options: [...sharedOptions],
    },
    {
      name: "fetch",
      description: "Fetches all external dependencies of a target",
      options: [...sharedOptions],
    },
    {
      name: "mobile-install",
      description: "Installs apps on mobile devices",
      options: [...sharedOptions],
    },
    {
      name: "query",
      description: "Executes a dependency graph query",
      options: [...sharedOptions],
    },
    {
      name: "shutdown",
      description: "Stops the Bazel server",
      options: [...sharedOptions],
    },
    {
      name: "version",
      description: "Prints version information for Bazel",
      options: [...sharedOptions],
    },
    {
      name: "run",
      description: "Runs the specified target.",
      args: {
        name: "BUILD file",
        generators: bazelBuildFiles,
      },
      options: [...sharedOptions],
    },
    {
      name: "test",
      description: "Builds and runs the specified test targets.",
      args: {
        name: "BUILD file",
        generators: bazelBuildFiles,
      },
      options: [...sharedOptions],
    },
    {
      name: "build",
      description: "Builds the specified targets..",
      args: {
        name: "BUILD file",
        generators: bazelBuildFiles,
      },
      options: [...sharedOptions],
    },
  ],
  options: [
    {
      name: "--autodetect_server_javabase",
      description: "Falls back on local JDK for running the bazel server",
      args: booleanArg,
    },
    {
      name: "--noautodetect_server_javabase",
      description:
        "Bazel does not fall back to the local JDK for running the bazel server and instead exits",
    },
    {
      name: "--batch",
      description:
        "Bazel will be run as just a client process without a server, instead of in the standard client/server mode",
      args: booleanArg,
    },
    {
      name: "--nobatch",
      description: "Disables --batch",
    },
    {
      name: "--batch_cpu_scheduling",
      description: "Only on Linux; use 'batch' CPU scheduling for Bazel",
      args: booleanArg,
    },
    {
      name: "--nobatch_cpu_scheduling",
      description: "Bazel does not perform a system call",
    },
    {
      name: "--bazelrc",
      description:
        "The location of the user .bazelrc file containing default values of Bazel options",
      args: pathArg,
    },
    {
      name: "--block_for_lock",
      description: "Waits for a running command to complete",
      args: booleanArg,
    },
    {
      name: "--noblock_for_lock",
      description:
        "Bazel does not wait for a running command to complete, but instead exits immediately",
    },
    {
      name: "--client_debug",
      description: "Log debug information from the client to stderr",
      args: booleanArg,
    },
    {
      name: "--noclient_debug",
      description: "Disables --client_debug",
    },
    {
      name: "--connect_timeout_secs",
      description:
        "The amount of time the client waits for each attempt to connect to the server",
      args: {
        name: "integer",
        default: "30",
      },
    },
    {
      name: "--expand_configs_in_place",
      description:
        "Changed the expansion of --config flags to be done in-place, as opposed to in a fixed point expansion between normal rc options and command-line specified options",
      args: booleanArg,
    },
    {
      name: "--noexpand_configs_in_place",
      description: "Don't expand --config flags in-place",
    },
    {
      name: "--failure_detail_out",
      description:
        "If set, specifies a location to write a failure_detail protobuf message if the server experiences a failure and cannot report it via gRPC, as normal",
      args: pathArg,
    },
    {
      name: "--home_rc",
      description:
        "Whether or not to look for the home bazelrc file at $HOME/.bazelrc",
      args: booleanArg,
    },
    {
      name: "--nohome_rc",
      description:
        "Whether or not to look for the home bazelrc file at $HOME/.bazelrc",
    },
    {
      name: "--idle_server_tasks",
      description: "Run System.gc() when the server is idle",
      args: booleanArg,
    },
    {
      name: "--noidle_server_tasks",
      description: "Don't run System.gc() when the server is idle",
    },
    {
      name: "--ignore_all_rc_files",
      description:
        "Disables all rc files, regardless of the values of other rc-modifying flags, even if these flags come later in the list of startup options",
      args: booleanArg,
    },
    {
      name: "--noignore_all_rc_files",
      description: "Doesn't ignore all rc files",
    },
    {
      name: "--io_nice_level",
      description:
        "Only on Linux; set a level from 0-7 for best-effort IO scheduling using the sys_ioprio_set system call. 0 is highest priority, 7 is lowest",
      args: {
        name: "level",
        default: "-1",
        suggestions: ["-1", "0", "1", "2", "3", "4", "5", "6", "7"],
      },
    },
    {
      name: "--local_startup_timeout_secs",
      description:
        "The maximum amount of time the client waits to connect to the server",
      args: {
        name: "integer",
        default: "120",
      },
    },
    {
      name: "--macos_qos_class",
      description:
        "Sets the QoS service class of the bazel server when running on macOS",
      args: {
        name: "string",
        default: "default",
      },
    },
    {
      name: "--max_idle_secs",
      description:
        "The number of seconds the build server will wait idling before shutting down",
      args: {
        name: "integer",
        default: "10800",
      },
    },
    {
      name: "--output_base",
      description:
        "If set, specifies the output location to which all build output will be written",
      args: pathArg,
    },
    {
      name: "--output_user_root",
      description:
        "The user-specific directory beneath which all build outputs are written",
      args: pathArg,
    },
    {
      name: "--preemptible",
      description:
        "If true, the command can be preempted if another command is started",
      args: booleanArg,
    },
    {
      name: "--nopreemptible",
      description:
        "The command cannot be preempted if another command is started",
    },
    {
      name: "--server_jvm_out",
      description: "The location to write the server's JVM's output",
      args: pathArg,
    },
    {
      name: "--shutdown_on_low_sys_mem",
      description:
        "If max_idle_secs is set and the build server has been idle for a while, shut down the server when the system is low on free RAM",
      args: booleanArg,
    },
    {
      name: "--noshutdown_on_low_sys_mem",
      description: "Disables --shutdown_on_low_sys_mem",
    },
    {
      name: "--system_rc",
      description: "Whether or not to look for the system-wide bazelrc",
      args: booleanArg,
    },
    {
      name: "--nosystem_rc",
      description: "Whether or not to look for the system-wide bazelrc",
    },
    {
      name: "--watchfs",
      description:
        "If true, bazel tries to use the operating system's file watch service for local changes instead of scanning every file for a change",
      args: booleanArg,
    },
    {
      name: "--nowatchfs",
      description:
        "Scans every file for a change instead of using the operating system's file watch service for local changes",
    },
    {
      name: "--windows_enable_symlinks",
      description:
        "If true, real symbolic links will be created on Windows instead of file copying",
      args: booleanArg,
    },
    {
      name: "--nowindows_enable_symlinks",
      description: "Uses file copying on Windows",
    },
    {
      name: "--workspace_rc",
      description:
        "Whether or not to look for the workspace bazelrc file at $workspace/.bazelrc ",
      args: booleanArg,
    },
    {
      name: "--noworkspace_rc",
      description:
        "Whether or not to look for the workspace bazelrc file at $workspace/.bazelrc",
    },
    {
      name: "--host_jvm_args",
      description: "Flags to pass to the JVM executing Bazel",
      args: {
        name: "options",
        variadic: true,
      },
    },
    {
      name: "--host_jvm_debug",
      description:
        "Convenience option to add some additional JVM startup flags, which cause the JVM to wait during startup until you connect from a JDWP-compliant debugger",
      args: {
        name: "options",
        isOptional: true,
        variadic: true,
      },
    },
    {
      name: "--host_jvm_profile",
      description:
        "Convenience option to add some profiler/debugger-specific JVM startup flags",
      args: {
        name: "profiler name",
      },
    },
    {
      name: "--server_javabase",
      description: "Path to the JVM used to execute Bazel itself",
      args: {
        name: "jvm path",
        template: "filepaths",
      },
    },
    ...sharedOptions,
  ],
};
