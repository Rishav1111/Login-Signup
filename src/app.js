const express = require("express");
const path = require("path")
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/register")

const port = process.env.PORT || 301;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});
app.get("/login", (req,res)=>{
    res.render("login")
})

app.post("/register",async (req, res) => {
    try{

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password=== cpassword){

            const registerUser = new Register({
                fullname: req.body.fullname,
                usernmae: req.body.usernmae,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                password:password,
                confirmpassword: cpassword
            })

            console.log(registerUser)
            const registered = await registerUser.save();

        }else{
            res.send("Password are not matching")
        }

    }catch(error){
        res.status(400).send(error);
    }
});

app.post("/login", async(req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.send("Login Successfully")
        }else{
            res.send("Incorrect Password")
        }

    }catch(error){
        res.status(400).send(error)
    }
})
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});

