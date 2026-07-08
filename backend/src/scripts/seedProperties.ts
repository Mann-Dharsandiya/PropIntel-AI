 import { connectDB, disconnectDB } from "../config/db";
import { PropertyModel } from "../models/Property.model";
import { UserModel } from "../models/User.model";

function getPropertyImage(type:string,index:number):string{
 const apartment=[
 "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"];
 const villa=[
 "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"];
 const house=[
 "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"];
 const plot=[
 "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"];
 const commercial=[
 "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
 "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80"];
 switch(type){case "Apartment":return apartment[index%3];case "Villa":return villa[index%3];case "House":return house[index%3];case "Plot":return plot[index%3];case "Commercial":return commercial[index%3];default:return house[0];}
}

async function seed(){
 try{
  await connectDB();
  await PropertyModel.deleteMany({});
  const owner=await UserModel.findOne();
  if(!owner) throw new Error("No users found.");
  const types=["Apartment","House","Villa","Plot","Commercial"] as const;
  const cities=[["Ahmedabad","Gujarat"],["Surat","Gujarat"],["Vadodara","Gujarat"],["Rajkot","Gujarat"],["Mumbai","Maharashtra"],["Pune","Maharashtra"],["Goa","Goa"],["Bengaluru","Karnataka"],["Hyderabad","Telangana"],["Gandhinagar","Gujarat"]];
  const properties:any[]=[];
  for(let i=1;i<=25;i++){
    const type=types[(i-1)%types.length];
    const city=cities[(i-1)%cities.length];
    properties.push({
      title:`Premium ${type} ${i}`,
      description:`Beautiful ${type.toLowerCase()} in ${city[0]} with premium amenities.`,
      price:5000000+i*350000,
      propertyType:type,
      bedrooms:type==="Commercial"||type==="Plot"?0:(i%5)+1,
      bathrooms:type==="Commercial"?2:type==="Plot"?0:(i%3)+1,
      area:1000+i*120,
      address:`${100+i}, Prime Location`,
      city:city[0],
      state:city[1],
      country:"India",
      images:[getPropertyImage(type,i)],
      owner:owner._id,
      status:"available"
    });
  }
  await PropertyModel.insertMany(properties);
  console.log(`Inserted ${properties.length} properties`);
  await disconnectDB();
 }catch(e){console.error(e);await disconnectDB();}
}
seed();

