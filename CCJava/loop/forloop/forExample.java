import java.util.Scanner;

public class forExample {
    @SuppressWarnings("ConvertToTryWithResources")
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("FOR LOOP EXAMPLES");
        System.out.println("1 - Print 1 to 10");
        System.out.println("2 - Even numbers");
        System.out.println("3 - Multiplication Table");
        System.out.println("4 - Sum of numbers");
        System.out.println("5 - Factorial");
        System.out.println("6 - Star Pattern");
        System.out.print("Choose example: ");

        int choice = input.nextInt();

        switch (choice) {

            case 1 -> {
                // Print 1 to 10
                for (int i = 1; i <= 10; i++) {
                    System.out.println(i);
                }
            }

            case 2 -> {
                // Even numbers
                System.out.print("Enter limit: ");
                int limit = input.nextInt();

                for (int i = 1; i <= limit; i++) {
                    if (i % 2 == 0) {
                        System.out.println(i);
                    }
                }
            }

            case 3 -> {
                // Multiplication Table
                System.out.print("Enter number: ");
                int num = input.nextInt();

                for (int i = 1; i <= 10; i++) {
                    System.out.println(num + " x " + i + " = " + (num * i));
                }
            }

            case 4 -> {
                // Sum of numbers
                System.out.print("Enter number: ");
                int n = input.nextInt();
                int sum = 0;

                for (int i = 1; i <= n; i++) {
                    sum += i;
                }

                System.out.println("Sum = " + sum);
            }

            case 5 -> {
                // Factorial
                System.out.print("Enter number: ");
                int factNum = input.nextInt();
                int fact = 1;

                for (int i = 1; i <= factNum; i++) {
                    fact *= i;
                }

                System.out.println("Factorial = " + fact);
            }

            case 6 -> {
                // Star Pattern
                System.out.print("Enter rows: ");
                int rows = input.nextInt();

                for (int i = 1; i <= rows; i++) {
                    for (int j = 1; j <= i; j++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
            }

            default -> System.out.println("Invalid choice");
        }

        input.close();
    }
}
