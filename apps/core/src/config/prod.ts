import { type EnvConfig } from "./types";

const config: DeepPartial<EnvConfig> = {
  featureFlags: {
    fflag_example_toggle: {
      value: false,
      team: "ABC",
      description: "Toggles something",
    },
  },
};

export default config;
