const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

if(process.env.NODE_ENV==="production")
{
    app.use(express.static('client/covid-19/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','covid-19','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on port : ",5000);
})