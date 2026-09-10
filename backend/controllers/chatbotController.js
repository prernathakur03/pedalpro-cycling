const db = require('../config/db');

/**
 * DB-First Architecture Chatbot
 * Answers pricing, rules, hours, location directly from PostgreSQL.
 * Strict rules: NEVER claims live availability, NEVER confirms bookings.
 */
exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text required' });
    }

    const lowerMsg = message.toLowerCase().trim();

    // Fetch dynamic knowledge base from DB
    const [settingsRes, cyclesRes, faqsRes, rulesRes] = await Promise.all([
      db.query('SELECT * FROM business_settings WHERE id = 1'),
      db.query('SELECT c.name, p.one_hour_price, p.two_hour_price FROM cycle_types c JOIN pricing p ON c.id = p.cycle_type_id WHERE c.status = $1', ['active']),
      db.query("SELECT question, answer FROM faqs WHERE status='published'"),
      db.query("SELECT rule_text FROM rental_rules WHERE status='published'")
    ]);

    const settings = settingsRes.rows[0] || {};
    const cycles = cyclesRes.rows;
    const faqs = faqsRes.rows;
    const rules = rulesRes.rows;

    // 1. Check Availability queries (STRICT HANDOFF TO WHATSAPP)
    if (lowerMsg.includes('available') || lowerMsg.includes('stock') || lowerMsg.includes('can i book') || lowerMsg.includes('free')) {
      return res.json({
        reply: `I cannot confirm real-time cycle availability. Please send your date, time, and cycle requirements directly to PedalPro Cycling on WhatsApp! The team will confirm availability immediately.`,
        action: 'whatsapp_handoff'
      });
    }

    // 2. Check Price/Rates queries
    if (lowerMsg.includes('price') || lowerMsg.includes('rate') || lowerMsg.includes('cost') || lowerMsg.includes('charge') || lowerMsg.includes('pricing') || lowerMsg.includes('tariff')) {
      let priceText = `Here is our current PostgreSQL-verified pricing:\n\n`;
      cycles.forEach(c => {
        priceText += `• *${c.name}*: ₹${parseFloat(c.one_hour_price)} for 1 hour | ₹${parseFloat(c.two_hour_price)} for 2 hours\n`;
      });
      priceText += `\nWould you like to calculate an estimated booking and send an enquiry on WhatsApp?`;
      return res.json({ reply: priceText });
    }

    // 3. Check Timings / Hours queries
    if (lowerMsg.includes('time') || lowerMsg.includes('hour') || lowerMsg.includes('open') || lowerMsg.includes('close') || lowerMsg.includes('timing')) {
      return res.json({
        reply: `${settings.business_name || 'PedalPro Cycling'} is open daily from ${settings.opening_time || '5:00 AM'} to ${settings.closing_time || '1:00 AM'}.`
      });
    }

    // 4. Check Location / Address queries
    if (lowerMsg.includes('where') || lowerMsg.includes('location') || lowerMsg.includes('address') || lowerMsg.includes('map') || lowerMsg.includes('place')) {
      return res.json({
        reply: `We are located at: ${settings.address || 'Worli Seaface, Mumbai'}. You can start your scenic ride along the seafront!`
      });
    }

    // 5. Check Rules / ID / Document queries
    if (lowerMsg.includes('rule') || lowerMsg.includes('id') || lowerMsg.includes('proof') || lowerMsg.includes('document') || lowerMsg.includes('deposit')) {
      let ruleText = `Rental Rules & Guidelines:\n\n`;
      rules.forEach((r, idx) => {
        ruleText += `${idx + 1}. ${r.rule_text}\n`;
      });
      return res.json({ reply: ruleText });
    }

    // 6. Match directly against FAQs DB
    for (const faq of faqs) {
      if (lowerMsg.includes(faq.question.toLowerCase().replace('?', ''))) {
        return res.json({ reply: faq.answer });
      }
    }

    // 7. General Fallback Response ($0 Cost - Dynamic DB Data)
    const fallbackText = `I am the PedalPro AI Assistant. Here is basic business info:\n\n` +
      `📍 Location: ${settings.address}\n` +
      `⏰ Hours: ${settings.opening_time} to ${settings.closing_time}\n` +
      `🚲 Cycles: Non-Gear & Gear cycles available.\n\n` +
      `For real-time availability and custom enquiries, please chat with us on WhatsApp!`;

    return res.json({ reply: fallbackText, action: 'whatsapp_handoff' });

  } catch (err) {
    res.status(500).json({ reply: "I'm currently unable to respond. Please contact PedalPro Cycling on WhatsApp for immediate assistance." });
  }
};