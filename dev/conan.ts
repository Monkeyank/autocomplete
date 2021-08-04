// export const completion: Fig.Spec = {
//     name: "conan",
//     description: "C/C++ package manager",
//     subcommands: [
//       {
//         name: "install",
//         description: "Installs the requirements specified in a recipe (conanfile.py or conanfile.txt)",
//         args: [
//           {
//             name: "path_or_reference",
//             description: "Path to a folder containing a recipe (conanfile.py or conanfile.txt) or to a recipe file. e.g., ./my_project/conanfile.txt",
//             template: ["folders", "filepaths"]
//           },
//           {
//             name: "reference",
//             description: "Reference for the conanfile path of the first argument: user/channel, version@user/channel or pkg/version@user/channel(if name or version declared in conanfile.py, they should match)"
//           }
//         ],
//         options: [
//           {
//             name: ["-h", "--help"],
//             description: "Show this help message and exit"
//           },
//           {
//             name: ["-g", "--generator"],
//             description: "Generators to use",
//             args: {
//               name: "GENERATOR"
//             }
//           },
//           {
//             name: ["-if", "--install-folder"],
//             description: "Use this directory as the directory where to put the generatorfiles. e.g., conaninfo/conanbuildinfo.txt",
//             args: {
//               name: "INSTALL_FOLDER",
//               template: "folders"
//             }
//           },
//           {
//             name: ["-m", "--manifests"],
//             description: "Install dependencies manifests in folder for later verify. Default folder is .conan_manifests, but can be changed",
//             args: {
//               name: "manifests",
//               template: "folders",
//               isOptional: true,
//               default: ".conan_manifests"
//             }
//           },
//           {
//             name: ["-mi", "--manifests-interactive"],
//             description: "Install dependencies manifests in folder for later verify, asking user for confirmation. Default folder is .conan_manifests, but can be changed",
//             args: {
//               name: "MANIFESTS_INTERACTIVE",
//               template: "folders",
//               isOptional: true,
//               default: ".conan_manifests"
//             }
//           },
//           {
//             name: ["-v", "--verify"],
//             description: "Verify dependencies manifests against stored ones",
//             args: {
//               name: "Verify",
//               isOptional: true,
//             }
//           },
//           {
//             name: "--no-imports",
//             description: "Install specified packages but avoid running imports"
//           },
//           {
//             name: "--build-require",
//             description: "The provided reference is a build-require"
//           },
//           {
//             name: "-j JSON, --json JSON",
//             description: "Path to a json file where the install information will be written",
//             args: {
//               name: "JSON",
//               generators: {
//                 template: "filepaths",
//                 filterTemplateSuggestions: function (paths) {
//                   return paths
//                     .filter((file) => {
//                       if (typeof file.name === "string") {
//                         return file.name.endsWith(".json") || file.name.endsWith("/");
//                       }
//                       return false;
//                     })
//                     .map((file) => {
//                       const isJSONFile =
//                         typeof file.name === "string" && file.name.endsWith(".json");

