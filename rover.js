class Rover {
   constructor (position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   };

   receiveMessage(message) {
     let resultsArray = [];
     for (let command of message.commands) {
       if (command.commandType === 'MOVE') {
         if (this.mode !== 'LOW_POWER') {
           this.position = command.value;
           resultsArray.push({completed: true});
         }
         else {
           resultsArray.push({completed: false});
         }
       }
       else if (command.commandType === 'STATUS_CHECK'){
         let mode = this.mode;
         let generatorWatts = this.generatorWatts;
         let currentPosition = this.position;
         resultsArray.push({comleted: true, roverStatus: {mode: mode, generatorWatts: generatorWatts, position: currentPosition}});
       }
       else if (command.commandType === 'MODE_CHANGE') {
         if (this.mode !== command.value){
           this.mode = command.value;
           resultsArray.push({completed: true});
         }
         else {
           resultsArray.push({comleted: false});
         }
       }
     }
     return {message: message.name, results: resultsArray};
   }
}

module.exports = Rover;