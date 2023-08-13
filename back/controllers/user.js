import User from '../models/user.js'

export const  createUser = async (req, res, next)=>{
    const newUser = new User({...req.body});
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    }catch(err){
        next(err);


        
    }
}


// export const createHotel = async (req, res, next) => {
//   const newHotel = new Hotel(req.body);

//   try {
//     const savedHotel = await newHotel.save();
//     res.status(200).json(savedHotel);
//   } catch (err) {
//     next(err);
//   }
// };
