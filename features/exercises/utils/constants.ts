import { ICodeEditorLanguage, IExercise } from "./types";

export enum EXERCISE_LEVEL {
  EASY = "Dễ",
  MEDIUM = "Trung bình",
  HARD = "Khó",
}


export const CODE_EDITOR_LANGUAGES: ICodeEditorLanguage[] = [
  { value: "cpp", label: "C++", extension: "cpp" },
  { value: "python", label: "Python", extension: "py" },
  { value: "javascript", label: "JavaScript", extension: "js" },
  { value: "typescript", label: "TypeScript", extension: "ts" },
  { value: "java", label: "Java", extension: "java" },
  { value: "csharp", label: "C#", extension: "cs" },
  { value: "go", label: "Go", extension: "go" },
  { value: "rust", label: "Rust", extension: "rs" },
];

export const CODE_EDITOR_LANGUAGE_TEMPLATES = {
  cpp: `// Write your C++ solution here
#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
  python: `# Write your Python solution here
def solution():
    # Your code here
    return None`,
  javascript: `// Write your JavaScript solution here
function solution() {
    // Your code here
    return null;
}`,
  typescript: `// Write your TypeScript solution here
function solution(): any {
    // Your code here
    return null;
}`,
  java: `// Write your Java solution here
public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
  csharp: `// Write your C# solution here
using System;

class Program {
    static void Main() {
        // Your code here
    }
}`,
  go: `// Write your Go solution here
package main

import "fmt"

func main() {
    // Your code here
}`,
  rust: `// Write your Rust solution here
fn main() {
    // Your code here
}`,
};

