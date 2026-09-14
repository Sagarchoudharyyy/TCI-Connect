import os

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

    return send_email(
        to_email=doctor_email,
        subject="Account Approved - TCI Connect",
        body=f"""
Hello {doctor_name},

Good news!

Your TCI Connect doctor account has been approved by the administrator.

You can now log in to TCI Connect and start using your account.

Account Status: Approved

Regards,
TCI Connect
"""
    )