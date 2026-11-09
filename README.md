# ARUL ELECTRICAL website (React + Core PHP + MySQL)

## 0. Settings (.env)
Copy `.env.example` to `.env` (project root, next to `backend/`) and `frontend/.env.example` to `frontend/.env`.
- `.env` holds DB details and `RECAPTCHA_SECRET` (never commit it).
- `frontend/.env` holds `VITE_RECAPTCHA_SITE_KEY`.
The keys supplied are Google's TEST keys (always pass). Make real keys (reCAPTCHA v2 checkbox) at
https://www.google.com/recaptcha/admin , add your domain (and `localhost` for testing), then paste them in.

## 1. Database
1. Start XAMPP (Apache + MySQL).
2. Open http://localhost/phpmyadmin -> Import -> choose `backend/schema.sql` -> Go.
3. If your MySQL has a password, edit `backend/config.php`.

## 2. Backend (PHP 7.4+)
From the project folder:
    php -S localhost:8000 -t backend
(If `php` is not recognised, use XAMPP's: C:\xampp\php\php.exe -S localhost:8000 -t backend)

Admin panel: http://localhost:8000/admin/
First visit asks you to create the admin username + password.

## 3. Frontend
    cd frontend
    npm install
    npm run dev
Open the URL it prints (http://localhost:5173).

## Admin panel can edit
Site settings (logo, hero/about/why images, phone, hotline, email, address, hours), Capabilities, About points,
Services, Equipment, Why Choose Us, Projects (filter category + featured card), Process steps, Testimonials (with photos),
and view/delete Enquiries from the contact form. Use "Order" to change the sequence.

## Production
`npm run build` creates `frontend/dist`. Upload dist/* to the web root and `backend/` as `/api`-compatible folder
(or serve both from the same domain so `/api/content.php` and `/uploads/` resolve).

## Deploy on Render (Docker) + Aiven MySQL + Cloudinary
1. Aiven: create the MySQL service, download `ca.pem` and save it as `backend/certs/aiven-ca.pem`.
2. Import `backend/schema_cloud.sql` into Aiven's `defaultdb` (see steps given in chat).
3. Push this folder to GitHub (the `.env` files are ignored automatically).
4. Render: New > Web Service > your repo > Runtime: Docker > Instance type: Free.
5. Environment variables on Render:
   DB_HOST, DB_PORT, DB_NAME (defaultdb), DB_USER (avnadmin), DB_PASS, DB_SSL_CA=certs/aiven-ca.pem,
   RECAPTCHA_SECRET, VITE_RECAPTCHA_SITE_KEY,
   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
Free Render sleeps after 15 min idle and loses local files, which is why images go to Cloudinary.

### Using Neon (PostgreSQL) instead of Aiven MySQL
Run `backend/schema_pg.sql` in the Neon SQL Editor, then set on Render: DB_DRIVER=pgsql, DB_HOST, DB_PORT=5432, DB_NAME, DB_USER, DB_PASS
(no DB_SSL_CA needed). Local XAMPP keeps working with MySQL (DB_DRIVER not set).
