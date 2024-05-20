import { JoinPipe } from './join.pipe';

//Describe function comes from Jasmine Test Framework.
//It allows to group individual tests (specs) in a collection (suite)
//First argument is a string that identifies suite in test output
//Second argument is a callback function that holds the code related to this suite of tests.

describe('JoinPipe', () => {
  //Declare reusable variables at the top of the suite
  let pipe: JoinPipe;

  //Function beforeEach() is executed before each test in the suite.
  beforeEach(() => {
    //Create a new instance of the class before each test
    //Reassign reusable variable instead of declaring a new one.
    pipe = new JoinPipe();
  });

  it('should join an array using the default separator', () => {
    const expected = '1, 2, 3';
    const actual = pipe.transform([1, 2, 3]);

    expect(actual).toBe(expected);
  });

  it('should join an array using a custom separator', () => {
    const expected = '1 | 2 | 3';
    const actual = pipe.transform([1, 2, 3], ' | ');

    expect(actual).toBe(expected);
  });
});
