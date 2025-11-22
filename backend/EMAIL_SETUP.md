# Email OTP Setup Guide

## Quick Start - Send Real Emails in Local Development

Follow these steps to send actual OTP emails during local development:

### Option 1: Gmail (Easiest - Recommended)

1. **Enable 2-Step Verification** on your Gmail account

   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification" and follow the setup

2. **Generate App Password**

   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password (remove spaces)

3. **Update your `.env` file in the backend folder:**

   ```env
   DATABASE_URL=sqlite:///./stockmaster.db
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=abcd efgh ijkl mnop
   SMTP_FROM=your-email@gmail.com
   ```

   ⚠️ Replace `your-email@gmail.com` with your actual Gmail address and paste the 16-character App Password

4. **Restart the backend server**

   ```bash
   # Stop current server (Ctrl+C) and restart
   python -m uvicorn main:app --reload --port 8000
   ```

5. **Test it!**
   - Go to http://localhost:5174/register
   - Enter your email and name
   - Check your email inbox for the OTP

---

## Alternative: Console OTP (No Email Setup)

If you don't configure SMTP, OTPs will be displayed in the backend terminal console:

```
==================================================
📧 OTP for user@example.com: 123456
==================================================
```

Simply copy the OTP from the console and paste it in the frontend.

---

## For Production (Other Email Providers)

### Option 2: Gmail (for Testing/Low Volume)

### Option 2: Gmail (same as above)

See Quick Start section above.

### Option 3: SendGrid (Recommended for Production)

1. **Sign up at SendGrid**: https://sendgrid.com (Free tier: 100 emails/day)

2. **Create API Key**

   - Go to Settings > API Keys
   - Create API Key with "Mail Send" permission

3. **Update `.env` file:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=your-sendgrid-api-key
   SMTP_FROM=noreply@yourdomain.com
   ```

### Option 4: Mailgun (More Free Emails)

1. **Sign up at Mailgun**: https://www.mailgun.com (Free tier: 5000 emails/month)

2. **Get SMTP Credentials**

   - Go to Sending > Domain Settings > SMTP Credentials

3. **Update `.env` file:**
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=postmaster@your-mailgun-domain
   SMTP_PASSWORD=your-mailgun-password
   SMTP_FROM=noreply@your-mailgun-domain
   ```

### Option 5: AWS SES (For Large Scale)

1. **Set up AWS SES**
2. **Verify your domain/email**
3. **Get SMTP credentials**

---

## Testing Email Sending

1. Update `.env` with your SMTP credentials
2. Restart the backend server
3. Try registering with a real email address
4. Check both:
   - Your email inbox
   - Backend console (OTP is always printed as backup)

## Troubleshooting

**"Email sending disabled"**

- SMTP settings not configured in `.env`
- Use console OTP for development

**"Failed to send email: Authentication failed"**

- Wrong email/password
- Gmail: Use App Password, not regular password
- Check 2FA is enabled for Gmail

**"Failed to send email: Connection refused"**

- Firewall blocking SMTP port (587)
- Wrong SMTP host/port

**Email not received but no errors**

- Check spam/junk folder
- Verify email address is correct
- Some email providers block automated emails

## Current Behavior

✅ **Console OTP**: Always works (no setup needed)  
⚠️ **Email OTP**: Only works if SMTP is configured  
🔄 **Fallback**: If email fails, OTP is still in console

This ensures registration always works, even without email configuration!
