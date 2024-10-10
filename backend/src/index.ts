import app from "./app.js";
import { connectDB, disconnectDB } from "./db/connectiondb.js";



connectDB().then(()=>{
    app.listen(5000, () => {
        console.log(`listening on port ${5000}`)
    })
}).catch((error) => {
    console.log(error);
})