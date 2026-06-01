# AfrikaLuxe WordPress Template

This folder contains:

- `page-afrikaluxe.php`
- `afrikaluxe-leads/afrikaluxe-leads.php` (plugin)

## Install

1. Open your active theme folder:
   - `/wp-content/themes/your-active-theme/`
2. Copy `page-afrikaluxe.php` into that folder.
3. In WordPress Admin, create or edit a page.
4. In **Page Attributes** (or Template settings), choose:
   - **AfrikaLuxe Landing**
5. Publish/update the page.

## Install lead storage plugin

1. Copy folder `afrikaluxe-leads` to:
   - `/wp-content/plugins/afrikaluxe-leads/`
2. In WordPress Admin, go to **Plugins** and activate:
   - **AfrikaLuxe Leads**
3. Leads are stored in Admin menu:
   - **AfrikaLuxe Leads**

## SMTP config (WordPress)

Add these constants in `wp-config.php` (before `/* That's all, stop editing! */`):

```php
define('AFRIKALUXE_SMTP_HOST', 'mail.afrikaluxe.com');
define('AFRIKALUXE_SMTP_PORT', 465);
define('AFRIKALUXE_SMTP_ENCRYPTION', 'ssl');
define('AFRIKALUXE_SMTP_USER', 'contact@afrikaluxe.com');
define('AFRIKALUXE_SMTP_PASS', 'YOUR_SMTP_PASSWORD');
```

Then save and test a contact form submission.

## Notes

- The template embeds the live landing site at:
  - `https://afrikaluxe.netlify.app/`
- The template passes `wp_api` query param automatically to enable lead storage endpoint:
  - `/wp-json/afrikaluxe/v1/lead`
- New contact email is:
  - `contact@afrikaluxe.com`
- If you want a different URL later, edit the `src` value in `page-afrikaluxe.php`.
- If the page still looks blank, clear WordPress/theme cache and browser cache, then reload with `Ctrl + F5`.
