type BookingNotification = {
  clientName: string;
  phone: string | null;
  telegram: string | null;
  serviceName: string;
  artistName: string;
  date: string;
  time: string;
  comment: string | null;
};

// Sends a plain fetch POST to the Telegram Bot API — no SDK needed for
// a single sendMessage call. Silently no-ops if the bot isn't configured
// yet (TELEGRAM_BOT_TOKEN / TELEGRAM_ADMIN_CHAT_ID unset), so bookings
// keep working before or without Telegram being set up.
export async function notifyTelegramNewBooking(
  booking: BookingNotification,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!token || !chatId) {
    console.log("[telegram] Not configured, skipping notification.");
    return;
  }

  const lines = [
    "🆕 New booking request",
    `Service: ${booking.serviceName}`,
    `Artist: ${booking.artistName}`,
    `Date: ${booking.date} at ${booking.time}`,
    `Name: ${booking.clientName}`,
    booking.phone && `Phone: ${booking.phone}`,
    booking.telegram && `Telegram: ${booking.telegram}`,
    booking.comment && `Comment: ${booking.comment}`,
  ].filter(Boolean);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
        }),
      },
    );

    if (!response.ok) {
      console.error("[telegram] sendMessage failed:", await response.text());
    }
  } catch (err) {
    console.error("[telegram] Failed to send notification:", err);
  }
}
