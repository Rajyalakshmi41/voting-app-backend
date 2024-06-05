
import mongoose from 'mongoose';

const db=async()=>{

    try {
        const mongoURL = process.env.MONGODB_URL_LOCAL;

const handleConnection=await mongoose.connect(mongoURL)
// console.log(handleConnection)
const isConnected=handleConnection.connections[0].readyState;
if(isConnected)
    console.log("db connected")



    } catch (error) {
        console.log(error)        
    }

}
export {db}