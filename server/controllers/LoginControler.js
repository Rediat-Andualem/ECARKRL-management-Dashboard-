import connectionInfo from "../schema/db.config.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export let login = (req, res) => {
    const { email, password } = req.body;
    const isEmail =/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    const isPassword =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?!.*\s).{8,}$/

    // Validator
    if (!email || !password) {
        res.send({
            messageToTheFront: "All fields are required"
        });
    }else if(!isEmail.test(email)){
        res.send({
            messageToTheFront: "invalid email"
        });
    }else if(!isPassword){
        res.send({
            messageToTheFront: "invalid passwrod. password should contain at list eight character containing at list one upper case, one lower case, one number ,and one special character."
        });
    } else {
        let userChecker = `SELECT user_email,user_role, user_password, user_id, user_first_name FROM users WHERE user_email = '${email}'`;

        connectionInfo.query(userChecker, (err, result, fields) => {
            if (err) {
                console.log(err.message);
                res.status(500).send({
                    messageToTheFront: "Internal server error"
                });
            } else {
                if (result.length === 0) {
                    res.send({
                        messageToTheFront: "wrong cridential, please try again...",
                        messageToUser: "Click here to sign up",
                        navigation: "/signup"
                    });
                } else {
                    const userData = result[0];
                    const compare = bcrypt.compareSync(password, userData.user_password);
                    if (!compare) {
                        res.send({
                            messageToTheFront: "wrong credential, please try again...",
                            messageToUser: "Click here to sign up",
                            navigation: "/signup"
                        });
                       
                    } else {
                        console.log(userData)
                        const accessToken = jwt.sign({ id: userData.user_id, display_name: userData.user_first_name,user_role:userData.user_role,user_email:userData.user_email }, process.env.JWT_SECRET, { expiresIn: "30d" }); 

                        
                        res.send({
                            token: accessToken,
                            messageToTheFront: "Login successful"
                        });
                    }
                }
            }
        });
    }
};














