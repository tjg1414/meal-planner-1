const Airtable=require('airtable');const base=new Airtable({apiKey:process.env.patgspUQQUefRrndu.dc9de7a249fa6e76b76e0cb3cb220e8298e11fab8566d98cb06b00acf5fe98b8}).base(process.env.appwnwruZy7ElrUdR.);
exports.handler=async function(event){try{const{name,ingredients}=JSON.parse(event.body);
const created=await base('Meals').create([{fields:{Name:name,Ingredients:JSON.stringify(ingredients)}}]);
return{statusCode:200,body:JSON.stringify({id:created[0].id})};}catch(err){return{statusCode:500,body:err.toString()};}};