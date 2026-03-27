// class and constructor name both same
// public class sample (sample) { 
//     System.out.println("hi");
// }

// public class main {
//     public static void main(String[] args) {
//         sample s = new sample();
//     }
// }

// sample(String name, char gender, int age)
//     this.name = name;
//     this.gender = gender;
//     this.age = age;

    // class identifies = new class(constructor)

    Person p1 = new 
        Person("Charles", 'M', 19)

public class Person {
    String name;
    char gender;
    int age;

Person(String name, char gender, int age) {
    this.name = name;
    this.gender = gender;
    this.age = age;

    System.out.println(name + "created");
    }
}