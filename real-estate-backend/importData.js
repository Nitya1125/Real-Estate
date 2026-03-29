const csv = require("csvtojson")

const connectDB = require("./config/db")
const Property = require("./models/Property")

connectDB();

const importData = async ()=>{
    try{
        const data = await csv().fromFile("./data/properties.csv");

        await Property.insertMany(data);

        console.log("Data Imported Successfully");
        process.exit();
    }catch(err){
        console.log(err)
        process.exit(1);
    }
};

importData();