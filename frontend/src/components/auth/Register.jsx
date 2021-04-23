import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
// import '../../styles.css'

function Register () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {email, password, passwordCheck, displayName};
            await axios.post("http://localhost:5000/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:5000/users/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
   
    return ( 
        <div class=" ">
            
            <div  class ="" className="register"><br/>
                <h2>Register</h2><br/>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <form class="" onSubmit={submit}>
                    <label>Email: </label><br/>
                    <input type="email" id="email" onChange={e => setEmail(e.target.value)}/> <br/><br/>
                    <label>Password: </label><br/>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)}/><br/><br/>
                    <label> Confirm Password: </label><br/>
                    <input type="password"  onChange={e => setPasswordCheck(e.target.value)}/> <br/> <br/>
                    <label>Display name </label><br/>
                    <input type="text" id="dsplay-name" onChange={e => setDisplayName(e.target.value)}/> <br/><br/><br/>
                    <input type="submit" value="Register" className="btn btn-primary" />
                </form>
            </div>
        </div>
        );
}
 
export default Register;

{/* <div class="contact-form">
<h2>Contact Us</h2>
<form class="contact" action="" method="post">
  <input type="text" name="name" class="text-box" placeholder="Your Name" required>
  <input type="email" name="email" class="text-box" placeholder="Your Email" required>
  <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
  <input type="submit" name="submit" class="send-btn" value="Send">
</form>
</div> */}