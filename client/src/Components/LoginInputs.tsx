import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLoginUserMutation } from "../api/usersApi";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setShowModal } from "../redux/loginModal";

export default function LoginInputs() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [login, { error, isSuccess, data: userData }] = useLoginUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [isSuccess]);

  const handleCloseModal = () => {
    dispatch(setShowModal());
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      email: emailInput,
      password: passwordInput,
    });
  };

  return (
    <>
      {error && <p id="err">Invalid Credentials</p>}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          id="submit-btn"
          type="submit"
        >
          Login
        </Button>
      </Box>
    </>
  );
}
