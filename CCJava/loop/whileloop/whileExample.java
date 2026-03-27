import java.util.Scanner;

public class whileExample {
    @SuppressWarnings("ConvertToTryWithResources")
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("WHILE LOOP EXAMPLES");
        System.out.println("1 - Print 1 to N");
        System.out.println("2 - Even numbers up to N");
        System.out.println("3 - User-controlled message");
        System.out.print("Choose example: ");
        int choice = input.nextInt();

        switch (choice) {

            case 1 -> {
                System.out.print("Enter N: ");
                int n = input.nextInt();
                int i = 1;
                while (i <= n) {
                    System.out.println(i);
                    i++;
                }
            }

            case 2 -> {
                System.out.print("Enter N: ");
                int limit = input.nextInt();
                int j = 1;
                while (j <= limit) {
                    if (j % 2 == 0) {
                        System.out.println(j);
                    }
                    j++;
                }
            }

            case 3 -> {
                String answer = "yes";
                while(answer.equalsIgnoreCase("yes")) {
                    System.out.println("Hello!");
                    System.out.print("Continue? (yes/no): ");
                    answer = input.next();
                }
            }

            default -> System.out.println("Invalid choice");
        }

        input.close();
    }
}
