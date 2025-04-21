// Language IDs for Judge0
export const LANGUAGE_IDS = {
  python: 71, // Python 3.8.1
  java: 62, // Java 13.0.1
  cpp: 54, // C++ 17.0.4
  javascript: 93, // Node.js 12.14.0
  typescript: 74, // TypeScript 3.7.4
  c: 50, // C (GCC 9.2.0)
  csharp: 51, // C# (Mono 6.6.0.161)
  php: 68, // PHP 7.4.1
  ruby: 72, // Ruby 2.7.0
  rust: 73, // Rust 1.40.0
  go: 60, // Go 1.13.5
  kotlin: 78, // Kotlin 1.3.70
  swift: 83, // Swift 5.2.3
}

export type SupportedLanguage = keyof typeof LANGUAGE_IDS

export interface ExecuteCodeParams {
  language: SupportedLanguage
  code: string
  stdin?: string
}

export interface ExecutionResult {
  status: {
    id: number
    description: string
  }
  stdout: string | null
  stderr: string | null
  compile_output: string | null
  message: string | null
  time: number | null
  memory: number | null
  error?: string
}

export async function executeCode({ language, code, stdin = "" }: ExecuteCodeParams): Promise<ExecutionResult> {
  try {
    const response = await fetch("/api/execute-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        code,
        stdin,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to execute code")
    }

    return data
  } catch (error: any) {
    console.error("Error executing code:", error)
    return {
      status: { id: 0, description: "Error" },
      stdout: null,
      stderr: null,
      compile_output: null,
      message: null,
      time: null,
      memory: null,
      error: error.message || "Failed to execute code",
    }
  }
}

// Get language display name
export function getLanguageDisplayName(language: SupportedLanguage): string {
  const displayNames: Record<SupportedLanguage, string> = {
    python: "Python",
    java: "Java",
    cpp: "C++",
    javascript: "JavaScript",
    typescript: "TypeScript",
    c: "C",
    csharp: "C#",
    php: "PHP",
    ruby: "Ruby",
    rust: "Rust",
    go: "Go",
    kotlin: "Kotlin",
    swift: "Swift",
  }

  return displayNames[language] || language
}

// Get default code template for a language
export function getCodeTemplate(language: SupportedLanguage): string {
  const templates: Record<SupportedLanguage, string> = {
    python: `# Python Example
def main():
    print("Hello, World!")
    
    # Calculate the sum of numbers from 1 to 10
    total = sum(range(1, 11))
    print(f"Sum of numbers from 1 to 10: {total}")
    
    # Check if a number is prime
    def is_prime(n):
        if n <= 1:
            return False
        if n <= 3:
            return True
        if n % 2 == 0 or n % 3 == 0:
            return False
        i = 5
        while i * i <= n:
            if n % i == 0 or n % (i + 2) == 0:
                return False
            i += 6
        return True
    
    # Test the prime function
    for num in [2, 3, 4, 5, 6, 7, 11]:
        print(f"{num} is {'prime' if is_prime(num) else 'not prime'}")

if __name__ == "__main__":
    main()`,
    java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Calculate the sum of numbers from 1 to 10
        int total = 0;
        for (int i = 1; i <= 10; i++) {
            total += i;
        }
        System.out.println("Sum of numbers from 1 to 10: " + total);
        
        // Check if a number is prime
        for (int num : new int[]{2, 3, 4, 5, 6, 7, 11}) {
            System.out.println(num + " is " + (isPrime(num) ? "prime" : "not prime"));
        }
    }
    
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        int i = 5;
        while (i * i <= n) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
            i += 6;
        }
        return true;
    }
}`,
    cpp: `// C++ Example
#include <iostream>
#include <vector>

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    int i = 5;
    while (i * i <= n) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
        i += 6;
    }
    return true;
}

int main() {
    std::cout << "Hello, World!" << std::endl;
    
    // Calculate the sum of numbers from 1 to 10
    int total = 0;
    for (int i = 1; i <= 10; i++) {
        total += i;
    }
    std::cout << "Sum of numbers from 1 to 10: " << total << std::endl;
    
    // Check if a number is prime
    std::vector<int> numbers = {2, 3, 4, 5, 6, 7, 11};
    for (int num : numbers) {
        std::cout << num << " is " << (isPrime(num) ? "prime" : "not prime") << std::endl;
    }
    
    return 0;
}`,
    javascript: `// JavaScript Example
