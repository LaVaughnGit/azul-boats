import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "Azul Boat Rentals <onboarding@resend.dev>";
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL ?? "azulboats@gmail.com";

export type BookingDetails = {
  date: string;
  time: string;
  duration: number;
  withCaptain: boolean;
  passengers: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalAmount: number;
  specialRequests?: string;
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ─────────────────────── Customer confirmation ─────────────────────── */

export async function sendCustomerConfirmation(booking: BookingDetails) {
  const formattedDate = formatDate(booking.date);
  const captainLine = booking.withCaptain
    ? "With Captain (+$50/hr)"
    : "Self-Drive";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#FF2D78,#7B2FBE);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
          <p style="margin:0 0 4px;color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:4px;text-transform:uppercase;font-weight:600;">⚓ AZUL BOAT RENTALS</p>
          <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:-0.5px;">Booking Confirmed!</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">Your Miami adventure is locked in 🌊</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:32px;">
          <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
            Hi <strong>${booking.firstName}</strong>,<br><br>
            Your reservation is confirmed and we can't wait to see you on the water!
            Here's a summary of your booking:
          </p>

          <!-- Booking Summary -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:24px;">
            <tr style="background:#f9fafb;">
              <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;" colspan="2">Reservation Details</td>
            </tr>
            ${[
      ["Date", formattedDate],
      ["Start Time", booking.time],
      ["Duration", `${booking.duration} hours`],
      ["Option", captainLine],
      ["Passengers", String(booking.passengers)],
      ["Boat", "24ft Crownline 235 XS Bowrider"],
    ]
      .map(
        ([label, value], i, arr) => `
            <tr style="background:${i % 2 === 0 ? "#ffffff" : "#f9fafb"};">
              <td style="padding:12px 16px;color:#6b7280;font-size:13px;font-weight:500;${i < arr.length - 1 ? "border-bottom:1px solid #e5e7eb;" : ""}">${label}</td>
              <td style="padding:12px 16px;color:#111827;font-size:13px;font-weight:600;text-align:right;${i < arr.length - 1 ? "border-bottom:1px solid #e5e7eb;" : ""}">${value}</td>
            </tr>`
      )
      .join("")}
          </table>

          <!-- Total -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,rgba(255,45,120,0.08),rgba(123,47,190,0.08));border:1px solid rgba(255,45,120,0.2);border-radius:12px;margin-bottom:28px;">
            <tr>
              <td style="padding:16px 20px;color:#374151;font-size:14px;font-weight:600;">Total Paid</td>
              <td style="padding:16px 20px;text-align:right;font-size:22px;font-weight:900;color:#FF2D78;">$${booking.totalAmount}</td>
            </tr>
          </table>

          <!-- Marina Address -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:14px 18px;color:#0c4a6e;font-size:13px;line-height:1.6;">
              📍 <strong>Where to show up:</strong><br>
              2380 Diana Drive, Hallandale Beach, Florida 33009
            </td></tr>
          </table>

          <!-- What to bring -->
          <h3 style="margin:0 0 12px;color:#111827;font-size:15px;font-weight:700;">📋 What to Bring</h3>
          <ul style="margin:0 0 24px;padding-left:20px;color:#6b7280;font-size:13px;line-height:2;">
            <li>Valid government-issued photo ID</li>
            <li>Sunscreen, sunglasses, and a hat</li>
            <li>Towels and a change of clothes</li>
            <li>Food, snacks, and drinks in cans or plastic (no glass on board)</li>
            ${booking.withCaptain ? "" : "<li>Florida Boater Education card (if born on/after Jan 1, 1988)</li>"}
          </ul>

          <!-- Important note -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:14px 18px;color:#92400e;font-size:13px;line-height:1.6;">
              ⚠️ <strong>Please arrive 15 minutes before your start time</strong> for a quick orientation. Our team will be dockside to get you set up. Street parking is available.
            </td></tr>
          </table>

          <!-- Contact -->
          <h3 style="margin:0 0 10px;color:#111827;font-size:15px;font-weight:700;">Questions?</h3>
          <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.8;">
            📞 <a href="tel:+12018150643" style="color:#FF2D78;text-decoration:none;">(201) 815-0643</a><br>
            ✉️ <a href="mailto:${BUSINESS_EMAIL}" style="color:#FF2D78;text-decoration:none;">${BUSINESS_EMAIL}</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
            © ${new Date().getFullYear()} Azul Boat Rentals LLC · Miami, FL<br>
            <a href="#" style="color:#9ca3af;text-decoration:underline;">Cancellation Policy</a> &nbsp;·&nbsp;
            <a href="#" style="color:#9ca3af;text-decoration:underline;">Privacy Policy</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from: FROM,
    to: booking.email,
    subject: `✅ Booking Confirmed — ${formattedDate} at ${booking.time} | Azul Boat Rentals`,
    html,
  });
}

