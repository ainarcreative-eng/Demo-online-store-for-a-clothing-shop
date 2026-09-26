import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORDERS_FILE = path.join(__dirname, 'orders.json');
const TARGET_BOUTIQUE_EMAIL = 'raniatalhi113@gmail.com';

// Ensure orders storage file exists
function loadSavedOrders(): any[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading orders file:', err);
  }
  return [];
}

function saveOrder(order: any) {
  try {
    const orders = loadSavedOrders();
    orders.unshift(order);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving order to file:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for receiving orders and forwarding to raniatalhi113@gmail.com
  app.post('/api/orders', async (req, res) => {
    try {
      const order = req.body;
      const orderId = order.orderId || 'NOUR-' + Math.floor(100000 + Math.random() * 900000);
      
      const record = {
        ...order,
        orderId,
        receivedAt: new Date().toISOString(),
        destinationEmail: TARGET_BOUTIQUE_EMAIL,
      };

      // Save locally so orders are never lost
      saveOrder(record);

      // Forward to boutique email via FormSubmit AJAX service
      let emailDispatched = false;
      try {
        const emailResponse = await fetch(`https://formsubmit.co/ajax/${TARGET_BOUTIQUE_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `طلب جديد من المتجر الإلكتروني: #${orderId} - ${order.customerInfo?.fullName || 'زبونة'} (${order.total?.toLocaleString() || ''} DZD)`,
            _template: 'table',
            "رقم الطلب": `#${orderId}`,
            "اسم الزبونة": order.customerInfo?.fullName || 'غير محدد',
            "رقم الهاتف": order.customerInfo?.phone || 'غير محدد',
            "الولاية / المدينة": order.customerInfo?.wilayaOrCity || 'غير محدد',
            "العنوان": order.customerInfo?.address || 'غير محدد',
            "ملاحظات إضافية": order.customerInfo?.notes || 'لا توجد',
            "المنتجات المطلوبة": order.itemsText || JSON.stringify(order.items),
            "المبلغ الإجمالي": `${order.total?.toLocaleString() || 0} DZD`,
            "طريقة الدفع": "الدفع عند الاستلام",
            "تاريخ وتوقيت الطلب": new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' })
          })
        });

        if (emailResponse.ok) {
          emailDispatched = true;
          console.log(`[Order #${orderId}] Successfully forwarded to ${TARGET_BOUTIQUE_EMAIL}`);
        } else {
          console.warn(`[Order #${orderId}] Email service returned status: ${emailResponse.status}`);
        }
      } catch (emailErr) {
        console.error(`[Order #${orderId}] Failed to send email via FormSubmit:`, emailErr);
      }

      res.status(200).json({
        success: true,
        orderId,
        destinationEmail: TARGET_BOUTIQUE_EMAIL,
        emailDispatched,
        message: 'Order received and recorded successfully'
      });
    } catch (error: any) {
      console.error('Server error handling order:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // API endpoint to retrieve orders list
  app.get('/api/orders', (req, res) => {
    res.json(loadSavedOrders());
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', boutiqueEmail: TARGET_BOUTIQUE_EMAIL, timestamp: new Date().toISOString() });
  });

  // Vite middleware in dev or static files in production
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nour Boutique Server running on http://0.0.0.0:${PORT}`);
    console.log(`Configured destination email: ${TARGET_BOUTIQUE_EMAIL}`);
  });
}

startServer();
