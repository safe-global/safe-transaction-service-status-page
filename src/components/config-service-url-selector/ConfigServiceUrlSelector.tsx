import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const VITE_CONFIG_SERVICE_URL = import.meta.env.VITE_CONFIG_SERVICE_URL;

const defaultOptions = [
  {
    label: "Config Service URL",
    value: VITE_CONFIG_SERVICE_URL || "",
  },
];

type ConfigServiceUrlSelectorProps = {
  configServiceUrl?: string;
  setConfigServiceUrl: React.Dispatch<React.SetStateAction<string>>;
};

type optionsType = {
  label: string;
  value: string;
};

// enable filter by label and value
const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option: optionsType) => `${option.label} ${option.value}`,
  trim: true,
});

function ConfigServiceUrlSelector({
  configServiceUrl,
  setConfigServiceUrl,
}: ConfigServiceUrlSelectorProps) {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Box maxWidth={320} marginTop={4} marginBottom={2} component={Paper}>
      <Autocomplete
        id="config-service-url-input"
        freeSolo
        // Config Service value
        value={configServiceUrl}
        onChange={(_, option: string | optionsType | null) => {
          const isStringValue = typeof option === "string";
          const newValue = isStringValue ? option : option?.value;
          setConfigServiceUrl(newValue || "");
        }}
        // input value
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Config Service Url"
            InputLabelProps={{ shrink: true }}
          />
        )}
        // options
        filterOptions={filterOptions}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.value
        }
        options={defaultOptions}
        renderOption={(props, option) => (
          <ListItem {...props}>
            <ListItemText primary={option.label} secondary={option.value} />
          </ListItem>
        )}
      />
    </Box>
  );
}

export default ConfigServiceUrlSelector;
