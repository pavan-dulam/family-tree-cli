const readline = require('readline');

// Data structure to store family relationships
const familyTree = {
  people: {},
  relationships: {},
};

// Function to add a person to the family tree
function addPerson(name) {
  familyTree.people[name] = { name, relationships: [] };
}

// Function to add a relationship
function addRelationship(personName, relationship) {
  familyTree.relationships[relationship] = personName;
}

// Function to connect two people with a relationship
function connectPeople(person1, relationship, person2) {
  if (!familyTree.people[person1] || !familyTree.people[person2]) {
    console.log('Person not found.');
    return;
  }

  familyTree.people[person1].relationships.push({
    relationship,
    person: person2,
  });
}

// Function to count relationships of a specific type
function countRelationships(personName, relationshipType) {
  const person = familyTree.people[personName];
  if (!person) {
    console.log('Person not found.');
    return 0;
  }

  const count = person.relationships.filter(
    (rel) => rel.relationship === relationshipType
  ).length;
  return count;
}

// Function to get father's name
function getFather(personName) {
  const person = familyTree.people[personName];
  if (!person) {
    console.log('Person not found.');
    return '';
  }

  const fatherRel = person.relationships.find(
    (rel) => rel.relationship === 'father'
  );
  if (fatherRel) {
    return familyTree.relationships[fatherRel.person];
  }
  return '';
}

// Initialize the command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  const args = input.trim().split(' ');
  const command = args[0];

  if (command === 'family-tree') {
    const subCommand = args[1];
    if (subCommand === 'add') {
      const action = args[2];
      if (action === 'person') {
        const personName = args.slice(3).join(' ');
        addPerson(personName);
      } else if (action === 'relationship') {
        const relationshipType = args[3];
        addRelationship(relationshipType, args[4]);
      }
    } else if (subCommand === 'connect') {
      const person1 = args[2];
      const relationship = args[4];
      const person2 = args.slice(7).join(' ');
      connectPeople(person1, relationship, person2);
    } else if (subCommand === 'count') {
      const countType = args[2];
      const personName = args.slice(4).join(' ');

      if (countType === 'sons') {
        console.log(countRelationships(personName, 'son'));
      } else if (countType === 'daughters') {
        console.log(countRelationships(personName, 'daughter'));
      } else if (countType === 'wives') {
        console.log(countRelationships(personName, 'wife'));
      }
    } else if (subCommand === 'father') {
      const personName = args.slice(3).join(' ');
      console.log(getFather(personName));
    }
  }
});


/*
family-tree add person <name>
eg: family-tree add Amit Dhakad
family-tree add relationship <name>
eg: family-tree add relationship father
eg: family-tree add relationship son
family-tree connect <name 1> as <relationship> of <name 2>
eg: family-tree connect Amit Dhakad as son of KK Dhakad
*/