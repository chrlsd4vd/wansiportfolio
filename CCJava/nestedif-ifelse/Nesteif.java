import java.util.Scanner;

public class Nesteif {
    @SuppressWarnings("ConvertToTryWithResources")
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("CHOOSE A SAMPLE");
        System.out.println("1 - Positive / Negative");
        System.out.println("2 - Even / Odd");
        System.out.println("3 - Age Checker");
        System.out.println("4 - Login System");
        System.out.println("5 - Student & Member Discount");
        System.out.println("6 - Grade Evaluation");
        System.out.println("7 - ATM Withdrawal");
        System.out.println("8 - Exam with Bonus");
        System.out.println("9 - Menu Ordering");
        System.out.println("10 - Money & Change");
        System.out.print("Enter choice: ");

        int choice = sc.nextInt();

        switch (choice) {
            case 1 ->                 {
                    // Positive / Negative
                    System.out.print("Enter number: ");
                    int num = sc.nextInt();
                    if (num >= 0) {
                        if (num == 0) {
                            System.out.println("Zero");
                        } else {
                            System.out.println("Positive");
                        }
                    } else {
                        System.out.println("Negative");
                    }                      }
            case 2 ->                 {
                    // Even / Odd
                    System.out.print("Enter number: ");
                    int num = sc.nextInt();
                    if (num >= 0) {
                        if (num % 2 == 0) {
                            System.out.println("Even number");
                        } else {
                            System.out.println("Odd number");
                        }
                    }                      }
            case 3 -> {
                // Age Checker
                System.out.print("Enter age: ");
                int age = sc.nextInt();
                if (age >= 0) {
                    if (age >= 18) {
                        System.out.println("Adult");
                    } else {
                        System.out.println("Minor");
                    }
                }
            }
            case 4 -> {
                // Login System
                System.out.print("Username: ");
                String username = sc.next();
                System.out.print("Password: ");
                String password = sc.next();
                if (username.equals("admin")) {
                    if (password.equals("1234")) {
                        System.out.println("Login successful");
                    } else {
                        System.out.println("Wrong password");
                    }
                } else {
                    System.out.println("User not found");
                }
            }
            case 5 -> {
                // Student & Member Discount
                System.out.print("Are you a student? (true/false): ");
                boolean isStudent = sc.nextBoolean();
                System.out.print("Are you a member? (true/false): ");
                boolean isMember = sc.nextBoolean();
                if (isStudent) {
                    if (isMember) {
                        System.out.println("20% discount");
                    } else {
                        System.out.println("10% discount");
                    }
                } else {
                    System.out.println("No discount");
                }
            }
            case 6 -> {
                // Grade Evaluation
                System.out.print("Enter grade: ");
                int grade = sc.nextInt();
                if (grade >= 0 && grade <= 100) {
                    if (grade >= 75) {
                        System.out.println("Passed");
                    } else {
                        System.out.println("Failed");
                    }
                } else {
                    System.out.println("Invalid grade");
                }
            }
            case 7 -> {
                // ATM Withdrawal
                System.out.print("Enter balance: ");
                double balance = sc.nextDouble();
                System.out.print("Enter withdraw amount: ");
                double withdraw = sc.nextDouble();
                if (balance > 0) {
                    if (withdraw <= balance) {
                        System.out.println("Withdrawal successful");
                    } else {
                        System.out.println("Insufficient balance");
                    }
                }
            }
            case 8 -> {
                // Exam with Bonus
                System.out.print("Enter score: ");
                int score = sc.nextInt();
                System.out.print("Has bonus? (true/false): ");
                boolean bonus = sc.nextBoolean();
                if (score >= 60) {
                    if (bonus) {
                        System.out.println("Passed with bonus");
                    } else {
                        System.out.println("Passed");
                    }
                } else {
                    System.out.println("Failed");
                }
            }
            case 9 -> {
                // Menu Ordering
                System.out.println("1 - Burger");
                System.out.println("2 - Pizza");
                System.out.print("Choose food: ");
                int food = sc.nextInt();
                System.out.print("With drink? (true/false): ");
                boolean drink = sc.nextBoolean();
                if (food == 1) {
                    if (drink) {
                        System.out.println("Burger with drink");
                    } else {
                        System.out.println("Burger only");
                    }
                } else if (food == 2) {
                    if (drink) {
                        System.out.println("Pizza with drink");
                    } else {
                        System.out.println("Pizza only");
                    }
                }
            }
            case 10 -> {
                // Money & Change
                System.out.print("Enter price: ");
                double price = sc.nextDouble();
                System.out.print("Enter money: ");
                double money = sc.nextDouble();
                if (money >= price) {
                    if (money > price) {
                        System.out.println("Change: " + (money - price));
                    } else {
                        System.out.println("Exact amount paid");
                    }
                } else {
                    System.out.println("Not enough money");
                }
            }
            default -> System.out.println("Invalid choice");
        }

        sc.close();
    }
}
