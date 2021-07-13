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
  {
    name: "--experimental_platforms_api",
    description:
      "If set to true, enables a number of platform-related Starlark APIs useful for debugging",
    args: booleanArg,
  },
  {
    name: "--noexperimental_platforms_api",
    description:
      "Disables a number of platform-related Starlark APIs useful for debugging",
  },
  {
    name: "--experimental_repo_remote_exec",
    description:
      "If set to true, repository_rule gains some remote execution capabilities",
    args: booleanArg,
  },
  {
    name: "--noexperimental_repo_remote_exec",
    description: "Disables --experimental_repo_remote_exec",
  },
  {
    name: "--experimental_required_aspects",
    description:
      "If set to true, allows created aspect to require a list of aspects to be propagated before it",
    args: booleanArg,
  },
  {
    name: "--noexperimental_required_aspects",
    description:
      "Doesn't allow created aspect to require a list of aspects to be propagated before it",
  },
  {
    name: "--experimental_sibling_repository_layout",
    description:
      "If set to true, non-main repositories are planted as symlinks to the main repository in the execution root",
    args: booleanArg,
  },
  {
    name: "--noexperimental_sibling_repository_layout",
    description:
      "Non-main repositories are NOT planted as symlinks to the main repository in the execution root",
  },
  {
    name: "--incompatible_always_check_depset_elements",
    description:
      "Checks the validity of elements added to depsets, in all constructors",
    args: booleanArg,
  },
  {
    name: "--noincompatible_always_check_depset_elements",
    description:
      "Doesn't check the validity of elements added to depsets, in all constructors",
  },
  {
    name: "--incompatible_depset_for_libraries_to_link_getter",
    description:
      "When true, Bazel no longer returns a list from linking_context",
    args: booleanArg,
  },
  {
    name: "--noincompatible_depset_for_libraries_to_link_getter",
    description: "Bazel continues to return a list from linking_context",
  },
  {
    name: "--incompatible_disable_depset_items",
    description:
      "If set to true, disable the 'items' parameter of the depset constructor",
    args: booleanArg,
  },
  {
    name: "--noincompatible_disable_depset_items",
    description: "Enables the 'items' parameter of the depset constructor",
  },
  {
    name: "--incompatible_disable_target_provider_fields",
    description:
      "If set to true, disable the ability to access providers on 'target' objects via field syntax",
    args: booleanArg,
  },
  {
    name: "--noincompatible_disable_target_provider_fields",
    description:
      "Enables the ability to access providers on 'target' objects via field syntax",
  },
  {
    name: "--incompatible_disable_third_party_license_checking",
    description: "If true, disables all license checking logic",
    args: booleanArg,
  },
  {
    name: "--noincompatible_disable_third_party_license_checking",
    description: "Keeps all license checking logic",
  },
  {
    name: "--incompatible_disallow_empty_glob",
    description:
      "If set to true, the default value of the `allow_empty` argument of glob() is False",
    args: booleanArg,
  },
  {
    name: "--noincompatible_disallow_empty_glob",
    description: "Disables --incompatible_disallow_empty_glob",
  },
  {
    name: "--incompatible_disallow_struct_provider_syntax",
    description:
      "If set to true, rule implementation functions may not return a struct. They must instead return a list of provider instances",
    args: booleanArg,
  },
  {
    name: "--noincompatible_disallow_struct_provider_syntax",
    description: "Disable --incompatible_disallow_struct_provider_syntax",
  },
  {
    name: "--incompatible_enable_exports_provider",
    description:
      "This flag enables exports provider and JavaInfo.transitive_exports call",
    args: booleanArg,
  },
  {
    name: "--noincompatible_enable_exports_provider",
    description: "Disables --incompatible_enable_exports_provider",
  },
  {
    name: "--incompatible_java_common_parameters",
    description:
      "If set to true, the jar_file, and host_javabase parameters in pack_sources and host_javabase in compile will all be removed",
    args: booleanArg,
  },
  {
    name: "--noincompatible_java_common_parameters",
    description: "Disables --incompatible_java_common_parameters",
  },
  {
    name: "--incompatible_linkopts_to_linklibs",
    description:
      "If set to true the default linkopts in the default toolchain are passed as linklibs instead of linkopts to cc_toolchain_config",
    args: booleanArg,
  },
  {
    name: "--noincompatible_linkopts_to_linklibs",
    description: "Disables --incompatible_linkopts_to_linklibs",
  },
  {
    name: "--incompatible_new_actions_api",
    description:
      "If set to true, the API to create actions is only available on `ctx.actions`, not on `ctx`",
    args: booleanArg,
  },
  {
    name: "--noincompatible_new_actions_api",
    description: "Disables --incompatible_new_actions_api",
  },
  {
    name: "--incompatible_no_attr_license",
    description: "If set to true, disables the function `attr.license`",
    args: booleanArg,
  },
  {
    name: "--noincompatible_no_attr_license",
    description: "Disables --incompatible_no_attr_license",
  },
  {
    name: "--incompatible_no_implicit_file_export",
    description:
      "If set, (used) source files are are package private unless exported explicitly",
    args: booleanArg,
  },
  {
    name: "--noincompatible_no_implicit_file_export",
    description: "Disables --incompatible_no_implicit_file_export",
  },
  {
    name: "--[no]incompatible_no_rule_outputs_param",
    description:
      "If set to true, disables the `outputs` parameter of the `rule()` Starlark function",
    args: booleanArg,
  },
  {
    name: "--noincompatible_no_rule_outputs_param",
    description: "Disables --incompatible_no_rule_outputs_param",
  },
  {
    name: "--incompatible_require_linker_input_cc_api",
    description:
      "If set to true, rule create_linking_context will require linker_inputs instead of libraries_to_link",
    args: booleanArg,
  },
  {
    name: "--noincompatible_require_linker_input_cc_api",
    description: "Disables --incompatible_require_linker_input_cc_api",
  },
  {
    name: "--incompatible_restrict_string_escapes",
    description: "If set to true, unknown string escapes become rejected",
    args: booleanArg,
  },
  {
    name: "--noincompatible_restrict_string_escapes",
    description: "Disables --incompatible_restrict_string_escapes",
  },
  {
    name: "--incompatible_run_shell_command_string",
    description:
      "If set to true, the command parameter of actions.run_shell will only accept string",
    args: booleanArg,
  },
  {
    name: "--noincompatible_run_shell_command_string",
    description: "Disables --incompatible_run_shell_command_string",
  },
  {
    name: "--incompatible_struct_has_no_methods",
    description:
      "Disables the to_json and to_proto methods of struct, which pollute the struct field namespace",
    args: booleanArg,
  },
  {
    name: "--noincompatible_struct_has_no_methods",
    description: "Disables --incompatible_struct_has_no_methods",
  },
  {
    name: "--incompatible_top_level_aspects_require_providers",
    description:
      "If set to true, the top level aspect will honor its required providers and only run on top level targets whose rules' advertised providers satisfy the required providers of the aspect",
    args: booleanArg,
  },
  {
    name: "--noincompatible_top_level_aspects_require_providers",
    description: "Disables --incompatible_top_level_aspects_require_providers",
  },
  {
    name: "--incompatible_use_cc_configure_from_rules_cc",
    description:
      "When true, Bazel will no longer allow using cc_configure from @bazel_tools",
    args: booleanArg,
  },
  {
    name: "--noincompatible_use_cc_configure_from_rules_cc",
    description: "Disables --incompatible_use_cc_configure_from_rules_cc",
  },
  {
    name: "--incompatible_visibility_private_attributes_at_definition",
    description:
      "If set to true, the visibility of private rule attributes is checked with respect to the rule definition, rather than the rule usage",
    args: booleanArg,
  },
  {
    name: "--noincompatible_visibility_private_attributes_at_definition",
    description:
      "Disables --incompatible_visibility_private_attributes_at_definition",
  },
  {
    name: "--max_computation_steps",
    description:
      "The maximum number of Starlark computation steps that may be executed by a BUILD file (zero means no limit)",
    args: {
      name: "integer",
      default: "0",
    },
  },
  {
    name: "--nested_set_depth_limit",
    description:
      "The maximum depth of the graph internal to a depset (also known as NestedSet), above which the depset() constructor will fail",
    args: {
      name: "integer",
      default: "3500",
    },
  },
  {
    name: "--incompatible_do_not_split_linking_cmdline",
    description:
      "When true, Bazel no longer modifies command line flags used for linking, and also doesn't selectively decide which flags go to the param file and which don't",
    args: booleanArg,
  },
  {
    name: "--noincompatible_do_not_split_linking_cmdline",
    description: "Disables --incompatible_do_not_split_linking_cmdline",
  },
  {
    name: "--keep_state_after_build",
    description:
      "If false, Bazel will discard the inmemory state from this build when the build finishes. Subsequent builds will not have any incrementality with respect to this one",
    args: booleanArg,
  },
  {
    name: "--nokeep_state_after_build",
    description:
      "Bazel will discard the inmemory state from this build when the build finishes. Subsequent builds will not have any incrementality with respect to this one",
  },
  {
    name: "--track_incremental_state",
    description:
      "If false, Bazel will not persist data that allows for invalidation and re-evaluation on incremental builds in order to save memory on this build. Subsequent builds will not have any incrementality with respect to this one",
    args: booleanArg,
  },
  {
    name: "--notrack_incremental_state",
    description:
      "Bazel will not persist data that allows for invalidation and re-evaluation on incremental builds in order to save memory on this build. Subsequent builds will not have any incrementality with respect to this one",
  },
  {
    name: "--announce_rc",
    description: "Announces rc options.",
    args: booleanArg,
  },
  {
    name: "--noannounce_rc",
    description: "Doesn't announce rc options",
  },
  {
    name: "--attempt_to_print_relative_paths",
    description:
      "When printing the location part of messages, attempt to use a path relative to the workspace directory or one of the directories specified by {--package_path. }",
    args: booleanArg,
  },
  {
    name: "--noattempt_to_print_relative_paths",
    description: "Disables --attempt_to_print_relative_paths",
  },
  {
    name: "--bes_backend",
    description:
      "Specifies the build event service (BES) backend endpoint as HOST or HOST:PORT",
    args: {
      name: "string",
    },
  },
  {
    name: "--bes_keywords",
    description:
      "Specifies a list of notification keywords to be added the default set of keywords published to BES (`command_name=<command_name>`, `protocol_name=BEP`)",
    args: {
      name: "options",
      description: "comma seperated",
      variadic: true,
    },
  },
  {
    name: "--bes_lifecycle_events",
    description: "Specifies whether to publish BES lifecycle events",
    args: booleanArg,
  },
  {
    name: "--nobes_lifecycle_events",
    description: "Disables --bes_lifecycle_events",
  },
  {
    name: "--bes_outerr_buffer_size",
    description:
      "Specifies the maximal size of stdout or stderr to be buffered in BEP, before it is reported as a progress event",
    args: {
      name: "integer",
      default: "10240",
    },
  },
  {
    name: "--bes_outerr_chunk_size",
    description:
      "Specifies the maximal size of stdout or stderr to be sent to BEP in a single message",
    args: {
      name: "integer",
      default: "1048576",
    },
  },
  {
    name: "--bes_proxy",
    description: "Connect to the Build Event Service through a proxy",
    args: {
      name: "string",
    },
  },
  {
    name: "--bes_results_url",
    description:
      "Specifies the base URL where a user can view the information streamed to the BES backend",
    args: {
      name: "string",
    },
  },
  {
    name: "--bes_timeout=<An immutable length of time",
    description:
      "Specifies how long bazel should wait for the BES/BEP upload to complete after the build and tests have finished",
    args: {
      name: "Immutable lenght of time",
      description:
        "Natural number followed by a unit: Days (d), hours (h), minutes (m), seconds (s), and milliseconds (ms)",
      default: "0s",
    },
  },
  {
    name: "--build_event_binary_file",
    description:
      "If non-empty, write a varint delimited binary representation of representation of the build event protocol to that file",
    args: {
      name: "string",
      template: "filepaths",
    },
  },
  {
    name: "--build_event_binary_file_path_conversion",
    description:
      "Convert paths in the binary file representation of the build event protocol to more globally valid URIs whenever possible; if disabled, the file:// uri scheme will always be used",
    args: booleanArg,
  },
  {
    name: "--nobuild_event_binary_file_path_conversion",
    description: "Disables --build_event_binary_file_path_conversion",
  },
  {
    name: "--build_event_json_file",
    description:
      "If non-empty, write a JSON serialisation of the build event protocol to that file",
    args: {
      name: "string",
      template: "filepaths",
    },
  },
  {
    name: "--build_event_json_file_path_conversion",
    description:
      "Convert paths in the json file representation of the build event protocol to more globally valid URIs whenever possible; if disabled, the file:// uri scheme will always be used",
    args: booleanArg,
  },
  {
    name: "--nobuild_event_json_file_path_conversion",
    description: "Disables --build_event_json_file_path_conversion",
  },
  {
    name: "--build_event_max_named_set_of_file_entries",
    description:
      "The maximum number of entries for a single named_set_of_files event",
    args: {
      name: "integer",
      default: "-1",
    },
  },
  {
    name: "--[no]build_event_publish_all_actions",
    description: "Whether all actions should be published",
    args: booleanArg,
  },
  {
    name: "--[no]build_event_publish_all_actions",
    description: "Do not publish all actions",
  },
  {
    name: "--build_event_text_file",
    description:
      "If non-empty, write a textual representation of the build event protocol to that file",
    args: {
      name: "string",
      template: "filepaths",
    },
  },
  {
    name: "--build_event_text_file_path_conversion",
    description:
      "Convert paths in the text file representation of the build event protocol to more globally valid URIs whenever possible; if disabled, the file:// uri scheme will always be used",
    args: booleanArg,
  },
  {
    name: "--nobuild_event_text_file_path_conversion",
    description: "The file:// uri scheme will always be used",
  },
  {
    name: "--experimental_announce_profile_path",
    description: "If enabled, adds the JSON profile path to the log",
    args: booleanArg,
  },
  {
    name: "--noexperimental_announce_profile_path",
    description: "Disables --experimental_announce_profile_path",
  },
  {
    name: "--experimental_bep_target_summary",
    description: "Whether to publish TargetSummary events",
    args: booleanArg,
  },
  {
    name: "--noexperimental_bep_target_summary",
    description: "Doesn't publish TargetSummary events",
  },
  {
    name: "--experimental_build_event_expand_filesets",
    description:
      "If true, expand Filesets in the BEP when presenting output files",
    args: booleanArg,
  },
  {
    name: "--noexperimental_build_event_expand_filesets",
    description:
      "Doesn't expand Filesets in the BEP when presenting output files",
  },
  {
    name: "--experimental_build_event_fully_resolve_fileset_symlinks",
    description:
      "If true, fully resolve relative Fileset symlinks in the BEP when presenting output files",
    dependsOn: ["--experimental_build_event_expand_filesets"],
    args: booleanArg,
  },
  {
    name: "--noexperimental_build_event_fully_resolve_fileset_symlinks",
    description:
      "Do not resolve relative Fileset symlinks in the BEP when presenting output files",
  },
  {
    name: "--experimental_build_event_upload_strategy",
    description:
      "Selects how to upload artifacts referenced in the build event protocol",
    args: {
      name: "string",
    },
  },
  {
    name: "--experimental_profile_additional_tasks",
    description:
      "Specifies additional profile tasks to be included in the profile",
    args: {
      name: "tasks",
      variadic: true,
      suggestions: [
        "phase",
        "action",
        "action_check",
        "action_lock",
        "action_release",
        "action_update",
        "action_complete",
        "info",
        "create_package",
        "remote_execution",
        "local_execution",
        "scanner",
        "local_parse",
        "upload_time",
        "process_time",
        "remote_queue",
        "remote_setup",
        "fetch",
        "vfs_stat",
        "vfs_dir",
        "vfs_readlink",
        "vfs_md5",
        "vfs_xattr",
        "vfs_delete",
        "vfs_open",
        "vfs_read",
        "vfs_write",
        "vfs_glob",
        "vfs_vmfs_stat",
        "vfs_vmfs_dir",
        "vfs_vmfs_read",
        "wait",
        "thread_name",
        "thread_sort_index",
        "skyframe_eval",
        "skyfunction",
        "critical_path",
        "critical_path_component",
        "handle_gc_notification",
        "action_counts",
        "local_cpu_usage",
        "local_memory_usage",
        "starlark_parser",
        "starlark_user_fn",
        "starlark_builtin_fn",
        "starlark_user_compiled_fn",
        "starlark_repository_fn",
        "action_fs_staging",
        "remote_cache_check",
        "remote_download",
        "remote_network",
        "filesystem_traversal",
        "worker_execution",
        "worker_setup",
        "worker_borrow",
        "worker_working",
        "worker_copying_outputs",
        "unknown",
      ],
    },
  },
  {
    name: "--experimental_profile_cpu_usage",
    description:
      "If set, Bazel will measure cpu usage and add it to the JSON profile",
    args: booleanArg,
  },
  {
    name: "--noexperimental_profile_cpu_usage",
    description: "Disables --experimental_profile_cpu_usage",
  },
  {
    name: "--experimental_profile_include_primary_output",
    description:
      "Includes the extra `out` attribute in action events that contains the exec path to the action's primary output",
    args: booleanArg,
  },
  {
    name: "--noexperimental_profile_include_primary_output",
    description:
      "Does not include the extra `out` attribute in action events that contains the exec path to the action's primary output.",
  },
  {
    name: "--experimental_profile_include_target_label",
    description: "Includes target label in action events' JSON profile data",
    args: booleanArg,
  },
  {
    name: "--noexperimental_profile_include_target_label",
    description:
      "Does not include target label in action events' JSON profile data",
  },
  {
    name: "--experimental_stream_log_file_uploads",
    description:
      "Stream log file uploads directly to the remote storage rather than writing them to disk",
    args: booleanArg,
  },
  {
    name: "--noexperimental_stream_log_file_uploads",
    description: "Disables --experimental_stream_log_file_uploads",
  },
  {
    name: "--experimental_workspace_rules_log_file",
    description:
      "Log certain Workspace Rules events into this file as delimited WorkspaceEvent protos",
    args: {
      name: "path",
      template: "filepaths",
    },
  },
  {
    name: "--generate_json_trace_profile",
    description:
      "If enabled, Bazel profiles the build and writes a JSON-format profile into a file in the output base",
    args: booleanArg,
  },
  {
    name: "--nogenerate_json_trace_profile",
    description: "Disables --generate_json_trace_profile",
  },
  {
    name: "--heap_dump_on_oom",
    description:
      "Whether to manually output a heap dump if an OOM is thrown (including OOMs due to {--experimental_oom_more_eagerly_threshold). The dump will be written to <output_base>/<invocation_id>.heapdump.hprof}",
    args: booleanArg,
  },
  {
    name: "--noheap_dump_on_oom",
    description:
      "Do not manually output a heap dump if an OOM is thrown (including OOMs due to {--experimental_oom_more_eagerly_threshold). The dump will be written to <output_base>/<invocation_id>.heapdump.hprof}",
  },
  {
    name: "--json_trace_compression",
    description:
      "If enabled, Bazel compresses the JSON-format profile with gzip",
    args: booleanArg,
  },
  {
    name: "--nojson_trace_compression",
    description: "Disables --json_trace_compression",
  },
  {
    name: "--legacy_important_outputs",
    description:
      "Use this to suppress generation of the legacy important_outputs field in the TargetComplete event",
    args: booleanArg,
  },
  {
    name: "--nolegacy_important_outputs",
    description: "Disables --legacy_important_outputs",
  },
  {
    name: "--logging",
    description: "The logging level",
    args: {
      name: "integer",
      description: "Must be in range of 0-6",
      default: "3",
      suggestions: ["0", "1", "2", "3", "4", "5", "6"],
    },
  },
  {
    name: "--memory_profile_stable_heap_parameters",
    description:
      "Tune memory profile's computation of stable heap at end of build",
    args: [
      {
        name: "integer",
        description: "Number of GCs to perform",
        default: "1",
      },
      {
        name: "integer",
        description: "Number of seconds to wait between GCs",
        default: "0",
      },
    ],
  },
  {
    name: "--profile",
    description:
      "If set, profile Bazel and write data to the specified file. Use bazel analyze-profile to analyze the profile",
    args: {
      name: "path",
      template: "filepaths",
    },
  },
  {
    name: "--project_id",
    description: "Specifies the BES project identifier",
    args: {
      name: "identifier",
    },
  },
  {
    name: "--slim_profile",
    description:
      "Slims down the size of the JSON profile by merging events if the profile gets too large",
    args: booleanArg,
  },
  {
    name: "--noslim_profile",
    description: "Disables --slim_profile",
  },
  {
    name: "--starlark_cpu_profile",
    description:
      "Writes into the specified file a pprof profile of CPU usage by all Starlark threads",
    args: {
      name: "string",
      template: "filepaths",
    },
  },
  {
    name: "--tool_tag",
    description: "A tool name to attribute this Bazel invocation to",
    args: {
      name: "tool name",
    },
  },
  {
    name: "--ui_event_filters",
    description:
      "Specifies which events to show in the UI. It is possible to add or remove events to the default ones using leading +/-, or override the default set completely with direct assignment",
    args: {
      name: "event kind",
      variadic: true,
      suggestions: ["INFO", "DEBUG", "ERROR"],
    },
  },
  {
    name: "--all_incompatible_changes",
    description:
      "Enables all options of the form {--incompatible_*. Use this option to find places where your build may break in the future due to deprecations or other changes}",
  },
  {
    name: "--build_metadata",
    description: "Custom key-value string pairs to supply in a build event.",
    args: {
      name: "key-value pair",
      variadic: true,
    },
  },
  {
    name: "--color",
    description: "Use terminal controls to colorize output",
    args: {
      name: "mode",
      suggestions: ["yes", "no", "auto"],
      default: "auto",
    },
  },
  {
    name: "--config",
    description: "Selects additional config sections from the rc files",
    args: {
      name: "path",
      template: "filepaths",
      variadic: true,
    },
  },
  {
    name: "--curses",
    description: "Use terminal cursor controls to minimize scrolling output",
    args: {
      name: "mode",
      suggestions: ["yes", "no", "auto"],
      default: "auto",
    },
  },
  {
    name: "--enable_platform_specific_config",
    description:
      "If true, Bazel picks up host-OS-specific config lines from bazelrc files",
    args: booleanArg,
  },
  {
    name: "--noenable_platform_specific_config",
    description: "Disables --enable_platform_specific_config",
  },
  {
    name: "--experimental_multi_threaded_digest",
    description:
      "Whether to always compute digests of files with multiple threads. Setting this to false may improve performance when using a spinning platter",
    args: booleanArg,
  },
  {
    name: "--noexperimental_multi_threaded_digest",
    description:
      "Do not compute digests of files with multiple threads. Improves performance when using a spinning platter",
  },
  {
    name: "--experimental_ui_mode",
    description:
      "Determines what kind of data is shown in the detailed progress bar",
    args: {
      name: "mode",
      default: "oldest_actions",
      suggestions: ["oldest_actions", "mnemonic_histogram"],
    },
  },
  {
    name: "--experimental_windows_watchfs",
    description:
      "If true, experimental Windows support for --watchfs is enabled",
    args: booleanArg,
  },
  {
    name: "--noexperimental_windows_watchfs",
    description: "Disables --experimental_windows_watchfs",
  },
  {
    name: "--google_auth_scopes",
    description: "A comma-separated list of Google Cloud authentication scopes",
    args: {
      name: "options",
      description: "comma seperated",
      variadic: true,
    },
  },
  {
    name: "--google_credentials",
    description: "Specifies the file to get authentication credentials from",
    args: {
      name: "string",
      template: "filepaths",
    },
  },
  {
    name: "--google_default_credentials",
    description:
      "Whether to use 'Google Application Default Credentials' for authentication",
    args: booleanArg,
  },
  {
    name: "--nogoogle_default_credentials",
    description:
      "Do NOT use 'Google Application Default Credentials' for authentication",
  },
  {
    name: "--grpc_keepalive_time",
    description: "Configures keep-alive pings for outgoing gRPC connections",
    args: {
      name: "Immutable lenght of time",
      description:
        "Natural number followed by a unit: Days (d), hours (h), minutes (m), seconds (s), and milliseconds (ms)",
    },
  },
  {
    name: "--grpc_keepalive_timeout",
    description:
      "Configures a keep-alive timeout for outgoing gRPC connections",
    args: {
      name: "Immutable lenght of time",
      description:
        "Natural number followed by a unit: Days (d), hours (h), minutes (m), seconds (s), and milliseconds (ms)",
      default: "20s",
    },
  },
  {
    name: "--progress_in_terminal_title",
    description: "Show the command progress in the terminal title",
    args: booleanArg,
  },
  {
    name: "--noprogress_in_terminal_title",
    description: "Disables --progress_in_terminal_title",
  },
  {
    name: "--show_progress",
    description: "Display progress messages during a build",
    args: booleanArg,
  },
  {
    name: "--noshow_progress",
    description: "Do NOT display progress messages during a build",
  },
  {
    name: "--show_progress_rate_limit",
    description:
      "Minimum number of seconds between progress messages in the output",
    args: {
      name: "double",
      description: "seconds",
      default: "0.2",
    },
  },
  {
    name: "--show_task_finish",
    description:
      "Display progress messages when tasks complete, not just when they start",
    args: booleanArg,
  },
  {
    name: "--noshow_task_finish",
    description: "Disables --show_task_finish",
  },
  {
    name: "--show_timestamps",
    description: "Include timestamps in message",
    args: booleanArg,
  },
  {
    name: "--noshow_timestamps",
    description: "Do NOT timestamps in message",
  },
  {
    name: "--tls_certificate",
    description:
      "Specify a path to a TLS certificate that is trusted to sign server certificates",
    args: {
      name: "string",
      template: "filepaths",
    },
  },
  {
    name: "--tls_client_certificate",
    description: "Specify the TLS client certificate to use",
    dependsOn: ["--tls_client_key"],
    args: {
      name: "string",
      template: "filepaths",
    },
  },
  {
    name: "--tls_client_key",
    description: "Specify the TLS client key to use",
    dependsOn: ["--tls_client_certificate"],
    args: {
      name: "string",
    },
  },
  {
    name: "--ui_actions_shown",
    description:
      "Number of concurrent actions shown in the detailed progress bar; each action is shown on a separate line. The progress bar always shows at least one one, all numbers less than 1 are mapped to 1",
    args: {
      name: "integer",
      default: "8",
    },
  },
  {
    name: "--watchfs",
    description:
      "On Linux/macOS: If true, bazel tries to use the operating system's file watch service for local changes instead of scanning every file for a change",
  },
  {
    name: "--nowatchfs",
    description: "Disable --watchfs",
  },
];

export const completionSpec: Fig.Spec = {
  name: "bazel",
  description: "Bazel the build system!",
  subcommands: [
    {
      name: "analyze-profile",
      description: "Analyzes build profile data",
      options: [
        {
          name: "--distdir",
          description:
            "Additional places to search for archives before accessing the network to download them",
          args: {
            name: "path",
            template: ["filepaths", "folders"],
          },
        },
        ...sharedOptions,
      ],
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
