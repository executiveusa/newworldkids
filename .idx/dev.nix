{ pkgs, ... }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_22***REMOVED***,
    pkgs.yarn,
    pkgs.turbo,
    pkgs.openjdk
  ];
  env = {
    SOME_ENV_VAR = "hello";
  };
  idx.extensions = [
    "angular.ng-template"
  ];
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "yarn",
          "run",
          "dev:web",
          "--",
          "--port",
          "$PORT",
          "--hostname",
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
