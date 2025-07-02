// import connectionInfo from "../schema/db.config.js"
// import  bcrypt from 'bcrypt'
const connectionInfo = require("../schema/db.config.js");
const bcrypt = require('bcrypt');


 let register = (req,res)=>{
    const {user_first_name,user_last_name,user_email,user_password} = req.body

    const isEmail =/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    const isPassword =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?!.*\s).{8,}$/
    const isStringRegex = /^[A-Za-z\s]+$/;

    if(!user_first_name||!user_last_name||!user_email||!user_password){
        res.status(400).send({
            messageToTheFront : "All input fields are required"
        })
    }else if(!isStringRegex.test(user_first_name) || !isStringRegex.test(user_last_name) ){
        res.send({
            messageToTheFront: "First name and last name should be alphabetic characters"
        });
    }else if(!isEmail.test(user_email)){
        res.send({
            messageToTheFront: "Invalid email"
        });

    }else if(!isPassword.test(user_password)){
        res.send({
            messageToTheFront: "Invalid passwrod. password should contain at list eight character containig at list one upper case, one lower case, one number ,and one special character."
        });
    }else{
            connectionInfo.query(`SELECT * FROM users WHERE user_email=?`,[user_email],(err,data,field)=>{
                if(err){
                    res.send({
                        messageToTheFront :'Oops..try again',
                        navigation : '/signup',
                        messageToUser:'click here to try again',
                    })
                }else{
                    if(data.length>0){
                        res.send({
                            messageToTheFront :'User already registered please login',
                            navigation : '/login',
                            messageToUser:'click here to login',
                        })
                    }else{
                      const salt = bcrypt.genSaltSync()
                     let  hashPassword = bcrypt.hashSync(user_password,salt)
                        let registerQuery = `INSERT INTO users (user_first_name,user_last_name,user_email,user_password,user_role)VALUES(?)`
                        let value = [user_first_name,user_last_name, user_email, hashPassword,0]
                        connectionInfo.query(registerQuery,[value],(err,data,field)=>{
                        
                            if(err){
                                console.log(err.message)
                            }else{
                               
                                let forProfile = `INSERT INTO profile(user_id,user_first_name,user_last_name,user_email,user_role)VALUES(?)`
                                let value = [data.insertId,user_first_name,user_last_name,user_email,0]
                                connectionInfo.query(forProfile,[value],(err,data,field)=>{
                            
                                    if(err){
                                        console.log(err)
                                    }else{
                                        res.send({
                                            messageToTheFront :'Registered successfully please LogIn',
                                            navigation : '/login',
                                            messageToUser:'click here to login',
                                        })
                                    }
                                })
                                
                            }
                        })
                    }
                }
            })
        
    }
    
}


 let getAllUsers = (req, res) => {
    const query = `SELECT user_id, user_first_name, user_last_name, user_email, user_role, date_of_registration FROM users`;

    connectionInfo.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err.message);
            return res.status(500).send({
                messageToTheFront: "Unable to fetch users. Please try again later."
            });
        }

        return res.status(200).send({
            messageToTheFront: "Users fetched successfully",
            users: results
        });
    });
};

 let deleteUserById = (req, res) => {
    const { user_id } = req.params;

    if (!user_id || isNaN(user_id)) {
        return res.status(400).send({
            messageToTheFront: "Invalid user ID"
        });
    }

    // Step 1: Delete from profile
    const deleteFromProfile = `DELETE FROM profile WHERE user_id = ?`;

    connectionInfo.query(deleteFromProfile, [user_id], (err, result1) => {
        if (err) {
            console.error("Error deleting from profile:", err.message);
            return res.status(500).send({
                messageToTheFront: "Failed to delete user profile."
            });
        }

        // Step 2: Delete from users
        const deleteFromUsers = `DELETE FROM users WHERE user_id = ?`;

        connectionInfo.query(deleteFromUsers, [user_id], (err, result2) => {
            if (err) {
                console.error("Error deleting user:", err.message);
                return res.status(500).send({
                    messageToTheFront: "Failed to delete user."
                });
            }

            if (result2.affectedRows === 0) {
                return res.status(404).send({
                    messageToTheFront: "User not found"
                });
            }

            return res.status(200).send({
                messageToTheFront: "User deleted successfully"
            });
        });
    });
};


module.exports = {
  register,
  getAllUsers,
  deleteUserById
};
