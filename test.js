// test.js

const assert = require('assert');
const familyTree = require('./familyTree');

// Add some people for testing
familyTree.addPerson('Amit Dhakad');
familyTree.addPerson('KK Dhakad');
familyTree.addPerson('John Doe');
familyTree.addPerson('Jane Doe');

// Test cases
describe('Family Tree Commands', () => {
  it('should add a person', () => {
    assert.strictEqual(familyTree.getPerson('Amit Dhakad').name, 'Amit Dhakad');
  });

  it('should add a relationship', () => {
    familyTree.addRelationship('Amit Dhakad', 'father', 'John Doe');
    familyTree.addRelationship('John Doe', 'son', 'Amit Dhakad');
    const relationships = familyTree
      .getPerson('Amit Dhakad')
      .getRelationships();
    assert.strictEqual(relationships[0].relationship, 'father');
    assert.strictEqual(relationships[0].name, 'John Doe');
  });

  it('should count sons', () => {
    const count = familyTree.countSons('Amit Dhakad');
    assert.strictEqual(count, 1);
  });

  it('should count daughters', () => {
    const count = familyTree.countDaughters('Amit Dhakad');
    assert.strictEqual(count, 0);
  });

  it('should count wives', () => {
    const count = familyTree.countWives('Amit Dhakad');
    assert.strictEqual(count, 0);
  });

  it("should return father's name", () => {
    const fatherName = familyTree.fatherOf('Amit Dhakad');
    assert.strictEqual(fatherName, 'John Doe');
  });
});
