// import java.util.Scanner;

// public class JavaBasics {
//     public static void main(String[] args) {
//         try (Scanner scanner = new Scanner(System.in)) {
//             System.out.println("=== Java Basics: If-Else and Loops ===\n");
//             // ========================
//             // 1. IF-ELSE STATEMENTS
//             // ========================
//             System.out.println("1. IF-ELSE STATEMENT EXAMPLES");
//             System.out.println("------------------------------");
//             // Basic if-else
//             System.out.print("Enter your age: ");
//             int age = scanner.nextInt();
//             if (age < 0) {
//                 System.out.println("Invalid age!");
//             } else if (age < 13) {
//                 System.out.println("You are a child.");
//             } else if (age < 20) {
//                 System.out.println("You are a teenager.");
//             } else if (age < 65) {
//                 System.out.println("You are an adult.");
//             } else {
//                 System.out.println("You are a senior citizen.");
//             }   // Nested if-else
//             System.out.print("\nEnter a number: ");
//             int number = scanner.nextInt();
//             if (number != 0) {
//                 if (number > 0) {
//                     System.out.println(number + " is positive.");
//                 } else {
//                     System.out.println(number + " is negative.");
//                 }
                
//                 // Check if even or odd
//                 if (number % 2 == 0) {
//                     System.out.println(number + " is even.");
//                 } else {
//                     System.out.println(number + " is odd.");
//                 }
//             } else {
//                 System.out.println("The number is zero.");
//             }   // ========================
//             // 2. SWITCH STATEMENT
//             // ========================
//             System.out.println("\n\n2. SWITCH STATEMENT EXAMPLE");
//             System.out.println("---------------------------");
//             System.out.print("Enter a day number (1-7): ");
//             int day = scanner.nextInt();
//             switch(day) {
//                 case 1 ->  2 -> System.out.println("TueSystem.out.println("Wednesday");
//                 case 4 ->  5 -> System.out.println("FridSystem.out.println("Saturday");
//                 case 7 -> ult -> System.out.println("Inval=================
//             // 3. FOR  -> ===================ntln("\n\n3. FOR LOOP EXAMPLES");
//             System.out ->  for loopntln("Counting from 1 to 5:");
//             for (int i -> em.out.println("i = " + i);p with step
//             System.out ->  i = 2; i <= 10; i += 2) {.print(i + " ");
//             }   // Reve -> ut.println("\n\nCounting down from 5 to 1:");
//             for (int i = 5; i >= 1; i--) {
//                 System.out.println("Countdown: " + i);
//             }   // Nested for loop (multiplication table)
//             System.out.println("\nMultiplication table for 5:");
//             for (int i = 1; i <= 10; i++) {
//                 System.out.println("5 x " + i + " = " + (5 * i));
//             }   // ========================
//             // 4. WHILE LOOP
//             // ========================
//             System.out.println("\n\n4. WHILE LOOP EXAMPLES");
//             System.out.println("----------------------");
//             // Basic while loop
//             System.out.println("Counting from 1 to 5 using while loop:");
//             int counter = 1;
//             while (counter <= 5) {
//                 System.out.println("Counter = " + counter);
//                 counter++;
//             }   // While loop with user input
//             System.out.println("\nEnter numbers (0 to stop):");
//             int sum = 0;
//             int userInput;
//             while (true) {
//                 System.out.print("Enter a number: ");
//                 userInput = scanner.nextInt();
                
//                 if (userInput == 0) {
//                     break;  // Exit the loop
//                 }
                
//                 sum += userInput;
//                 System.out.println("Running total: " + sum);
//             }   System.out.println("Final sum: " + sum);
//             // ========================
//             // 5. DO-WHILE LOOP
//             // ========================
//             System.out.println("\n\n5. DO-WHILE LOOP EXAMPLE");
//             System.out.println("------------------------");
//             // Do-while loop (executes at least once)
//             int attempt = 0;
//             int password;
//             final int CORRECT_PASSWORD = 1234;
//             do {
//                 System.out.print("Enter password: ");
//                 password = scanner.nextInt();
//                 attempt++;
                
//                 if (password != CORRECT_PASSWORD) {
//                     System.out.println("Incorrect password! Attempt " + attempt);
//                 }
//             } while (password != CORRECT_PASSWORD && attempt < 3);
//             if (password == CORRECT_PASSWORD) {
//                 System.out.println("Access granted!");
//             } else {
//                 System.out.println("Too many attempts. Access denied!");
//             }   // ========================
//             // 6. ENHANCED FOR LOOP
//             // ========================
//             System.out.println("\n\n6. ENHANCED FOR LOOP (FOR-EACH)");
//             System.out.println("--------------------------------");
//             // Array example
//             String[] fruits = {"Apple", "Banana", "Cherry", "Date", "Elderberry"};
//             System.out.println("List of fruits:");
//             for (String fruit : fruits) {
//                 System.out.println("- " + fruit);
//             }   // ========================
//             // 7. COMBINED EXAMPLE
//             // ========================
//             System.out.println("\n\n7. COMBINED EXAMPLE: NUMBER ANALYSIS");
//             System.out.println("------------------------------------");
//             System.out.print("How many numbers do you want to analyze? ");
//             int count = scanner.nextInt();
//             int[] numbers = new int[count];
//             int positiveCount = 0, negativeCount = 0, zeroCount = 0;
//             // Collect numbers
//             for (int i = 0; i < count; i++) {
//                 System.out.print("Enter number " + (i + 1) + ": ");
//                 numbers[i] = scanner.nextInt();
//             }   // Analyze numbers
//             for (int num : numbers) {
//                 if (num > 0) {
//                     positiveCount++;
//                 } else if (num < 0) {
//                     negativeCount++;
//                 } else {
//                     zeroCount++;
//                 }
//             }   // Display results
//             System.out.println("\n--- Analysis Results ---");
//             System.out.println("Positive numbers: " + positiveCount);
//             System.out.println("Negative numbers: " + negativeCount);
//             System.out.println("Zeroes: " + zeroCount);
//             // Find largest and smallest
//             if (count > 0) {
//                 int largest = numbers[0];
//                 int smallest = numbers[0];
                
//                 for (int i = 1; i < numbers.length; i++) {
//                     if (numbers[i] > largest) {
//                         largest = numbers[i];
//                     }
//                     if (numbers[i] < smallest) {
//                         smallest = numbers[i];
//                     }
//                 }
                
//                 System.out.println("Largest number: " + largest);
//                 System.out.println("Smallest number: " + smallest);
//             }
//         }
//         System.out.println("\n=== Program Completed ===");
//     }
// }