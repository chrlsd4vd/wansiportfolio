// // ============================================
// // JAVA BASICS FOR FIRST SEMESTER - ALL IN ONE
// // ============================================

// public class JavaBasicsFirstSem {
//     public static void main(String[] args) {
//         System.out.println("=== JAVA BASICS - FIRST SEMESTER ===\n");
        
//         // 1. VARIABLE DECLARATION
//         System.out.println("1. VARIABLES AND DATA TYPES");
//         System.out.println("---------------------------");
//         int studentAge = 20;
//         double studentGPA = 8.5;
//         char grade = 'A';
//         boolean isPass = true;
//         String studentName = "John";
        
//         System.out.println("Name: " + studentName);
//         System.out.println("Age: " + studentAge);
//         System.out.println("GPA: " + studentGPA);
//         System.out.println("Grade: " + grade);
//         System.out.println("Pass: " + isPass);
        
//         // 2. IF-ELSE STATEMENTS
//         System.out.println("\n\n2. IF-ELSE STATEMENTS");
//         System.out.println("---------------------");
        
//         // Simple if-else
//         System.out.println("A. Check Even/Odd:");
//         int number = 7;
//         if (number % 2 == 0) {
//             System.out.println(number + " is even");
//         } else {
//             System.out.println(number + " is odd");
//         }
        
//         // Multiple conditions (else if)
//         System.out.println("\nB. Grade Check:");
//         int marks = 85;
//         if (marks >= 90) {
//             System.out.println("Grade: A+");
//         } else if (marks >= 80) {
//             System.out.println("Grade: A");
//         } else if (marks >= 70) {
//             System.out.println("Grade: B");
//         } else if (marks >= 60) {
//             System.out.println("Grade: C");
//         } else if (marks >= 50) {
//             System.out.println("Grade: D");
//         } else {
//             System.out.println("Grade: F (Fail)");
//         }
        
//         // Nested if-else
//         System.out.println("\nC. Find Largest of Three:");
//         int a = 10, b = 25, c = 15;
//         if (a > b) {
//             if (a > c) {
//                 System.out.println(a + " is largest");
//             } else {
//                 System.out.println(c + " is largest");
//             }
//         } else {
//             if (b > c) {
//                 System.out.println(b + " is largest");
//             } else {
//                 System.out.println(c + " is largest");
//             }
//         }
        
//         // 3. FOR LOOPS
//         System.out.println("\n\n3. FOR LOOPS");
//         System.out.println("------------");
        
//         // Basic for loop
//         System.out.println("A. Numbers 1 to 10:");
//         for (int i = 1; i <= 10; i++) {
//             System.out.print(i + " ");
//         }
        
//         // For loop with step
//         System.out.println("\n\nB. Even numbers 2 to 20:");
//         for (int i = 2; i <= 20; i = i + 2) {
//             System.out.print(i + " ");
//         }
        
//         // Reverse counting
//         System.out.println("\n\nC. Countdown 10 to 1:");
//         for (int i = 10; i >= 1; i--) {
//             System.out.print(i + " ");
//         }
        
//         // 4. WHILE LOOPS
//         System.out.println("\n\n\n4. WHILE LOOPS");
//         System.out.println("--------------");
        
//         // Basic while loop
//         System.out.println("A. Sum of first 5 numbers:");
//         int sum = 0;
//         int count = 1;
//         while (count <= 5) {
//             sum = sum + count;
//             count = count + 1;
//         }
//         System.out.println("Sum = " + sum);
        
//         // While with condition
//         System.out.println("\nB. Print squares less than 50:");
//         int n = 1;
//         while (n * n < 50) {
//             System.out.println(n + "^2 = " + (n * n));
//             n++;
//         }
        
//         // 5. DO-WHILE LOOPS
//         System.out.println("\n\n5. DO-WHILE LOOPS");
//         System.out.println("-----------------");
        
//         // Do-while example
//         System.out.println("A. Print 1 to 5:");
//         int x = 1;
//         do {
//             System.out.print(x + " ");
//             x++;
//         } while (x <= 5);
        
//         // Do-while always executes at least once
//         System.out.println("\n\nB. Do-while with false condition:");
//         int y = 10;
//         do {
//             System.out.println("This will print once even though condition is false");
//             y++;
//         } while (y < 5);
        
