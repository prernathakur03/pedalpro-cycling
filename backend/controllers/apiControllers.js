const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- AUTH CONTROLLERS ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const userRes = await db.query('SELECT * FROM users WHERE email = $1 AND status = $2', [email.trim().toLowerCase(), 'active']);
    if (userRes.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = userRes.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Server authentication error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const userRes = await db.query('SELECT id, name, email, role FROM users WHERE id = $1', [req.user.id]);
    if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(userRes.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

// --- CYCLES & PRICING CONTROLLERS ---
exports.getCyclesAndPricing = async (req, res) => {
  try {
    const queryText = `
      SELECT c.id, c.name, c.description, c.image_url, c.badge_text, c.status,
             p.one_hour_price, p.two_hour_price
      FROM cycle_types c
      LEFT JOIN pricing p ON c.id = p.cycle_type_id
      ORDER BY c.id ASC
    `;
    const result = await db.query(queryText);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cycles and pricing' });
  }
};

exports.updatePricing = async (req, res) => {
  try {
    const { cycle_type_id, one_hour_price, two_hour_price } = req.body;
    if (!cycle_type_id || !one_hour_price || !two_hour_price) {
      return res.status(400).json({ error: 'Missing pricing fields' });
    }

    const result = await db.query(
      `INSERT INTO pricing (cycle_type_id, one_hour_price, two_hour_price, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (cycle_type_id)
       DO UPDATE SET one_hour_price = EXCLUDED.one_hour_price, two_hour_price = EXCLUDED.two_hour_price, updated_at = NOW()
       RETURNING *`,
      [cycle_type_id, parseFloat(one_hour_price), parseFloat(two_hour_price)]
    );

    res.json({ message: 'Pricing updated successfully', pricing: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update pricing' });
  }
};

exports.createCycle = async (req, res) => {
  try {
    const { name, description, image_url, badge_text, one_hour_price, two_hour_price } = req.body;
    const cycleRes = await db.query(
      `INSERT INTO cycle_types (name, description, image_url, badge_text) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, image_url, badge_text || 'Available']
    );
    const newCycle = cycleRes.rows[0];

    if (one_hour_price && two_hour_price) {
      await db.query(
        `INSERT INTO pricing (cycle_type_id, one_hour_price, two_hour_price) VALUES ($1, $2, $3)`,
        [newCycle.id, parseFloat(one_hour_price), parseFloat(two_hour_price)]
      );
    }
    res.status(201).json(newCycle);
  } catch (err) {
    res.status(500).json({ error: 'Error creating cycle' });
  }
};

exports.updateCycle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image_url, badge_text, status, one_hour_price, two_hour_price } = req.body;

    const cycleRes = await db.query(
      `UPDATE cycle_types SET name=$1, description=$2, image_url=$3, badge_text=$4, status=$5, updated_at=NOW() WHERE id=$6 RETURNING *`,
      [name, description, image_url, badge_text, status || 'active', id]
    );

    if (one_hour_price !== undefined && two_hour_price !== undefined) {
      await db.query(
        `INSERT INTO pricing (cycle_type_id, one_hour_price, two_hour_price, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (cycle_type_id)
         DO UPDATE SET one_hour_price = EXCLUDED.one_hour_price, two_hour_price = EXCLUDED.two_hour_price, updated_at = NOW()`,
        [id, parseFloat(one_hour_price), parseFloat(two_hour_price)]
      );
    }

    res.json(cycleRes.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cycle' });
  }
};

exports.deleteCycle = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM cycle_types WHERE id = $1', [id]);
    res.json({ message: 'Cycle deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cycle' });
  }
};

// --- CONTENT & SETTINGS CONTROLLERS ---
exports.getSettings = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM business_settings WHERE id = 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch business settings' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { business_name, phone, whatsapp_number, email, address, opening_time, closing_time, maps_url, description } = req.body;
    const result = await db.query(
      `UPDATE business_settings SET business_name=$1, phone=$2, whatsapp_number=$3, email=$4, address=$5, opening_time=$6, closing_time=$7, maps_url=$8, description=$9, updated_at=NOW() WHERE id=1 RETURNING *`,
      [business_name, phone, whatsapp_number, email, address, opening_time, closing_time, maps_url, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update business settings' });
  }
};

// Generic CRUD functions for FAQs, Rules, Gallery, Reviews
exports.getFaqs = async (req, res) => {
  const result = await db.query("SELECT * FROM faqs WHERE status='published' ORDER BY display_order ASC, id ASC");
  res.json(result.rows);
};

exports.getAllFaqsAdmin = async (req, res) => {
  const result = await db.query('SELECT * FROM faqs ORDER BY display_order ASC, id ASC');
  res.json(result.rows);
};

exports.createFaq = async (req, res) => {
  const { question, answer, display_order, status } = req.body;
  const result = await db.query('INSERT INTO faqs (question, answer, display_order, status) VALUES ($1, $2, $3, $4) RETURNING *', [question, answer, display_order || 0, status || 'published']);
  res.status(201).json(result.rows[0]);
};

exports.updateFaq = async (req, res) => {
  const { id } = req.params;
  const { question, answer, display_order, status } = req.body;
  const result = await db.query('UPDATE faqs SET question=$1, answer=$2, display_order=$3, status=$4, updated_at=NOW() WHERE id=$5 RETURNING *', [question, answer, display_order, status, id]);
  res.json(result.rows[0]);
};

exports.deleteFaq = async (req, res) => {
  await db.query('DELETE FROM faqs WHERE id = $1', [req.params.id]);
  res.json({ message: 'FAQ deleted' });
};

exports.getRentalRules = async (req, res) => {
  const result = await db.query("SELECT * FROM rental_rules WHERE status='published' ORDER BY display_order ASC, id ASC");
  res.json(result.rows);
};

exports.getAllRentalRulesAdmin = async (req, res) => {
  const result = await db.query('SELECT * FROM rental_rules ORDER BY display_order ASC, id ASC');
  res.json(result.rows);
};

exports.createRentalRule = async (req, res) => {
  const { rule_text, display_order, status } = req.body;
  const result = await db.query('INSERT INTO rental_rules (rule_text, display_order, status) VALUES ($1, $2, $3) RETURNING *', [rule_text, display_order || 0, status || 'published']);
  res.status(201).json(result.rows[0]);
};

exports.updateRentalRule = async (req, res) => {
  const { id } = req.params;
  const { rule_text, display_order, status } = req.body;
  const result = await db.query('UPDATE rental_rules SET rule_text=$1, display_order=$2, status=$3, updated_at=NOW() WHERE id=$4 RETURNING *', [rule_text, display_order, status, id]);
  res.json(result.rows[0]);
};

exports.deleteRentalRule = async (req, res) => {
  await db.query('DELETE FROM rental_rules WHERE id = $1', [req.params.id]);
  res.json({ message: 'Rule deleted' });
};

exports.getGallery = async (req, res) => {
  const result = await db.query("SELECT * FROM gallery WHERE status='published' ORDER BY display_order ASC, id DESC");
  res.json(result.rows);
};

exports.getAllGalleryAdmin = async (req, res) => {
  const result = await db.query('SELECT * FROM gallery ORDER BY display_order ASC, id DESC');
  res.json(result.rows);
};

exports.createGalleryItem = async (req, res) => {
  const { image_url, title, description, display_order, status } = req.body;
  const result = await db.query('INSERT INTO gallery (image_url, title, description, display_order, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [image_url, title, description, display_order || 0, status || 'published']);
  res.status(201).json(result.rows[0]);
};

exports.deleteGalleryItem = async (req, res) => {
  await db.query('DELETE FROM gallery WHERE id = $1', [req.params.id]);
  res.json({ message: 'Gallery item deleted' });
};

exports.getReviews = async (req, res) => {
  const result = await db.query("SELECT * FROM reviews WHERE status='published' ORDER BY id DESC");
  res.json(result.rows);
};

exports.getAllReviewsAdmin = async (req, res) => {
  const result = await db.query('SELECT * FROM reviews ORDER BY id DESC');
  res.json(result.rows);
};

exports.createReview = async (req, res) => {
  const { customer_name, rating, review_text, review_date, status } = req.body;
  const result = await db.query(
    'INSERT INTO reviews (customer_name, rating, review_text, review_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [customer_name, rating || 5, review_text, review_date || 'Recently', status || 'published']
  );
  res.status(201).json(result.rows[0]);
};

exports.deleteReview = async (req, res) => {
  await db.query('DELETE FROM reviews WHERE id = $1', [req.params.id]);
  res.json({ message: 'Review deleted' });
};

// --- VALIDATE CALCULATOR PRICE (BACKEND VERIFICATION) ---
exports.calculatePrice = async (req, res) => {
  try {
    const { cycle_type_id, duration_hours, quantity } = req.body;
    
    if (!cycle_type_id || !duration_hours || !quantity) {
      return res.status(400).json({ error: 'Missing calculation params' });
    }

    const priceRes = await db.query('SELECT one_hour_price, two_hour_price FROM pricing WHERE cycle_type_id = $1', [cycle_type_id]);
    if (priceRes.rows.length === 0) {
      return res.status(404).json({ error: 'Cycle pricing not found' });
    }

    const pricing = priceRes.rows[0];
    let unitPrice = 0;
    if (parseInt(duration_hours) === 1) unitPrice = parseFloat(pricing.one_hour_price);
    else if (parseInt(duration_hours) === 2) unitPrice = parseFloat(pricing.two_hour_price);
    else return res.status(400).json({ error: 'Standard calculations cover 1 or 2 hours only' });

    const totalEstimated = unitPrice * parseInt(quantity);
    res.json({
      unitPrice,
      quantity: parseInt(quantity),
      duration_hours: parseInt(duration_hours),
      totalEstimated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate price' });
  }
};