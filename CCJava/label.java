import javax.swing.*;

public class label {
    public static void main(String[] args) {
        JFrame f = new JFrame("Sample Swing");
        f.setSize(400, 600);
        f.setLayout(null);
        f.setVisible(true);
        
        JLabel appform = new JLabel("Application Form");f.add(appform);
        appform.setBounds(150, 20, 100, 30);

        JLabel name = new JLabel("Name:");f.add(name);
        name.setBounds(50, 60, 50, 30);

        JTextField name2 = new JTextField("Input your f%#$ning name.");f.add(name2);
        name2.setBounds(110, 70, 200, 30);

        JLabel message = new JLabel("Message:");f.add(message);
        message.setBounds(50, 100, 150, 30);

        JTextArea message2 = new JTextArea("Type your message");f.add(message2);
        message2.setBounds(50, 150, 260, 100);

        JButton submit = new JButton("Submit");f.add(submit);
        submit.setBounds(50, 260, 80, 30);
        JButton cancel = new JButton("Cancel");f.add(cancel);
        cancel.setBounds(140, 260, 75, 30);
    }
}