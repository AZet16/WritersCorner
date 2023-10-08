import User from "../models/User";

/*Read */
export const getUser = async (req, res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).json(user);

        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getUserFollowers = async (req, res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const followers = await Promise.all(
            user.followers.map((id) => User.findById(id))
        );
        const formatFollowers = followers.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formatFollowers);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

/*Update */
export const addRemoveFollower = async (req, res) => {
    try {
        const { id, followerId } = req.params;
        const user = await User.findById(id);
        const follower = await User.findById(followerId);


        if (user.followers.includes(followerId)) {
            user.followers = user.followers.filter((id) => id !== followerId); //filter remove if such follower id exists
            follower.followers= user.followers.filter((id) => id !== id); //remove the user from followers list
        } else { 
            user.followers.push(followerId);//add to user follower list
            follower.followers.push(id)//add user to the follower list
        }

        await user.save();
        await follower.save();

        //update and format
        const followers = await Promise.all(
            user.followers.map((id) => User.findById(id))
        );
        const formatFollowers = followers.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formatFollowers);

    } catch (error) {
        res.status(404).json({message:error.message});

    }
}