function main() {
   console.log("Hello, World!");
   
   // Calculate the sum of numbers from 1 to 10
   const total = Array.from({length: 10}, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
   console.log("Sum of numbers from 1 to 10: " + total);
   
   // Check if a number is prime
   function isPrime(n) {
       if (n <= 1) return false;
       if (n <= 3) return true;
       if (n % 2 === 0 || n % 3 === 0) return false;
       let i = 5;
       while (i * i <= n) {
           if (n % i === 0 || n % (i + 2) === 0) return false;
           i += 6;
       }
       return true;
   }
   
   // Test the prime function
   [2, 3, 4, 5, 6, 7, 11].forEach(num => {
       console.log(num + " is " + (isPrime(num) ? "prime" : "not prime"));
   });
}

main();`,
    typescript: `// TypeScript Example
function main(): void {
   console.log("Hello, World!");
   
   // Calculate the sum of numbers from 1 to 10
   const total: number = Array.from({length: 10}, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
   console.log("Sum of numbers from 1 to 10: " + total);
   
   // Check if a number is prime
   function isPrime(n: number): boolean {
       if (n <= 1) return false;
       if (n <= 3) return true;
       if (n % 2 === 0 || n % 3 === 0) return false;
       let i: number = 5;
       while (i * i <= n) {
           if (n % i === 0 || n % (i + 2) === 0) return false;
           i += 6;
       }
       return true;
   }
   
   // Test the prime function
   [2, 3, 4, 5, 6, 7, 11].forEach(num => {
       console.log(num + " is " + (isPrime(num) ? "prime" : "not prime"));
   });
}

main();`,
    c: `// C Example
#include <stdio.h>
#include <stdbool.h>

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    int i = 5;
    while (i * i <= n) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
        i += 6;
    }
    return true;
}

int main() {
    printf("Hello, World!\\n");
    
    // Calculate the sum of numbers from 1 to 10
    int total = 0;
    for (int i = 1; i <= 10; i++) {
        total += i;
    }
    printf("Sum of numbers from 1 to 10: %d\\n", total);
    
    // Check if a number is prime
    int numbers[] = {2, 3, 4, 5, 6, 7, 11};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    for (int i = 0; i < size; i++) {
        printf("%d is %s\\n", numbers[i], isPrime(numbers[i]) ? "prime" : "not prime");
    }
    
    return 0;
}`,
    csharp: `// C# Example
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
        
        // Calculate the sum of numbers from 1 to 10
        int total = 0;
        for (int i = 1; i <= 10; i++) {
            total += i;
        }
        Console.WriteLine($"Sum of numbers from 1 to 10: {total}");
        
        // Check if a number is prime
        int[] numbers = {2, 3, 4, 5, 6, 7, 11};
        foreach (int num in numbers) {
            Console.WriteLine($"{num} is {(IsPrime(num) ? "prime" : "not prime")}");
        }
    }
    
    static bool IsPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        int i = 5;
        while (i * i <= n) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
            i += 6;
        }
        return true;
    }
}`,
    php: `<?php
// PHP Example
function isPrime($n) {
    if ($n <= 1) return false;
    if ($n <= 3) return true;
    if ($n % 2 == 0 || $n % 3 == 0) return false;
    $i = 5;
    while ($i * $i <= $n) {
        if ($n % $i == 0 || $n % ($i + 2) == 0) return false;
        $i += 6;
    }
    return true;
}

echo "Hello, World!\\n";

// Calculate the sum of numbers from 1 to 10
$total = 0;
for ($i = 1; $i <= 10; $i++) {
    $total += $i;
}
echo "Sum of numbers from 1 to 10: $total\\n";

// Check if a number is prime
$numbers = [2, 3, 4, 5, 6, 7, 11];
foreach ($numbers as $num) {
    echo "$num is " . (isPrime($num) ? "prime" : "not prime") . "\\n";
}
?>`,
    ruby: `# Ruby Example
