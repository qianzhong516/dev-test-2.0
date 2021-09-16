# Dev Test
The deployed link is at: https://dev-test-516.herokuapp.com/graphql.

Validation result:
```json
{
  "data": {
    "verify": [
      {
        "description": "Simple case 1",
        "passed": true,
        "input": "[4,3,5,8,5,0,0,-3]",
        "expected": "[3,5,8]",
        "actual": "[3,5,8]",
        "error": null
      },
      {
        "description": "Simple case 2",
        "passed": true,
        "input": "[9,6,4,5,2,0]",
        "expected": "[4,5]",
        "actual": "[4,5]",
        "error": null
      },
      {
        "description": "More than one sequence of same length -- should return any",
        "passed": true,
        "input": "[4,3,5,8,5,1,3,8,4,6,7]",
        "expected": "one of [3,5,8], [1,3,8], [4,6,7]",
        "actual": "[3,5,8]",
        "error": null
      },
      {
        "description": "Sequence already sorted",
        "passed": false, // this has been fixed!
        "input": "[-91,-81,-68,-55,-55,-11,-3,4,20]",
        "expected": "[-91,-81,-68,-55,-55,-11,-3,4,20]",
        "actual": "[-55,-11,-3,4,20]",
        "error": null
      },
      {
        "description": "Single element",
        "passed": true,
        "input": "[1]",
        "expected": "[1]",
        "actual": "[1]",
        "error": null
      },
      {
        "description": "Sequence never increases -- should return any element",
        "passed": true,
        "input": "[2,2,1]",
        "expected": "one of [1], [2]",
        "actual": "[2]",
        "error": null
      },
      {
        "description": "Empty sequence",
        "passed": true,
        "input": "[]",
        "expected": "[]",
        "actual": "[]",
        "error": null
      }
    ]
  }
}
```