export const SAMPLE_EXERCISE: IExercise[] = [
  {
    id: "two-sum-001",
    name: "Two Sum",
    statement: `
## Problem Statement

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Mathematical Analysis:
We need to find indices $i$ and $j$ such that:
$$nums[i] + nums[j] = target$$
where $i \\neq j$ and $0 \\leq i, j < n$

### Time Complexity:
- Brute force: $O(n^2)$
- Hash map approach: $O(n)$
- Space complexity: $O(n)$

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] = 2 + 7 = 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Example 3:
\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

### Constraints:
- $2 \\leq nums.length \\leq 10^4$
- $-10^9 \\leq nums[i] \\leq 10^9$
- $-10^9 \\leq target \\leq 10^9$
- Only one valid answer exists.

### Function Signature:
\`\`\`javascript
function twoSum(nums, target) {
    // Your code here
}
\`\`\`

### Input Format:
First line contains the array elements separated by spaces.
Second line contains the target value.

### Output Format:
Return the indices as an array [index1, index2] where $index_1 < index_2$.
  `,
    testcases: [
      {
        id: "tc-001",
        input: "2 7 11 15\n9",
        output: "[0,1]",
        isPublic: true,
      },
      {
        id: "tc-002",
        input: "3 2 4\n6",
        output: "[1,2]",
        isPublic: true,
      },
      {
        id: "tc-003",
        input: "3 3\n6",
        output: "[0,1]",
        isPublic: true,
      },
      {
        id: "tc-004",
        input: "1 5 3 7 9 2\n8",
        output: "[0,3]",
        isPublic: false,
      },
      {
        id: "tc-005",
        input: "-1 -2 -3 -4 -5\n-8",
        output: "[2,4]",
        isPublic: false,
      },
      {
        id: "tc-006",
        input: "0 4 3 0\n0",
        output: "[0,3]",
        isPublic: false,
      },
    ],
    level: EXERCISE_LEVEL.EASY,
  },
  {
    id: "valid-parentheses-002",
    name: "Valid Parentheses",
    statement: `
## Problem Statement

Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Mathematical Representation:
Let $\\Sigma = \\{(, ), [, ], \\{, \\}\\}$ be our alphabet of brackets.

For a string $s \\in \\Sigma^*$, we define a **valid parentheses sequence** as one that satisfies:
- **Balance condition**: For any prefix $s[1...i]$, the number of closing brackets never exceeds opening brackets
- **Matching condition**: Each opening bracket has a corresponding closing bracket of the same type
- **Order condition**: Brackets are properly nested (no crossing)

### Stack-based Solution:
The algorithm maintains a stack $S$ where:
- Push opening brackets: $\\{(, [, \\{\\}$
- Pop when encountering matching closing brackets: $\\{), ], \\}\\}$

**Time Complexity**: $O(n)$ where $n = |s|$
**Space Complexity**: $O(n)$ in worst case

### Mathematical Proof:
A string is valid if and only if:
$$\\forall i \\in [1, n]: \\sum_{j=1}^{i} f(s[j]) \\geq 0$$
and
$$\\sum_{j=1}^{n} f(s[j]) = 0$$

where $f(c) = \\begin{cases} 
+1 & \\text{if } c \\text{ is opening bracket} \\\\
-1 & \\text{if } c \\text{ is closing bracket}
\\end{cases}$

### Example 1:
\`\`\`
Input: s = "()"
Output: true
Explanation: Balance: [1, 0] ✓, Final sum: 0 ✓
\`\`\`

### Example 2:
\`\`\`
Input: s = "()[]{}"
Output: true
Explanation: Balance: [1, 0, 1, 0, 1, 0] ✓, Final sum: 0 ✓
\`\`\`

### Example 3:
\`\`\`
Input: s = "(]"
Output: false
Explanation: Wrong bracket type matching
\`\`\`

### Constraints:
- $1 \\leq |s| \\leq 10^4$
- $s \\subseteq \\{(, ), [, ], \\{, \\}\\}$

### Function Signature:
\`\`\`javascript
function isValid(s) {
    // Your code here
}
\`\`\`

### Input Format:
A single line containing the string of brackets.

### Output Format:
Return "true" if valid, "false" otherwise.
  `,
    testcases: [
      {
        id: "tc-001",
        input: "()",
        output: "true",
        isPublic: true,
      },
      {
        id: "tc-002",
        input: "()[]{}",
        output: "true",
        isPublic: true,
      },
      {
        id: "tc-003",
        input: "(]",
        output: "false",
        isPublic: true,
      },
      {
        id: "tc-004",
        input: "([)]",
        output: "false",
        isPublic: false,
      },
      {
        id: "tc-005",
        input: "{[]}",
        output: "true",
        isPublic: false,
      },
    ],
    level: EXERCISE_LEVEL.MEDIUM,
  },
  {
    id: "fibonacci-sequence-003",
    name: "Fibonacci Sequence",
    statement: `
## Problem Statement

The Fibonacci sequence is defined as:
$$F(n) = \\begin{cases} 
0 & \\text{if } n = 0 \\\\
1 & \\text{if } n = 1 \\\\
F(n-1) + F(n-2) & \\text{if } n > 1
\\end{cases}$$

Given a number $n$, return the $n$-th Fibonacci number.

### Mathematical Properties:
1. **Binet's Formula**: $F(n) = \\frac{\\phi^n - \\psi^n}{\\sqrt{5}}$
   where $\\phi = \\frac{1 + \\sqrt{5}}{2}$ (golden ratio) and $\\psi = \\frac{1 - \\sqrt{5}}{2}$

2. **Matrix Form**: $\\begin{pmatrix} F(n+1) \\\\ F(n) \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}^n \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$

3. **Asymptotic Growth**: $F(n) \\sim \\frac{\\phi^n}{\\sqrt{5}}$ as $n \\to \\infty$

### Complexity Analysis:
- **Naive Recursion**: $O(2^n)$ time, $O(n)$ space
- **Dynamic Programming**: $O(n)$ time, $O(n)$ space
- **Iterative**: $O(n)$ time, $O(1)$ space
- **Matrix Exponentiation**: $O(\\log n)$ time, $O(1)$ space

### Example 1:
\`\`\`
Input: n = 5
Output: 5
Explanation: F(5) = F(4) + F(3) = 3 + 2 = 5
\`\`\`

### Example 2:
\`\`\`
Input: n = 10
Output: 55
Explanation: The sequence is: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
\`\`\`

### Constraints:
- $0 \\leq n \\leq 30$
- Answer fits in a 32-bit integer

### Function Signature:
\`\`\`javascript
function fibonacci(n) {
    // Your code here
}
\`\`\`

### Input Format:
A single integer $n$.

### Output Format:
Return the $n$-th Fibonacci number as an integer.
  `,
    testcases: [
      {
        id: "tc-001",
        input: "5",
        output: "5",
        isPublic: true,
      },
      {
        id: "tc-002",
        input: "10",
        output: "55",
        isPublic: true,
      },
      {
        id: "tc-003",
        input: "0",
        output: "0",
        isPublic: true,
      },
      {
        id: "tc-004",
        input: "1",
        output: "1",
        isPublic: false,
      },
      {
        id: "tc-005",
        input: "15",
        output: "610",
        isPublic: false,
      },
    ],
    level: EXERCISE_LEVEL.EASY,
  },
  {
    id: "matrix-multiplication-004",
    name: "Matrix Multiplication",
    statement: `
## Problem Statement

Given two matrices $A$ and $B$, compute their product $C = A \\times B$.

### Mathematical Definition:
For matrices $A \\in \\mathbb{R}^{m \\times n}$ and $B \\in \\mathbb{R}^{n \\times p}$:
$$C_{ij} = \\sum_{k=1}^{n} A_{ik} \\cdot B_{kj}$$

The resulting matrix $C \\in \\mathbb{R}^{m \\times p}$.

### Properties:
1. **Associativity**: $(AB)C = A(BC)$
2. **Distributivity**: $A(B + C) = AB + AC$
3. **Identity**: $AI = IA = A$ where $I$ is the identity matrix
4. **Non-commutativity**: Generally $AB \\neq BA$

### Algorithm Complexity:
- **Standard Algorithm**: $O(mnp)$ time, $O(mp)$ space
- **Strassen's Algorithm**: $O(n^{\\log_2 7}) \\approx O(n^{2.807})$
- **Coppersmith-Winograd**: $O(n^{2.376})$ (theoretical)

### Example 1:
\`\`\`
Input: 
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
Output: [[19, 22], [43, 50]]
Explanation: 
C[0][0] = 1×5 + 2×7 = 19
C[0][1] = 1×6 + 2×8 = 22
C[1][0] = 3×5 + 4×7 = 43
C[1][1] = 3×6 + 4×8 = 50
\`\`\`

### Block Matrix Multiplication:
For large matrices, we can use block decomposition:
$$\\begin{pmatrix} A_{11} & A_{12} \\\\ A_{21} & A_{22} \\end{pmatrix} \\begin{pmatrix} B_{11} & B_{12} \\\\ B_{21} & B_{22} \\end{pmatrix} = \\begin{pmatrix} A_{11}B_{11} + A_{12}B_{21} & A_{11}B_{12} + A_{12}B_{22} \\\\ A_{21}B_{11} + A_{22}B_{21} & A_{21}B_{12} + A_{22}B_{22} \\end{pmatrix}$$

### Constraints:
- $1 \\leq m, n, p \\leq 100$
- $-1000 \\leq A_{ij}, B_{ij} \\leq 1000$

### Function Signature:
\`\`\`javascript
function matrixMultiply(A, B) {
    // Your code here
}
\`\`\`

### Input Format:
First line: dimensions $m$, $n$, $p$
Next $m$ lines: matrix $A$ 
Next $n$ lines: matrix $B$

### Output Format:
Return the resulting matrix $C$ as a 2D array.
  `,
    testcases: [
      {
        id: "tc-001",
        input: "2 2 2\n1 2\n3 4\n5 6\n7 8",
        output: "[[19,22],[43,50]]",
        isPublic: true,
      },
      {
        id: "tc-002",
        input: "2 3 2\n1 2 3\n4 5 6\n7 8\n9 10\n11 12",
        output: "[[58,64],[139,154]]",
        isPublic: true,
      },
    ],
    level: EXERCISE_LEVEL.MEDIUM,
  },
];
