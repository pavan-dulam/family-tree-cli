// cli.js

const readline = require('readline');
const familyTree = require('./familyTree');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentAction = '';
let currentSubAction = '';
let currentName = '';

function prompt() {
  rl.question('Enter command: ', (command) => {
    processCommand(command);
  });
}

function processCommand(command) {
  const parts = command.split(' ');
  const action = parts[0];

  if (action === 'family-tree') {
    currentAction = action;
    const subAction = parts[1];
    if (subAction === 'add') {
      currentSubAction = subAction;
      const subCommand = parts[2];
      if (subCommand === 'person') {
        currentName = parts.slice(3).join(' ');
        familyTree.addPerson(currentName);
      } else if (subCommand === 'relationship') {
        currentSubAction = subCommand;
        const relationship = parts.slice(3).join(' ');
        familyTree.addRelationship(currentName, relationship);
      }
    } else if (subAction === 'connect') {
      currentSubAction = subAction;
      handleConnect(parts.slice(2));
    } else if (subAction === 'count') {
      currentSubAction = subAction;
      handleCountQuery(parts.slice(2));
    } else if (subAction === 'father') {
      currentSubAction = subAction;
      handleFatherQuery(parts.slice(2));
    } else {
      console.log('Invalid sub-action.');
    }
  }

  prompt();
}

function handleConnect(args) {
  if (args[1] === 'as' && args[3] === 'of') {
    const relationship = args[0];
    const childName = args[2];
    const parentName = args.slice(5, -2).join(' ');
    familyTree.addRelationship(parentName, relationship, childName);
  } else {
    console.log('Invalid connect command.');
  }
}

function handleCountQuery(args) {
  const targetName = args.slice(2).join(' ');
  if (args[0] === 'sons') {
    console.log(
      `Number of sons of ${targetName}: ${familyTree.countSons(targetName)}`
    );
  } else if (args[0] === 'daughters') {
    console.log(
      `Number of daughters of ${targetName}: ${familyTree.countDaughters(
        targetName
      )}`
    );
  } else if (args[0] === 'wives') {
    console.log(
      `Number of wives of ${targetName}: ${familyTree.countWives(targetName)}`
    );
  } else {
    console.log('Invalid count query.');
  }
}

function handleFatherQuery(args) {
  const targetName = args.join(' ');
  const fatherName = familyTree.fatherOf(targetName);
  if (fatherName) {
    console.log(`Father of ${targetName}: ${fatherName}`);
  } else {
    console.log(`No father found for ${targetName}.`);
  }
}

prompt();
