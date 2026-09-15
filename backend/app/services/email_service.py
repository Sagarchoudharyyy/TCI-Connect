import os
from html import escape
from app.core.email import send_email


def send_new_registration_email_to_admin(
    doctor_name: str,
    doctor_email: str,
    doctor_phone: str | None,
    business_name: str | None,
    license_number: str | None,
) -> bool:

    admin_email = os.getenv("ADMIN_EMAIL")

    if not admin_email:
        print("ADMIN_EMAIL is not configured")
        return False

    return send_email(
        to_email=admin_email,
        subject="New Doctor Registration - TCI Connect",
        body=f"""
Hello Admin,

A new doctor has registered on TCI Connect.

Doctor Name: {doctor_name}
Email: {doctor_email}
Phone: {doctor_phone or "Not provided"}
Business Name: {business_name or "Not provided"}
License Number: {license_number or "Not provided"}

Account Status: Pending Approval

Please log in to the TCI Connect admin panel to review the registration.

Regards,
TCI Connect
"""
    )


def send_registration_received_email(
    doctor_name: str,
    doctor_email: str,
) -> bool:

    return send_email(
        to_email=doctor_email,
        subject="Registration Received - TCI Connect",
        body=f"""
Hello {doctor_name},

Thank you for registering with TCI Connect.

Your registration has been successfully received.

Your account is currently:

PENDING ADMIN APPROVAL

Our administrator will review your registration.

You will receive another email once your account has been approved.

Regards,
TCI Connect
"""
    )



def send_doctor_approval_email(
    doctor_name: str,
    doctor_email: str,
) -> bool:

    frontend_url = os.getenv(
        "FRONTEND_URL",
        "https://tcidentallab.com"
    ).rstrip("/")

    login_url = f"{frontend_url}/login"
    safe_doctor_name = escape(doctor_name)

    body = f"""
        Hello {safe_doctor_name},

        Good news!

        Your TCI Connect doctor account has been approved by the administrator.

        You can now log in to TCI Connect and start using your account.

        Account Status: Approved

        Login here:
        {login_url}

        Regards,
        TCI Connect
        """

    html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Account Approved - TCI Connect</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            font-family: Arial, Helvetica, sans-serif;
        ">

            <div style="
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 10px;
                padding: 40px;
                box-sizing: border-box;
            ">

                <h2 style="
                    margin-top: 0;
                    color: #222222;
                ">
                    Account Approved
                </h2>

                <p>
                   Hello {safe_doctor_name},
                </p>

                <p>
                    Good news!
                </p>

                <p>
                    Your TCI Connect doctor account has been
                    approved by the administrator.
                </p>

                <p>
                    You can now log in to TCI Connect and
                    start using your account.
                </p>

                <p>
                    <strong>Account Status:</strong>
                    Approved
                </p>

                <div style="
                    text-align: center;
                    margin: 35px 0;
                ">

                    <a
                        href="{login_url}"
                        style="
                            display: inline-block;
                            padding: 14px 28px;
                            background-color: #0152a8;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 6px;
                            font-size: 16px;
                            font-weight: bold;
                        "
                    >
                       Click here to Login
                    </a>

                </div>

                <p style="
                    font-size: 13px;
                    color: #666666;
                ">
                    If the button does not work, copy and paste
                    the following link into your browser:
                </p>

                <p style="
                    font-size: 13px;
                    word-break: break-all;
                ">
                    <a href="{login_url}">
                        {login_url}
                    </a>
                </p>

                <p>
                    Regards,<br>
                    TCI Connect
                </p>

            </div>

        </body>
        </html>
        """

    return send_email(
        to_email=doctor_email,
        subject="Account Approved - TCI Connect",
        body=body,
        html_body=html_body,
    )



def send_password_reset_email(
    doctor_name: str,
    doctor_email: str,
    web_reset_url: str,
    mobile_reset_url: str,
) -> bool:

    safe_doctor_name = escape(doctor_name)

    body = f"""
        Hello {doctor_name},

        We received a request to reset your TCI Connect password.

        You can reset your password using one of the following options:

        Reset in TCI Connect Mobile App:
        {mobile_reset_url}

        Reset on Website:
        {web_reset_url}

        This password reset link is temporary and can only be used once.

        If you did not request a password reset, you can safely ignore this email.

        Regards,
        TCI Connect
        """

    html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Reset Password - TCI Connect</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            font-family: Arial, Helvetica, sans-serif;
        ">

            <div style="
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 10px;
                padding: 40px;
                box-sizing: border-box;
            ">

                <h2 style="
                    margin-top: 0;
                    color: #222222;
                ">
                    Reset Your Password
                </h2>

                <p>
                    Hello {safe_doctor_name},
                </p>

                <p>
                    We received a request to reset your
                    TCI Connect password.
                </p>

                <p>
                    Choose how you would like to reset your password:
                </p>

                <!-- Mobile App Button -->

                <div style="
                    text-align: center;
                    margin: 30px 0 15px 0;
                ">

                    <a
                        href="{mobile_reset_url}"
                        style="
                            display: inline-block;
                            padding: 14px 28px;
                            background-color: #0152a8;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 6px;
                            font-size: 16px;
                            font-weight: bold;
                        "
                    >
                        Reset Password in App
                    </a>

                </div>

                <!-- Website Button -->

                <div style="
                    text-align: center;
                    margin: 15px 0 30px 0;
                ">

                    <a
                        href="{web_reset_url}"
                        style="
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: #ffffff;
                            color: #0152a8;
                            text-decoration: none;
                            border: 1px solid #0152a8;
                            border-radius: 6px;
                            font-size: 15px;
                            font-weight: bold;
                        "
                    >
                        Reset Password on Website
                    </a>

                </div>

                <p style="
                    font-size: 13px;
                    color: #666666;
                ">
                    The reset link is temporary and can only be used once.
                </p>

                <p style="
                    font-size: 13px;
                    color: #666666;
                ">
                    If you did not request a password reset,
                    you can safely ignore this email.
                </p>

                <p style="
                    font-size: 13px;
                    color: #666666;
                ">
                    If the mobile app button does not work,
                    you can use the website option instead.
                </p>

                <p>
                    Regards,<br>
                    TCI Connect
                </p>

            </div>

        </body>
        </html>
        """

    return send_email(
        to_email=doctor_email,
        subject="Reset Your Password - TCI Connect",
        body=body,
        html_body=html_body,
    )