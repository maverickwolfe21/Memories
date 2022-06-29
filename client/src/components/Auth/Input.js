import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  autofocus,
  half,
  name,
  label,
  type,
  handleChange,
  handleShowPassword,
  required,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        style={{
          marginTop: 4,
          marginBottom: 4,
          marginRight: 5,
        }}
        autoFocus={autofocus}
        name={name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required={required}
        label={label}
        type={type}
        InputProps={
          name == "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
