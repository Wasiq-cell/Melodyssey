import {useState} from "react";
import {useCookies} from "react-cookie";
import {Icon} from '@iconify/react';
import Text from './inputs/Text';
import Password from "./inputs/Password";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import {makeUnauthenticatedPOSTRequest} from "../utils/server";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email fields must match. Please check again.")
      return;
    }
    const data = {email, password, username, firstName, lastName};
    const response = await makeUnauthenticatedPOSTRequest ("/auth/register", data);
    if(response && !response.err) {
        console.log(response);
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, {path: "/", expires: date});
        alert("Success");
        navigate("/home");
    }else{
        alert("Failure")
    }
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    width: "300px",
    height: "20px",
    fontSize: "1.1rem",
    padding: "5px 5px",
    color: "#525252",
  }));


  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex flex-col items-center justify-center">
        <Icon icon="arcticons:heymelody" color="green" width="80" height="80" />
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Melodyssey
        </Typography>
      </div>

      <div className="inputRegion w-1/3 py-10 flex flex-col items-center justify-center">
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Sign up for free to start listening.
        </Typography>

        <div className="my-6 w-full">
          <TextField
            label="What's your email"
            placeholder="Enter your email."
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 w-full">
          <TextField
            label="Confirm your email"
            placeholder="Enter your email again."
            fullWidth
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 w-full">
          <TextField
            label="Username"
            placeholder="Enter your username."
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6 w-full">
          <TextField
            label="Create a password"
            placeholder="Create a password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full space-x-8">
          <TextField
            label="Your first name"
            placeholder="Enter your first name."
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Your last name"
            placeholder="Enter your last name."
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="w-full flex items-center justify-center my-8">
        <Button variant="contained" color="success" type="submit" size="large" sx={{ borderRadius: '20px' }}  onClick={(e) => {e.preventDefault();signUp();}}>

            Sign up
          </Button>
        </div>

        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-lg">Already have an account?</div>

        <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
          <CustomButton component={Link} to="/login">
            LOGIN Instead...
          </CustomButton>
        </div>
      </div>
    </div>
  );
}