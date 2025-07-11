import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or another provider
  auth: {
    user: "amishra.75way@gmail.com",
    pass: "yggavfzcadulijgl",
  },
});

export const sendAppointmentConfirmation = async (to: string, name: string, date: string, time: string) => {
  const mailOptions = {
    from: `"Appointments Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Appointment Confirmation",
    html: `<p>Hi ${name},</p>
           <p>Your appointment is confirmed for <strong>${date}</strong> at <strong>${time}</strong>.</p>
           <p>Thanks!</p>`,
  };

  return await transporter.sendMail(mailOptions);
};

export const sendAppointmentReminder = async (to: string, name: string, date: string, time: string) => {
  const mailOptions = {
    from: `"Appointments Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Appointment Reminder",
    html: `<p>Hi ${name},</p>
           <p>This is a reminder for your appointment on <strong>${date}</strong> at <strong>${time}</strong>.</p>
           <p>See you soon!</p>`,
  };

  return await transporter.sendMail(mailOptions);
};
