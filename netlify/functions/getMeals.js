const Airtable=require('airtable');const base=new Airtable({apiKey:process.env.patgspUQQUefRrndu.dc9de7a249fa6e76b76e0cb3cb220e8298e11fab8566d98cb06b00acf5fe98b8}).base(process.env.appwnwruZy7ElrUdR.);
exports.handler=async function(){try{const records=await base('Meals').select().all();
const meals=records.map(r=>({id:r.id,name:r.get('Name'),ingredients:r.get('Ingredients')}));
return{statusCode:200,body:JSON.stringify(meals)};}catch(err){return{statusCode:500,body:err.toString()};}};