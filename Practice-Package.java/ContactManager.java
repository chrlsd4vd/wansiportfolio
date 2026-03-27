import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.Scanner;

/**
 * A simple console-based CRUD application for managing contact details.
 * Stores name, email, and phone number in an ArrayList.
 */
public class ContactManager {

    // Inner class representing a single contact
    static class Contact {
        private String name;
        private String email;
        private String phone;

        public Contact(String name, String email, String phone) {
            this.name = name;
            this.email = email;
            this.phone = phone;
        }

        @Override
        public String toString() {
            return String.format("%-20s | %-30s | %-15s", name, email, phone);
        }
    }

    public static void main(String[] args) {
        ArrayList<Contact> contacts = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        boolean running = true;

        while (running) {
            displayMenu();
            int choice = getMenuChoice(scanner);

            switch (choice) {
                case 1:
                    addContact(scanner, contacts);
                    break;
                case 2:
                    viewContacts(contacts);
                    break;
                case 3:
                    removeContact(scanner, contacts);
                    break;
                case 4:
                    System.out.println("Exiting program. Goodbye!");
                    running = false;
                    break;
                default:
                    System.out.println("Invalid choice. Please enter a number between 1 and 4.");
            }
            System.out.println(); // blank line for readability
        }
        scanner.close();
    }

    /**
     * Displays the main menu.
     */
    private static void displayMenu() {
        System.out.println("===== Contact Manager =====");
        System.out.println("1. Add Contact");
        System.out.println("2. View All Contacts");
        System.out.println("3. Remove Contact");
        System.out.println("4. Exit");
        System.out.print("Enter your choice: ");
    }

    /**
     * Safely reads an integer menu choice from the user.
     * Re-prompts on invalid input.
     */
    private static int getMenuChoice(Scanner scanner) {
        int choice = -1;
        while (choice < 1 || choice > 4) {
            try {
                choice = scanner.nextInt();
            } catch (InputMismatchException e) {
                System.out.print("Invalid input. Please enter a number (1-4): ");
            } finally {
                scanner.nextLine(); // clear the buffer
            }
        }
        return choice;
    }

    /**
     * Prompts for name, email, and phone number, then adds a new contact.
     * Basic validation prevents empty fields.
     */
    private static void addContact(Scanner scanner, ArrayList<Contact> contacts) {
        System.out.println("--- Add New Contact ---");

        String name = readNonEmptyString(scanner, "Name: ");
        String email = readNonEmptyString(scanner, "Email: ");
        String phone = readNonEmptyString(scanner, "Phone: ");

        contacts.add(new Contact(name, email, phone));
        System.out.println("Contact added successfully.");
    }

    /**
     * Reads a non‑empty line of input, trimming whitespace.
     */
    private static String readNonEmptyString(Scanner scanner, String prompt) {
        String input;
        do {
            System.out.print(prompt);
            input = scanner.nextLine().trim();
            if (input.isEmpty()) {
                System.out.println("This field cannot be empty. Please try again.");
            }
        } while (input.isEmpty());
        return input;
    }

    /**
     * Displays all stored contacts in a formatted table with borders at the top, bottom, and between rows.
     */
    private static void viewContacts(ArrayList<Contact> contacts) {
        System.out.println("--- All Contacts ---");
        if (contacts.isEmpty()) {
            System.out.println("No contacts to display.");
            return;
        }

        // Top border
        System.out.println("--------------------------------------------------------------------------------");
        // Header row
        System.out.printf("| %-3s | %-20s | %-30s | %-15s |%n", "#", "Name", "Email", "Phone");
        // Header separator
        System.out.println("--------------------------------------------------------------------------------");

        // Table rows with borders
        for (int i = 0; i < contacts.size(); i++) {
            Contact contact = contacts.get(i);
            System.out.printf("| %-3d | %-20s | %-30s | %-15s |%n", 
                i + 1, contact.name, contact.email, contact.phone);
            
            // Add border after each row (including last row)
            System.out.println("--------------------------------------------------------------------------------");
        }
    }
    /**
     * Removes a contact by its displayed index.
     */
    private static void removeContact(Scanner scanner, ArrayList<Contact> contacts) {
        System.out.println("--- Remove Contact ---");
        if (contacts.isEmpty()) {
            System.out.println("No contacts to remove.");
            return;
        }

        viewContacts(contacts); // show current list with indices
        System.out.print("Enter the number of the contact to remove (0 to cancel): ");

        int index = -1;
        try {
            index = scanner.nextInt();
        } catch (InputMismatchException e) {
            System.out.println("Invalid input. Removal cancelled.");
            scanner.nextLine(); // clear buffer
            return;
        } finally {
            scanner.nextLine(); // clear newline
        }

        if (index == 0) {
            System.out.println("Removal cancelled.");
            return;
        }

        if (index < 1 || index > contacts.size()) {
            System.out.println("Invalid number. No contact removed.");
            return;
        }

        Contact removed = contacts.remove(index - 1);
        System.out.println("Removed: " + removed.name);
    }
}