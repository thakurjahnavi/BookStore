const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

router.put("/add-cart",authenticateToken,async(req,res)=>{
    try{
            const{bookid,id} = req.headers;
            const userdata = await User.findById(id);
            const isBookinCart = userdata.cart.includes(bookid);
            if(isBookinCart){
                return res.json({status:"success",message:"book is already added to cart"});
            }
            await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
            return res.json({status:"success",message:"book is added to Cart successfully"});
    }
    catch(err){
        return res.status(500).json({message:"Internal Server error",err});
    }
});

router.put("/remove-fromCart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndDelete(id,{$pull:{cart:bookid}});
        return res.json({status:"success",message:"successfully removed from cart"});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"+err});
    }
});

router.get("/get-user-cart",authenticateToken,async (req,res)=>{
    try{
        const {id} = req.headers;
        const userdata = await User.findById(id).populate("cart")
        const carts = userdata.cart.reverse();
        return res.json({status:"success",data:carts});
    } 
    catch(err){
        return res.status(500).json({message:"Internal Server error"+err});
    }
});
module.exports = router;