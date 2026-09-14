import os
import smtplib
from email.message import EmailMessage


def send_email(
    to_email: str,
    subject: str,
    body: str,
    html_body: str | None = None,
) -> bool:

    smtp_email = os.getenv("SMTP_EMAIL")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_server = os.getenv(
        "SMTP_SERVER",
        "smtp.gmail.com"
    )
    smtp_port = int(
        os.getenv("SMTP_PORT", "587")
    )

    if not smtp_email or not smtp_password:
        print("SMTP email configuration is missing")
        return False

    if not to_email:
        print("Recipient email is missing")
        return False

    try:
        message = EmailMessage()

        message["From"] = smtp_email
        message["To"] = to_email
        message["Subject"] = subject

        # Plain-text fallback
        message.set_content(body)

        # HTML version
        if html_body:
            message.add_alternative(
                html_body,
                subtype="html"
            )

        with smtplib.SMTP(
            smtp_server,
            smtp_port,
            timeout=30
        ) as server:

            server.starttls()

            server.login(
                smtp_email,
                smtp_password
            )

            server.send_message(message)

        print(
            f"Email sent successfully to {to_email}"
        )

        return True

    except Exception as e:

        print(
            f"Email sending failed to {to_email}: {e}"
        )

        return False