//         // 6. NESTED LOOPS
//         System.out.println("\n\n6. NESTED LOOPS");
//         System.out.println("---------------");
        
//         // Multiplication table
//         System.out.println("A. Multiplication Table of 5:");
//         for (int i = 1; i <= 10; i++) {
//             System.out.println("5 x " + i + " = " + (5 * i));
//         }
        
//         // Pattern printing
//         System.out.println("\nB. Square Pattern:");
//         for (int row = 1; row <= 4; row++) {
//             for (int col = 1; col <= 4; col++) {
//                 System.out.print("* ");
//             }
//             System.out.println();
//         }
        
//         // 7. BREAK AND CONTINUE
//         System.out.println("\n\n7. BREAK AND CONTINUE");
//         System.out.println("---------------------");
        
//         // Break example
//         System.out.println("A. Break when number equals 7:");
//         for (int i = 1; i <= 10; i++) {
//             if (i == 7) {
//                 System.out.println("Found 7, breaking loop!");
//                 break;
//             }
//             System.out.print(i + " ");
//         }
        
//         // Continue example
//         System.out.println("\n\nB. Skip odd numbers (Continue):");
//         for (int i = 1; i <= 10; i++) {
//             if (i % 2 != 0) {
//                 continue; // Skip odd numbers
//             }
//             System.out.print(i + " ");
//         }
        
//         // 8. PRACTICAL EXAMPLES
//         System.out.println("\n\n\n8. PRACTICAL EXAMPLES");
//         System.out.println("---------------------");
        
//         // Factorial using for loop
//         System.out.println("A. Factorial of 5:");
//         int factorial = 1;
//         for (int i = 1; i <= 5; i++) {
//             factorial = factorial * i;
//         }
//         System.out.println("5! = " + factorial);
        
//         // Fibonacci series
//         System.out.println("\nB. First 8 Fibonacci numbers:");
//         int first = 0, second = 1;
//         System.out.print(first + " " + second + " ");
//         for (int i = 3; i <= 8; i++) {
//             int next = first + second;
//             System.out.print(next + " ");
//             first = second;
//             second = next;
//         }
        
//         // Prime number check
//         System.out.println("\n\nC. Check if number is prime:");
//         int numToCheck = 13;
//         boolean isPrime = true;
        
//         if (numToCheck <= 1) {
//             isPrime = false;
//         } else {
//             for (int i = 2; i <= numToCheck / 2; i++) {
//                 if (numToCheck % i == 0) {
//                     isPrime = false;
//                     break;
//                 }
//             }
//         }
        
//         if (isPrime) {
//             System.out.println(numToCheck + " is a prime number");
//         } else {
//             System.out.println(numToCheck + " is not a prime number");
//         }
        
//         // 9. SWITCH STATEMENT
//         System.out.println("\n\n9. SWITCH STATEMENT");
//         System.out.println("-------------------");
        
//         int dayNumber = 3;
//         System.out.print("Day " + dayNumber + " is: ");
        
//         switch (dayNumber) {
//             case 1:
//                 System.out.println("Monday");
//                 break;
//             case 2:
//                 System.out.println("Tuesday");
//                 break;
//             case 3:
//                 System.out.println("Wednesday");
//                 break;
//             case 4:
//                 System.out.println("Thursday");
//                 break;
//             case 5:
//                 System.out.println("Friday");
//                 break;
//             case 6:
//                 System.out.println("Saturday");
//                 break;
//             case 7:
//                 System.out.println("Sunday");
//                 break;
//             default:
//                 System.out.println("Invalid day!");
//         }
        
//         // 10. FINAL COMBINED EXAMPLE
//         System.out.println("\n\n10. FINAL COMBINED EXAMPLE");
//         System.out.println("--------------------------");
        
//         System.out.println("Number Analysis from 1 to 10:");
//         System.out.println("Number\tSquare\tCube\tEven/Odd");
//         System.out.println("------\t------\t----\t--------");
        
//         for (int num = 1; num <= 10; num++) {
//             int square = num * num;
//             int cube = num * num * num;
//             String evenOdd = (num % 2 == 0) ? "Even" : "Odd";
            
//             System.out.println(num + "\t" + square + "\t" + cube + "\t" + evenOdd);
//         }
        
//         System.out.println("\n=== END OF PROGRAM ===");
//     }
// }