import java.util.*;

public class today {
	public static void main(String[] args){
		Scanner input = new Scanner(System.in);
		
		for (int i = 0; i < 4; i++);
		
		System.out.println("Shhh");
		System.out.println("1.HI");
		System.out.println("2.HELLO");
		System.out.println("3.LOL");
		System.out.print("Type: ");
		
		int num = input.nextInt();
		String num1 = input.nextLine();
		
		switch (num) {
			case 1:
				System.out.println("1 LIMIT");
				break;
			case 2:
				System.out.println("2 LIMIT");
				break;
			case 3:
				System.out.println("3 LIMIT");
				break;
			default:
				System.out.print("Invalid");
		}
		
	}
}