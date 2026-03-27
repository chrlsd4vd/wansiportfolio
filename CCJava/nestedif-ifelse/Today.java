import java.util.Scanner;

public class Today {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        // NESTED IF
        // Ask the user to enter their age
        // System.out.print("Enter your age: ");
        // int age = input.nextInt();

        // // Ask the user if they are a member (true or false)
        // System.out.print("Are you a member? (true/false): ");
        // boolean member = input.nextBoolean();

        // // First check if the age is 18 or above
        // if (age >= 18) {

        //     // If age is valid, check if the user is a member
        //     if (member) {
        //         // If the user is a member and 18+, they get a discount
        //         System.out.println("You are eligible for discount!");
        //     } else {
        //         // If the user is 18+ but not a member
        //         System.out.println("Bruhh, you aint belong here.");
        //     }

        // } else {
        //     // If the user is below 18, access is not allowed
        //     System.out.println("Your age not allowed.");
        // }

//-----------------------------------------------------------------

        // int score = 92; <-- Alternative for input statement
        // System.out.print("Enter your grade: ");
        // int grade = input.nextInt();

        // // Check if the student passed
        // if (grade >= 75) {
        //     // If passed, check if the score is high enough for honors
        //     if (grade >= 90) {
        //         System.out.println("Passed with Honors");
        //     } else {
        //         // Passed but not high enough for honors
        //         System.out.println("Passed");
        //     }
        // } else {
        //     // Score is below 75
        //     System.out.println("Failed");
        // }

//-----------------------------------------------------------------

        // String username = "admin";
        // String password = "1234"; <-- Also alternative for input statement

        // System.out.print("Enter your username: ");
        // String username = input.next();

        // System.out.print("Enter your password: ");
        // int password = input.nextInt();

        // // Check if the username is correct
        // if (username.equals("admin")) {
        //     // If username is correct, check the password
        //     if (password == 1234) {
        //         System.out.println("Login successful");
        //     } else {
        //         // Username is correct but password is wrong
        //         System.out.println("Wrong password");
        //     }
        // } else {
        //     // Username is wrong
        //     System.out.println("Wrong username");
        // }

//-----------------------------------------------------------------

        // Ask for Katsu menu (one word only)
        System.out.print("Enter Katsu Food (Chicken / Pork / Beef): ");
        String katsu = input.next(); // only reads one word

        // Ask if the customer is a student
        System.out.print("Are you a student? (yes/no): ");
        String studentInput = input.next(); // only reads one word
        boolean student = studentInput.equals("yes"); // must type "yes"
                                                                // if you want upper and lowercase is valid use .equalsIgnoreCase

        double price = 0; // starting price
        
        // Nested if for Chicken
        if (katsu.equals("Chicken")) {
            price = 55; // updated price
            if (student) {
                price = price * 0.9; // 10% discount
                System.out.println("Student discount applied!");
            }
            System.out.println("Total price: Php" + price);
        }
        // Nested if for Pork
        if (katsu.equals("Pork")) {
            price = 55; // updated price
            if (student) {
                price = price * 0.9; // 10% discount
                System.out.println("Student discount applied!");
            }
            System.out.println("Total price: Php " + price);
        }
        // Nested if for Beef
        if (katsu.equals("Beef")) {
            price = 65; // updated price
            if (student) {
                price = price * 0.9; // 10% discount
                System.out.println("Student discount applied!");
            }
            System.out.println("Total price: Php " + price);
        }
        // Ask for money only if price > 0 (valid menu)
        if (price > 0) {
            System.out.print("Enter your money: Php ");
            double money = input.nextDouble();
            // Nested if to check if money is enough
            if (money >= price) {
                double change = money - price;
                System.out.println("Payment successful!");
                System.out.println("Your change: Php " + change);
            }
            if (money < price) {
                System.out.println("Not enough money! Transaction cancelled.");
            }
        }

        
    //FOR LOOP
        // for (int i = 1; i <= 10; i++) {
        //     System.out.println("Count: " + i);
        // }
    
    //FOR LOOP WITH INPUT
        // System.out.print("Enter int range: ");
        // int range1 = scan.nextInt();

        // System.out.print("Enter int max: ");
        // int range2 = scan.nextInt();

        // for (int i = range2; i <= range1; i++) {
        //     System.out.println("Count: " + i);
        // }

    //ONE DIMENSIONAL ARRAYS
        // int[] numbers = {10, 50, 30};

        // for (int i = 0; i < numbers.length; i++) {
        //     System.out.println(numbers[i]);
        // }

        // int[] numbers = new int[3];

        // System.out.print("Enter first number: ");
        // numbers[0] = scan.nextInt();

        // System.out.print("Enter second number: ");
        // numbers[1] = scan.nextInt();

        // System.out.print("Enter third number: ");
        // numbers[2] = scan.nextInt();

        // System.out.println("You entered:");

        // for (int i = 0; i < numbers.length; i++) {
        //     System.out.println(numbers[i]);
        // }
    }
}
