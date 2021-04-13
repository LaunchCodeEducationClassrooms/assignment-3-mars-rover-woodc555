class Message {
   constructor(name, commands) {
     this.name = name;
     if(!name){
       throw Error("message name required.")
     }
     this.commands = commands;
   }
   
}

module.exports = Message;