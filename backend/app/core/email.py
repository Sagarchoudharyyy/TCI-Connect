import os
import smtplib
from email.message import EmailMessage


SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))


def send_email(to_email: str, subject: str, body: str):

    if not SMTP_EMAIL or not SMTP_PASSWORD:
        print("SMTP email configuration is missing")
        return False

    try:
        message = EmailMessage()

        message["From"] = SMTP_EMAIL
        message["To"] = to_email
        message["Subject"] = subject

        message.set_content(body)

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:

            server.starttls()

            server.login(
                SMTP_EMAIL,
                SMTP_PASSWORD
            )

            server.send_message(message)

        print(f"Email sent successfully to {to_email}")

        return True

    except Exception as e:

        print(f"Email sending failed: {e}")

        return False