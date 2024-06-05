
import express from 'express';
const app= express();
import 'dotenv/config'
import { db } from './db.js';
db();
app.use(express.json());

const PORT =process.env.PORT || 3000;


import  userRouter  from './routes/userRoutes.js';
import  candidateRouter   from './candidateRoutes.js';
app.use('/user', userRouter);
app.use('/candidate', candidateRouter);


app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
})