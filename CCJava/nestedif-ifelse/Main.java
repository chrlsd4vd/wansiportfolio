// import java.util.Scanner;

// public class Main {
//     public static void main(String[] args) {
//         Scanner scan = new Scanner(System.in);

//         System.out.print("Enter your name: ");
//         String name = scan.nextLine();

//         System.out.print("Enter your age: ");
//         int age = scan.nextInt();

//         System.out.println("Name: " + name);
//         System.out.println("Age: " + age);

//     }
// }

// import java.util.Scanner;

// public class Main {
//     public static void main(String[] args) {
//         Scanner scan = new Scanner(System.in);

//         System.out.print("Enter your first name: ");
//         String firstName = scan.nextLine();

//         System.out.print("Enter your middle name: ");
//         String midName = scan.nextLine();

//         System.out.print("Enter your last name: ");
//         String lastName = scan.nextLine();

//         System.out.println(firstName + " " + midName + " " + lastName);
//     }
// }

// import java.util.Scanner;

// public class Main {
//     public static void main(String[] args) {
//         Scanner scan = new Scanner(System.in);

//         System.out.print("Are you gay? ");
//         boolean rgay = scan.nextBoolean();

//         if (rgay) {
//             System.out.println("WTH");
//         } else if (rgay == true) {
//             System.out.println("LOL");
//         } else {
//             System.out.println("HAHAHHAHA");
//         }
//     }
// }

// boolean true or false
// int 1-99
// long without starting 0
// double decimal
// String "double quote word"
// char 'single quote and letter'


import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scan  = new Scanner(System.in);

        System.out.print("Enter number: ");
        int num1 = scan.nextInt();

        System.out.print("Enter number: ");
        int num2 = scan.nextInt();

        System.out.print("Enter number: ");
        int num3 = scan.nextInt();

        // int a = 10, b = 25, c = 15;
        if (num1 > num2) {
            if (num1 > num3) {
                System.out.println(num1 + " is largest");
            } else {
                System.out.println(num3 + " is largest");
            }
        } else {
            if (num2 > num3) {
                System.out.println(num2 + " is largest");
            } else {
                System.out.println(num3 + " is largest");
            }
        }

        // if (num1 > num2) {
        //     System.out.println(num1 + " is largest");
        //         if (num2 > num3) {
        //             System.out.println(num2 + " is largest");
        //         }
        // } else {
        //     System.out.println(num3 + " is largest");
        // }

        // System.out.print("Bakla ba si MC Greedy? (True/False) ");
        // boolean ans = scan.nextBoolean();

        // if (ans){
        //     System.out.println("BAKLA NGA!");
        // } else {
        //     System.out.println("LIAR");
        // }
    }   
}