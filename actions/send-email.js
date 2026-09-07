'use server'

import { Resend } from 'resend'

export async function sendEmail(formData) {
  try {
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return { success: false, error: 'Email service is not configured' }
    }

    const resend = new Resend(apiKey)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'charlesakinnurun@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
    
        Message: ${message}
      `,
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to send email' }
  }
}
