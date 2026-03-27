// import java.util.Scanner;

// public class cha {
//     public static void main(String[] args) {
//         Scanner input = new Scanner(System.in);
 
//         while (true) {
//         System.out.print("Are you enrolled? (true/false) ");
//         boolean enroll = input.nextBoolean();
        
//         if (enroll) {
//             while (true) {
//             System.out.print("How many absences? ");
//             int absent = input.nextInt();
//                 if (absent >= 4) {
//                     System.out.println("Failed due to absences.");
//                 } else if (absent == 3) {
//                     System.out.println("Warning!");
//                 } else if (absent == 2) {
//                     System.out.println("Good Attendance.");
//                 } else if (absent == 1) {
//                     System.out.println("Good Attendance.");
//                 } else if (absent == 0) {
//                     System.out.println("Perfect Attendance.");
//                 } else {
//                     System.out.println("Absences Limit! Drop Out");
//                 }
//             }
//         } else {
//             System.out.println("Not enrolled.");
//         }
//         }

//     }
// }

// import java.util.Scanner;

// public class cha {
//     public static void main(String[] args) {
//         Scanner input = new Scanner(System.in);

//         System.out.print("Do you have an account? (true/false): ");
//         boolean hasAccount = input.nextBoolean();
        
        
//         while (true) { 
//         if (hasAccount) {
//             System.out.print("Enter PIN: ");
//             int pin = input.nextInt();

//             if (pin == 1234) {
//                 System.out.println("Access granted.");
//                 break;
//             } else {
//                 System.out.println("Wrong Pin.");
//             }
//         } else {
//             System.out.println("Please register first.");
//             break;
//         }
//         }
//     }
// }

import java.util.Scanner;

public class cha {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Do you want to buy? (true/false): ");
        boolean buy = input.nextBoolean();

        if (buy) {
            while (true) { 
            System.out.print("Enter price: ");
            double price = input.nextDouble();

            System.out.print("Enter money: ");
            double money = input.nextDouble();

            if (money >= price) {
                System.out.println("Purchase successful.");
                break;
            } else {
                System.out.println("Not enough money.");
            }
            }
        } else {
            System.out.println("Purchase cancelled.");
        }
    }
}
