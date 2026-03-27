import java.util.Scanner;

public class arrayExample {
    @SuppressWarnings("ConvertToTryWithResources")
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("ARRAY + FOR LOOP EXAMPLES");
        System.out.println("1 - Sum of numbers");
        System.out.println("2 - Maximum number");
        System.out.println("3 - Print all numbers");
        System.out.print("Choose example: ");
        int choice = input.nextInt();

        switch(choice) {

            case 1 -> {
                System.out.print("How many numbers? ");
                int n = input.nextInt();
                int[] numbers = new int[n];
                int sum = 0;
                for(int i = 0; i < n; i++) {
                    System.out.print("Enter number " + (i+1) + ": ");
                    numbers[i] = input.nextInt();
                    sum += numbers[i];
                }
                System.out.println("Sum = " + sum);
            }

            case 2 -> {
                System.out.print("How many numbers? ");
                int m = input.nextInt();
                int[] nums = new int[m];
                for(int i = 0; i < m; i++) {
                    System.out.print("Enter number " + (i+1) + ": ");
                    nums[i] = input.nextInt();
                }
                int max = nums[0];
                for(int i = 1; i < m; i++) {
                    if(nums[i] > max) max = nums[i];
                }
                System.out.println("Maximum = " + max);
            }

            case 3 -> {
                System.out.print("How many numbers? ");
                int k = input.nextInt();
                int[] arr = new int[k];
                for(int i = 0; i < k; i++) {
                    System.out.print("Enter number " + (i+1) + ": ");
                    arr[i] = input.nextInt();
                }
                System.out.println("Numbers entered:");
                for(int i = 0; i < k; i++) {
                    System.out.println(arr[i]);
                }
            }

            default -> System.out.println("Invalid choice");
        }

        input.close();
    }
}