/* ─────────────────────── Business notification ─────────────────────── */

export async function sendBusinessNotification(booking: BookingDetails) {
  const formattedDate = formatDate(booking.date);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Header -->
        <tr><td style="background:#06061A;border-radius:16px 16px 0 0;padding:24px 32px;text-align:center;">
          <p style="margin:0 0 4px;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:4px;text-transform:uppercase;">⚓ AZUL — NEW BOOKING</p>
          <h1 style="margin:0;color:#FF2D78;font-size:22px;font-weight:900;">🛥️ New Reservation</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:28px;">

          <h3 style="margin:0 0 16px;color:#111827;font-size:16px;">
            ${booking.firstName} ${booking.lastName}
          </h3>

          <!-- Details table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:20px;">
            ${[
      ["📅 Date", formattedDate],
      ["🕐 Time", booking.time],
      ["⏱ Duration", `${booking.duration} hours`],
      ["⚓ Captain", booking.withCaptain ? "Yes (+$50/hr)" : "No (self-drive)"],
      ["👥 Passengers", String(booking.passengers)],
      ["💰 Total", `$${booking.totalAmount}`],
    ]
      .map(
        ([label, value], i, arr) => `
            <tr style="background:${i % 2 === 0 ? "#ffffff" : "#f9fafb"};">
              <td style="padding:10px 14px;color:#6b7280;font-size:13px;${i < arr.length - 1 ? "border-bottom:1px solid #e5e7eb;" : ""}">${label}</td>
              <td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:600;text-align:right;${i < arr.length - 1 ? "border-bottom:1px solid #e5e7eb;" : ""}">${value}</td>
            </tr>`
      )
      .join("")}
          </table>

          <!-- Customer contact -->
          <h4 style="margin:0 0 10px;color:#374151;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Customer Contact</h4>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:${booking.specialRequests ? "20px" : "0"};">
            ${[
      ["Email", `<a href="mailto:${booking.email}" style="color:#FF2D78;">${booking.email}</a>`],
      ["Phone", `<a href="tel:${booking.phone}" style="color:#FF2D78;">${booking.phone}</a>`],
    ]
      .map(
        ([label, value], i, arr) => `
            <tr>
              <td style="padding:10px 14px;color:#6b7280;font-size:13px;${i < arr.length - 1 ? "border-bottom:1px solid #e5e7eb;" : ""}">${label}</td>
              <td style="padding:10px 14px;font-size:13px;text-align:right;${i < arr.length - 1 ? "border-bottom:1px solid #e5e7eb;" : ""}">${value}</td>
            </tr>`
      )
      .join("")}
          </table>

          ${booking.specialRequests
      ? `<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:12px 16px;">
              <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Special Requests</p>
              <p style="margin:0;color:#374151;font-size:13px;line-height:1.6;">${booking.specialRequests}</p>
            </div>`
      : ""
    }

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:16px 28px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="margin:0;color:#9ca3af;font-size:11px;">Internal notification · Azul Boat Rentals</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from: FROM,
    to: BUSINESS_EMAIL,
    subject: `🛥️ New Booking: ${booking.firstName} ${booking.lastName} — ${formattedDate} at ${booking.time}`,
    html,
  });
}
