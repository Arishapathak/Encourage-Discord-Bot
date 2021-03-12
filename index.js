const Discord= require("discord.js")
const fetch=require("node-fetch")
const client=new Discord.Client()

const sad=["low","down","sad","unhappy","angry","unfair","bad"]

const encouragements=["You are the best buddy.Cheer Up!",
"Hang in there!",
"Don't worry.It's just a phase.",
"You are an amazing person /bot!"]

function giveMeAQuote()
{
  return fetch("https://zenquotes.io/api/random")
  .then(result=>{
    return result.json()
  }).then(quote=>{
    return quote[0]["q"] + " - "+ quote[0]["a"]
  })
}

client.on("ready",()=>{
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message",msg=> {
  if(msg.author.bot) return
  if(msg.content==="$inspire"){
  giveMeAQuote().then(myquote=>msg.channel.send(myquote))
  }

  if(sad.some(word=>msg.content.includes(word))){
    const encourage=encouragements[Math.floor(Math.random()*encouragements.length)]
    msg.reply(encourage)
  }

})

client.login(process.env.TOKEN)
