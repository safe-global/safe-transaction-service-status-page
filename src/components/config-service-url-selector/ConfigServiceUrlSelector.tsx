import { SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { CONFIG_SERVICE_OPTIONS } from "src/constants/configService";

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
        onChange={(
          event: SyntheticEvent,
          option: string | optionsType | null
        ) => {
          const isStringValue = typeof option === "string";
          const newValue = isStringValue ? option : option?.value;
          setConfigServiceUrl(newValue || "");
        }}
        // input value
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
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
        options={CONFIG_SERVICE_OPTIONS}
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
