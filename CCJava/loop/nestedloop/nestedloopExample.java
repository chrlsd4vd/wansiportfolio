import java.util.Scanner;

public class nestedloopExample {
    @SuppressWarnings("ConvertToTryWithResources")
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("NESTED LOOP PATTERNS");
        System.out.println("1 - Right triangle stars");
        System.out.println("2 - Rectangle stars");
        System.out.println("3 - Inverted triangle stars");
        System.out.print("Choose example: ");
        int choice = input.nextInt();

        switch(choice) {

            case 1 -> {
                System.out.print("Enter rows: ");
                int rows = input.nextInt();
                for(int i = 1; i <= rows; i++) {
                    for(int j = 1; j <= i; j++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
            }

            case 2 -> {
                System.out.print("Enter rows: ");
                int r = input.nextInt();
                System.out.print("Enter columns: ");
                int c = input.nextInt();
                for(int i = 1; i <= r; i++) {
                    for(int j = 1; j <= c; j++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
            }

            case 3 -> {
                System.out.print("Enter rows: ");
                int n = input.nextInt();
                for(int i = n; i >= 1; i--) {
                    for(int j = 1; j <= i; j++) {
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