def is_prime?(n)
  return false if n <= 1
  return true if n <= 3
  return false if n % 2 == 0 || n % 3 == 0
  
  i = 5
  while i * i <= n
    return false if n % i == 0 || n % (i + 2) == 0
    i += 6
  end
  
  return true
end

puts "Hello, World!"

# Calculate the sum of numbers from 1 to 10
total = (1..10).sum
puts "Sum of numbers from 1 to 10: #{total}"

# Check if a number is prime
[2, 3, 4, 5, 6, 7, 11].each do |num|
  puts "#{num} is #{is_prime?(num) ? 'prime' : 'not prime'}"
end`,
    rust: `// Rust Example
fn is_prime(n: i32) -> bool {
    if n <= 1 {
        return false;
    }
    if n <= 3 {
        return true;
    }
    if n % 2 == 0 || n % 3 == 0 {
        return false;
    }
    
    let mut i = 5;
    while i * i <= n {
        if n % i == 0 || n % (i + 2) == 0 {
            return false;
        }
        i += 6;
    }
    
    true
}

fn main() {
    println!("Hello, World!");
    
    // Calculate the sum of numbers from 1 to 10
    let total: i32 = (1..=10).sum();
    println!("Sum of numbers from 1 to 10: {}", total);
    
    // Check if a number is prime
    for num in [2, 3, 4, 5, 6, 7, 11].iter() {
        println!("{} is {}", num, if is_prime(*num) { "prime" } else { "not prime" });
    }
}`,
    go: `// Go Example
package main

import "fmt"

func isPrime(n int) bool {
    if n <= 1 {
        return false
    }
    if n <= 3 {
        return true
    }
    if n%2 == 0 || n%3 == 0 {
        return false
    }
    
    i := 5
    for i*i <= n {
        if n%i == 0 || n%(i+2) == 0 {
            return false
        }
        i += 6
    }
    
    return true
}

func main() {
    fmt.Println("Hello, World!")
    
    // Calculate the sum of numbers from 1 to 10
    total := 0
    for i := 1; i <= 10; i++ {
        total += i
    }
    fmt.Printf("Sum of numbers from 1 to 10: %d\\n", total)
    
    // Check if a number is prime
    numbers := []int{2, 3, 4, 5, 6, 7, 11}
    for _, num := range numbers {
        if isPrime(num) {
            fmt.Printf("%d is prime\\n", num)
        } else {
            fmt.Printf("%d is not prime\\n", num)
        }
    }
}`,
    kotlin: `// Kotlin Example
fun isPrime(n: Int): Boolean {
    if (n <= 1) return false
    if (n <= 3) return true
    if (n % 2 == 0 || n % 3 == 0) return false
    
    var i = 5
    while (i * i <= n) {
        if (n % i == 0 || n % (i + 2) == 0) return false
        i += 6
    }
    
    return true
}

fun main() {
    println("Hello, World!")
    
    // Calculate the sum of numbers from 1 to 10
    val total = (1..10).sum()
    println("Sum of numbers from 1 to 10: $total")
    
    // Check if a number is prime
    val numbers = listOf(2, 3, 4, 5, 6, 7, 11)
    for (num in numbers) {
        println("$num is \${isPrime(num).let { if (it) \"prime\" else \"not prime\" }}")
    }
}
`,
    swift: `// Swift Example
func isPrime(_ n: Int) -> Bool {
    if n <= 1 {
        return false
    }
    if n <= 3 {
        return true
    }
    if n % 2 == 0 || n % 3 == 0 {
        return false
    }
    
    var i = 5
    while i * i <= n {
        if n % i == 0 || n % (i + 2) == 0 {
            return false
        }
        i += 6
    }
    
    return true
}

print("Hello, World!")

// Calculate the sum of numbers from 1 to 10
let total = (1...10).reduce(0, +)
print("Sum of numbers from 1 to 10: \\(total)")

// Check if a number is prime
let numbers = [2, 3, 4, 5, 6, 7, 11]
for num in numbers {
    print("\\(num) is \\(isPrime(num) ? "prime" : "not prime")")
}`,
  }

  return templates[language] || "// Write your code here"
}
