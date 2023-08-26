// familyTree.js

class Person {
  constructor(name) {
    this.name = name;
    this.relationships = [];
  }

  addRelationship(relationship) {
    this.relationships.push(relationship);
  }

  getRelationships() {
    return this.relationships;
  }
}

class FamilyTree {
  constructor() {
    this.people = {};
  }

  addPerson(name) {
    this.people[name] = new Person(name);
  }

  getPerson(name) {
    return this.people[name];
  }

  addRelationship(name1, relationship, name2) {
    const person1 = this.getPerson(name1);
    const person2 = this.getPerson(name2);

    if (!person1 || !person2) {
      console.log('Person not found.');
      return;
    }

    person1.addRelationship({ name: name2, relationship });
  }

  countSons(name) {
    const person = this.getPerson(name);
    if (!person) {
      return 0;
    }
    return person.getRelationships().filter((rel) => rel.relationship === 'son')
      .length;
  }

  countDaughters(name) {
    const person = this.getPerson(name);
    if (!person) {
      return 0;
    }
    return person
      .getRelationships()
      .filter((rel) => rel.relationship === 'daughter').length;
  }

  countWives(name) {
    const person = this.getPerson(name);
    if (!person) {
      return 0;
    }
    return person
      .getRelationships()
      .filter((rel) => rel.relationship === 'wife').length;
  }

  countFather(name) {
    const person = this.getPerson(name);
    if (!person) {
      return person
        .getRelationships()
        .filter((rel) => rel.relationship === 'father').length;
    }
  }

  fatherOf(name) {
    const person = this.getPerson(name);
    if (!person) {
      return null;
    }
    const fatherRelationship = person
      .getRelationships()
      .find((rel) => rel.relationship === 'father');
    if (fatherRelationship) {
      return fatherRelationship.name;
    }
    return null;
  }
}

const familyTree = new FamilyTree();

module.exports = familyTree;
