import java.util.*;

public class today {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("How sugar mommy do you have: ");
        int select = input.nextInt();
        
        switch (select) {
            case 0:
                System.out.println("Single ready to minggle");
                break;
            case 1:
                System.out.println("Rich");
                break;
            case 2:
                System.out.println("Waiting to get my mana.");
                break;
            case 3, 4, 5, 6:
                System.out.println("Nice mindset");
                break;
            default:
                System.out.println("Invalid Input.");
        }

        System.out.print("Who's your jowa: ");
        String selectme = input.nextLine();
        
        switch (selectme) {
            case "ako":
                System.out.println("Joshua Garcia yarn");
                break;
            case "siya":
                System.out.println("Awa");
                break;
            case "kabit":
                System.out.println("Galing mo");
                break;
            default:
                System.out.println("Invalid Input.");
        }

        System.out.print("Choose A to C: ");
        char selectA = input.next().charAt(0);
        
        switch (selectA) {
            case 'A':
                System.out.println("Apple");
                break;
            case 'B':
                System.out.println("Ball");
                break;
            case 'C':
                System.out.println("Cat");
                break;
            default:
                System.out.println("Invalid Input.");
        }
    }
}