//                       return {
//                         ...file,
//                         priority: isJSONFile && 76,
//                       };
//                     });
//                 },
//               },
//             }
//           },
//           {
//             name: "-b [BUILD], --build [BUILD]",
//             description: ""
//           },
//                           Optional, specify which packages to build from source.
//                           Combining multiple '--build' options on one command
//                           line is allowed. For dependencies, the optional
//                           'build_policy' attribute in their conanfile.py takes
//                           precedence over the command line parameter. Possible
//                           parameters: --build Force build for all packages, do
//                           not use binary packages. --build=never Disallow build
//                           for all packages, use binary packages or fail if a
//                           binary package is not found. Cannot be combined with
//                           other '--build' options. --build=missing Build
//                           packages from source whose binary package is not
//                           found. --build=outdated Build packages from source
//                           whose binary package was not generated from the latest
//                           recipe or is not found. --build=cascade Build packages
//                           from source that have at least one dependency being
//                           built from source. --build=[pattern] Build packages
//                           from source whose package reference matches the
//                           pattern. The pattern uses 'fnmatch' style wildcards.
//                                 {
//                                   name: "--build=![pattern] Excluded packages, which will not",
//                                   description: ""
//                                 },
//                           be built from the source, whose package reference
//                           matches the pattern. The pattern uses 'fnmatch' style
//                           wildcards. Default behavior: If you omit the '--build'
//                           option, the 'build_policy' attribute in conanfile.py
//                           will be used if it exists, otherwise the behavior is
//                           like '--build=never'.
//           {
//             name: "-r REMOTE, --remote REMOTE",
//             description: ""
//           },
//                           Look in the specified remote server
//           {
//             name: "-u, --update          Will check the remote and in case a newer version",
//             description: ""
//           },
//                           and/or revision of the dependencies exists there, it
//                           will install those in the local cache. When using
//                           version ranges, it will install the latest version
//                           that satisfies the range. Also, if using revisions, it
//                           will update to the latest revision for the resolved
//                           version range.
//           {
//             name: "-l LOCKFILE, --lockfile LOCKFILE",
//             description: ""
//           },
//                           Path to a lockfile
//           {
//             name: "--lockfile-out LOCKFILE_OUT",
//             description: ""
//           },
//                           Filename of the updated lockfile
//           {
//             name: "-e ENV_HOST, --env ENV_HOST",
//             description: ""
//           },
//                           Environment variables that will be set during the
//                           package build (host machine). e.g.: -e
//                           CXX=/usr/bin/clang++
//           {
//             name: "-e:b ENV_BUILD, --env:build ENV_BUILD",
//             description: ""
//           },
//                           Environment variables that will be set during the
//                           package build (build machine). e.g.: -e:b
//                           CXX=/usr/bin/clang++
//           {
//             name: "-e:h ENV_HOST, --env:host ENV_HOST",
//             description: ""
//           },
//                           Environment variables that will be set during the
//                           package build (host machine). e.g.: -e:h
//                           CXX=/usr/bin/clang++
//           {
//             name: "-o OPTIONS_HOST, --options OPTIONS_HOST",
//             description: ""
//           },
//                           Define options values (host machine), e.g.: -o
//                           Pkg:with_qt=true
//           {
//             name: "-o:b OPTIONS_BUILD, --options:build OPTIONS_BUILD",
//             description: ""
//           },
//                           Define options values (build machine), e.g.: -o:b
//                           Pkg:with_qt=true
//           {
//           name: "-o:h OPTIONS_HOST, --options:host OPTIONS_HOST",
//           description: ""
//         },
//                           Define options values (host machine), e.g.: -o:h
//                           Pkg:with_qt=true
//           {
//           name: "-pr PROFILE_HOST, --profile PROFILE_HOST",
//           description: ""
//         },
//                           Apply the specified profile to the host machine
//           {
//           name: "-pr:b PROFILE_BUILD, --profile:build PROFILE_BUILD",
//           description: ""
//         },
//                           Apply the specified profile to the build machine
//           {
//           name: "-pr:h PROFILE_HOST, --profile:host PROFILE_HOST",
//           description: ""
//         },
//                           Apply the specified profile to the host machine
//           {
//           name: "-s SETTINGS_HOST, --settings SETTINGS_HOST",
//           description: ""
//         },
//                           Settings to build the package, overwriting the
//                           defaults (host machine). e.g.: -s compiler=gcc
//           {
//           name: "-s:b SETTINGS_BUILD, --settings:build SETTINGS_BUILD",
//           description: ""
//         },
//                           Settings to build the package, overwriting the
//                           defaults (build machine). e.g.: -s:b compiler=gcc
//           {
//           name: "-s:h SETTINGS_HOST, --settings:host SETTINGS_HOST",
//           description: ""
//         },
//                           Settings to build the package, overwriting the
//                           defaults (host machine). e.g.: -s:h compiler=gcc
//           {
//           name: "-c CONF_HOST, --conf CONF_HOST",
//           description: ""
//         },
//                           Configuration to build the package, overwriting the defaults (host machine). e.g.: -c
//                           tools.cmake.cmaketoolchain:generator=Xcode
//           {
//           name: "-c:b CONF_BUILD, --conf:build CONF_BUILD",
//           description: ""
//         },
//                           Configuration to build the package, overwriting the defaults (build machine). e.g.: -c:b
//                           tools.cmake.cmaketoolchain:generator=Xcode
//           {
//           name: "-c:h CONF_HOST, --conf:host CONF_HOST",
//           description: ""
//         },
//                           Configuration to build the package, overwriting the defaults (host machine). e.g.: -c:h
//                           tools.cmake.cmaketoolchain:generator=Xcode
//           {
//           name: "--lockfile-node-id LOCKFILE_NODE_ID",
//           description: ""
//         },
//                           NodeID of the referenced package in the lockfile
//           {
//           name: "--require-override REQUIRE_OVERRIDE",
//           description: ""
//         },
//                           Define a requirement override
//         ]
//       },
//       {
//         name: "config"
//       },
//       {
//         name: "get"
//       },
//       {
//         name: "info"
//       },
//       {
//         name: "search"
//       },
//       {
//         name: "create"
//       },
//       {
//         name: "export"
//       },
//       {
//         name: "export-pkg"
//       },
//       {
//         name: "new"
//       },
//       {
//         name: "upload"
//       },
//       {
//         name: "test"
//       },
//       {
//         name: "source"
//       },
//       {
//         name: "build"
//       },
//       {
//         name: "package"
//       },
//       {
//         name: "editable"
//       },
//       {
//         name: "workspace"
//       },
//       {
//         name: "profile"
//       },
//       {
//         name: "remote"
//       },
//       {
//         name: "user"
//       },
//       {
//         name: "imports"
//       },
//       {
//         name: "copy"
//       },
//       {
//         name: "download"
//       },
//       {
//         name: "remove"
//       },
//       {
//         name: "alias"
//       },
//       {
//         name: "inspect"
//       },
//       {
//         name: "lock"
//       },
//       {
//         name: "lock bundle"
//       },
//       {
//         name: "help"
//       },
//     ],
//     options: [],
//     // Only uncomment if conan takes an argument
//     // args: {}
//   };
