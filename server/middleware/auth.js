import jwt from "jsonwebtoken";

//note: use this function (verifyToken) in routes before the last logic


/*Authorisation: check if currenty logged in user has authority to do what they want to do */
export const verifyToken = async (req, res, next) => { //next allows the function to continue
    try {
        let token = req.header("Authorisation"); //from request of frontend we set token based on the header recieved

        if (!token) { return res.status(403).json("Access Denied"); }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft(); //getting actual token
        }


        //check token gathered matched the one of the user
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next();


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}