import java.util.Scanner;

public class switchSample {
    public static void main(String[] args) {
        try (Scanner input = new Scanner(System.in)) {
            System.out.println("SWITCH STATEMENT EXAMPLES");
            System.out.println("1 - Day of the Week");
            System.out.println("2 - Grade Evaluation");
            System.out.println("3 - Simple Calculator");
            System.out.println("4 - Menu Ordering");
            System.out.println("5 - Traffic Light");
            System.out.println("6 - Month Name");
            System.out.print("Choose example: ");
            
            int choice = input.nextInt();
            
            switch (choice) {
                
                case 1 -> {
                    // Day of the Week
                    System.out.print("Enter day number (1-7): ");
                    int day = input.nextInt();
                    
                    switch (day) {
                        case 1 -> System.out.println("Monday");
                        case 2 -> System.out.println("Tuesday");
                        case 3 -> System.out.println("Wednesday");
                        case 4 -> System.out.println("Thursday");
                        case 5 -> System.out.println("Friday");
                        case 6 -> System.out.println("Saturday");
                        case 7 -> System.out.println("Sunday");
                        default -> System.out.println("Invalid day");
                    }
                }
                    
                    
                case 2 -> {
                    // Grade Evaluation
                    System.out.print("Enter grade (75-100): ");
                    int grade = input.nextInt();
                    
                    switch (grade / 10) {
                        case 10, 9 -> System.out.println("Excellent");
                        case 8 -> System.out.println("Very Good");
                        case 7 -> System.out.println("Passed");
                        default -> System.out.println("Failed");
                    }
                }
                    
                case 3 -> {
                    // Simple Calculator
                    System.out.print("Enter first number: ");
                    int num1 = input.nextInt();
                    
                    System.out.print("Enter second number: ");
                    int num2 = input.nextInt();
                    
                    System.out.print("Choose operation (+ - * /): ");
                    char op = input.next().charAt(0);
                    
                    switch (op) {
                        case '+' -> System.out.println("Result: " + (num1 + num2));
                        case '-' -> System.out.println("Result: " + (num1 - num2));
                        case '*' -> System.out.println("Result: " + (num1 * num2));
                        case '/' -> {
                            if (num2 != 0)
                                System.out.println("Result: " + (num1 / num2));
                            else
                                System.out.println("Cannot divide by zero");
                    }
                        default -> System.out.println("Invalid operation");
                    }
                }
                    
                case 4 -> {
                    // Menu Ordering
                    System.out.println("1 - Burger");
                    System.out.println("2 - Pizza");
                    System.out.println("3 - Fries");
                    System.out.print("Choose food: ");
                    int food = input.nextInt();
                    
                    switch (food) {
                        case 1 -> System.out.println("You ordered Burger");
                        case 2 -> System.out.println("You ordered Pizza");
                        case 3 -> System.out.println("You ordered Fries");
                        default -> System.out.println("Invalid order");
                    }
                }
                    
                case 5 -> {
                    // Traffic Light
                    System.out.print("Enter color (red/yellow/green): ");
                    String color = input.next();
                    
                    switch (color.toLowerCase()) {
                        case "red" -> System.out.println("STOP");
                        case "yellow" -> System.out.println("READY");
                        case "green" -> System.out.println("GO");
                        default -> System.out.println("Invalid color");
                    }
                }
                    
                case 6 -> {
                    // Month Name
                    System.out.print("Enter month number (1-12): ");
                    int month = input.nextInt();
                    
                    switch (month) {
                        case 1 -> System.out.println("January");
                        case 2 -> System.out.println("February");
                        case 3 -> System.out.println("March");
                        case 4 -> System.out.println("April");
                        case 5 -> System.out.println("May");
                        case 6 -> System.out.println("June");
                        case 7 -> System.out.println("July");
                        case 8 -> System.out.println("August");
                        case 9 -> System.out.println("September");
                        case 10 -> System.out.println("October");
                        case 11 -> System.out.println("November");
                        case 12 -> System.out.println("December");
                        default -> System.out.println("Invalid month");
                    }
                }
                    
                default -> System.out.println("Invalid choice");
            }
        }
    }
}
