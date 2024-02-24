import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { makeUnauthenticatedPOSTRequest } from "../utils/server";
import useAuth from "../utils/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { loginUrl } = useAuth();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  const handleSpotifyLogin = () => {
    window.location.href = loginUrl;
  };

  const handleCombinedLogin = async (e) => {
    e.preventDefault();
    await login();
    handleSpotifyLogin();
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    width: "300px",
    height: "20px",
    fontSize: "1.1rem",
    padding: "5px 5px",
    color: "#525252",
  }));

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex flex-col items-center justify-center">
        <Icon icon="arcticons:heymelody" color="green" width="80" height="80" />
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Melodyssey
        </Typography>
      </div>

      <div className="inputRegion w-1/3 py-8 flex flex-col items-center justify-center">
        <Typography variant="h6" color="textPrimary" gutterBottom>
          To continue, log in to Melodyssey.
        </Typography>
        <form onSubmit={handleCombinedLogin} className="w-full">
          <div className="my-2 w-full">
            <TextField
              label="Email address"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-4 w-full">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-4 w-full text-right">
            <Button variant="contained" color="success" type="submit" size="large" sx={{ borderRadius: '20px' }}  onClick={(e) => {e.preventDefault();login();}}>
              LOG IN
            </Button>
          </div>
        </form>

        <div className="w-full border-b border-solid border-gray-300 my-4"></div>

        <Typography variant="subtitle1" color="textSecondary" align="center" className="my-4">
          Don't have an account?{" "}
          </Typography>
        <br/>
        <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
        <CustomButton component={Link} to="/signup">
          SIGN UP FOR MELODYSSEY
        </CustomButton>       
       </div>
      </div>
    </div>
  );
}
