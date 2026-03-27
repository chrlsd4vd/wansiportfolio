package myPackage2;
import myPackag1.*;
// import myPackag1.A;

public class B {
    public static void main(String[] args) {
        A obj = new A();
        obj.msg();
    }
}

// Full qualified name
public class B {
    public static void main(String[] args) {
        myPackge1.A obj = new myPackage1.A();
        obj.msg();
    }
}

// same classname
java.util.Date date1 = new java.util.Date();
java.sql.Date date2 = new java.sql.Date();



package chaPackage;
public class Cha {
    public static void main(String[] args) {
        
    }
}