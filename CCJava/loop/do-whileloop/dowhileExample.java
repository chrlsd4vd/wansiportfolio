import java.util.Scanner;

public class dowhileExample {
    @SuppressWarnings("ConvertToTryWithResources")
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("DO-WHILE LOOP EXAMPLES");
        System.out.println("1 - Print 1 to N");
        System.out.println("2 - User-controlled message");
        System.out.print("Choose example: ");
        int choice = input.nextInt();

        switch(choice) {

            case 1 -> {
                System.out.print("Enter N: ");
                int n = input.nextInt();
                int i = 1;
                do {
                    System.out.println(i);
                    i++;
                } while (i <= n);
            }

            case 2 -> {
                String answer;
                do {
                    System.out.println("Hello!");
                    System.out.print("Continue? (yes/no): ");
                    answer = input.next();
                } while(answer.equalsIgnoreCase("yes"));
            }

            default -> System.out.println("Invalid choice");
        }

        input.close();
    }
}
