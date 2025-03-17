import connectionInfo from "../schema/db.config.js"
import  bcrypt from 'bcrypt'
export let register = (req,res)=>{
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
export default register;

