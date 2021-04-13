const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover1 = new Rover(500);
    expect(rover1.position).toEqual(500);
    expect(rover1.mode).toEqual('NORMAL');
    expect(rover1.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Another message!', commands);
    let rover1 = new Rover(600);
    let response = rover1.receiveMessage(message);
    expect(response.message).toEqual("Another message!");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Another message!', commands);
    let rover1 = new Rover(600);
    let response = rover1.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Another message!', commands);
    let rover1 = new Rover(600);
    let response = rover1.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(600);
  });

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Another message!', commands);
    let rover1 = new Rover(600);
    let commands2 = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message2 = new Message('Yet another message!', commands2);
    let rover2 = new Rover(700);
    let response = rover1.receiveMessage(message);
    let response2 = rover2.receiveMessage(message2);
    expect(response.results[0].completed).toEqual(false);
    expect(rover1.mode).toEqual('NORMAL');
    expect(response2.results[0].completed).toEqual(true);
    expect(rover2.mode).toEqual('LOW_POWER');
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Another message!', commands);
    let rover1 = new Rover(600);
    rover1.receiveMessage(message);
    let commands2 = [new Command('MOVE', 20)];
    let message2 = new Message('Yet another message!', commands2);
    let response = rover1.receiveMessage(message2);
    expect(response.results[0].completed).toEqual(false);    
  });

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MOVE', 20)];
    let message = new Message('Another message!', commands);
    let rover1 = new Rover(600);
    let response = rover1.receiveMessage(message);
    expect(rover1.position).toEqual(20);
  });

});
