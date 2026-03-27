package samplePackage1;

import java.util.ArrayList;
import java.util.Scanner;

public class charles {

    public static void main(String[] args) {
        ArrayList<String> gmailAccounts = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n--- Gmail Account Manager ---");
            System.out.println("1. Add Gmail Account");
            System.out.println("2. Remove Gmail Account");
            System.out.println("3. View All Accounts");
            System.out.println("4. Exit");
            System.out.print("Choose an option: ");

            String choice = scanner.nextLine();

            if (choice.equals("1")) {
                System.out.print("Enter Gmail address to add: ");
                String email = scanner.nextLine();
                if (email.endsWith("@gmail.com")) {
                    if (!gmailAccounts.contains(email)) {
                        gmailAccounts.add(email);
                        System.out.println("Account added successfully.");
                    } else {
                        System.out.println("Account already exists.");
                    }
                } else {
                    System.out.println("Invalid email. Must end with @gmail.com");
                }
            } else if (choice.equals("2")) {
                System.out.print("Enter Gmail address to remove: ");
                String email = scanner.nextLine();
                if (gmailAccounts.remove(email)) {
                    System.out.println("Account removed successfully.");
                } else {
                    System.out.println("Account not found.");
                }
            } else if (choice.equals("3")) {
                System.out.println("Current Gmail Accounts:");
                if (gmailAccounts.isEmpty()) {
                    System.out.println("No accounts found.");
                } else {
                    for (String account : gmailAccounts) {
                        System.out.println("- " + account);
                    }
                }
            } else if (choice.equals("4")) {
                System.out.println("Exiting...");
                break;
            } else {
                System.out.println("Invalid option. Please try again.");
            }
        }
        
        scanner.close();
    }
}
