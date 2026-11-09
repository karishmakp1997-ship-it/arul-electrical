-- ARUL ELECTRICAL database. Import this once in phpMyAdmin (or: mysql -u root < schema.sql)
CREATE DATABASE IF NOT EXISTS arul_electrical CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE arul_electrical;

CREATE TABLE IF NOT EXISTS admins (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(60) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL);
CREATE TABLE IF NOT EXISTS settings (id INT PRIMARY KEY, company VARCHAR(100), tagline VARCHAR(200), phone VARCHAR(60), hotline VARCHAR(100), email VARCHAR(120),
  address TEXT, hours VARCHAR(120), logo VARCHAR(255) DEFAULT '', hero_image VARCHAR(255) DEFAULT '', about_image VARCHAR(255) DEFAULT '', why_image VARCHAR(255) DEFAULT '');
CREATE TABLE IF NOT EXISTS capabilities (id INT AUTO_INCREMENT PRIMARY KEY, sort_order INT DEFAULT 0, title VARCHAR(120), description TEXT, badge VARCHAR(80), image VARCHAR(255) DEFAULT '');
CREATE TABLE IF NOT EXISTS about_points (id INT AUTO_INCREMENT PRIMARY KEY, sort_order INT DEFAULT 0, title VARCHAR(120), description TEXT);
CREATE TABLE IF NOT EXISTS services (id INT AUTO_INCREMENT PRIMARY KEY, sort_order INT DEFAULT 0, tag VARCHAR(40), title VARCHAR(160), description TEXT, image VARCHAR(255) DEFAULT '');
CREATE TABLE IF NOT EXISTS equipment (id INT AUTO_INCREMENT PRIMARY KEY, sort_order INT DEFAULT 0, tag VARCHAR(40), title VARCHAR(160), description TEXT, bullets TEXT, image VARCHAR(255) DEFAULT '');
CREATE TABLE IF NOT EXISTS why_points (id INT AUTO_INCREMENT PRIMARY KEY, sort_order INT DEFAULT 0, title VARCHAR(120), description TEXT);
CREATE TABLE IF NOT EXISTS projects (id INT AUTO_INCREMENT PRIMARY KEY, sort_order INT DEFAULT 0, category VARCHAR(40), tag VARCHAR(60), client VARCHAR(100), title VARCHAR(200), description TEXT, featured TINYINT(1) DEFAULT 0, image VARCHAR(255) DEFAULT '');
CREATE TABLE IF NOT EXISTS process_steps (id INT AUTO_INCREMENT PRIMARY KEY, sort_order INT DEFAULT 0, title VARCHAR(120), description TEXT, phase VARCHAR(40));
CREATE TABLE IF NOT EXISTS testimonials (id INT AUTO_INCREMENT PRIMARY KEY, sort_order INT DEFAULT 0, name VARCHAR(80), role VARCHAR(140), quote TEXT, photo VARCHAR(255) DEFAULT '');
CREATE TABLE IF NOT EXISTS enquiries (id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(100), company VARCHAR(120), mobile VARCHAR(30), email VARCHAR(120), voltage VARCHAR(60), equipment VARCHAR(100), site_location VARCHAR(160), scope TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

INSERT IGNORE INTO settings (id,company,tagline,phone,hotline,email,address,hours) VALUES
(1,'ARUL ELECTRICAL','Powering Industries. Engineering Reliable Connections.','+91 98765 43210','+91 98400 12345 / 044 2855 0000','enquiry@arulelectrical.com',
 'Central Engineering HQ, Industrial Estate Road, Guindy Industrial Zone, Chennai, Tamil Nadu, India','Monday – Saturday: 9:00 AM – 6:30 PM');

INSERT INTO capabilities (sort_order,title,description,badge) SELECT * FROM (
 SELECT 1 a,'HT & LT Electrical Contracting' b,'High-voltage grid connection, indoor/outdoor substation setups, switchyard installation, and complete LT distribution networks.' c,'Class 1 Execution' d UNION ALL
 SELECT 2,'Transformer Solutions','Supply, civil plinth mounting, erection, vacuum oil filtration, BDV testing, earth mat grounding, and live charging of power transformers.','Oil & Dry Type' UNION ALL
 SELECT 3,'Panel Board Manufacturing','In-house custom manufacturing of CPRI-compliant PCC, MCC, synchronized APFC capacitors, AMF panels, and industrial VCB boards.','CPRI Type Tested' UNION ALL
 SELECT 4,'Documentation & Approvals','Statutory Indian Electricity Rules (Rule 45 & Rule 32) compliance, CEIG safety drawings, grid synchronization, and licensing assistance.','100% Guaranteed Filing'
) x WHERE NOT EXISTS (SELECT 1 FROM capabilities);

INSERT INTO about_points (sort_order,title,description) SELECT * FROM (
 SELECT 1 a,'Electrical Contracting Expertise' b,'Class-1 turnkey execution for manufacturing plants, heavy mills, and commercial parks.' c UNION ALL
 SELECT 2,'Technical Consultancy','Single-line diagram (SLD) preparation, earthing designs, and fault level calculations.' UNION ALL
 SELECT 3,'Quality-Focused Execution','Rigorous testing using calibrated Meggers, Hi-Pot analyzers, and secondary injection kits.'
) x WHERE NOT EXISTS (SELECT 1 FROM about_points);

INSERT INTO services (sort_order,tag,title,description) SELECT * FROM (
 SELECT 1 a,'HT GRID' b,'New HT Connection Installation with Documentation' c,'HT connection installation support with associated technical documentation, scheme drawings, and coordination for grid approval and sanctioning.' d UNION ALL
 SELECT 2,'LT SYSTEMS','LT Electrical Installation','Low-tension electrical installation solutions for industrial factory shopfloors, warehouses, and commercial facility power distribution.' UNION ALL
 SELECT 3,'PCC & MCC','Panel Board Manufacturing','In-house manufacturing of project-specific power distribution, PCC, MCC, synchronized APFC capacitors, and automated switchboards.' UNION ALL
 SELECT 4,'STATUTORY','Rule 45 & Rule 32 Documentation and Approvals','Comprehensive technical documentation, statutory safety clearance, CEIG liaison, and coordination for mandatory compliance requirements.' UNION ALL
 SELECT 5,'UNDERGROUND','HT/LT Cable Laying','Precision underground trenching, HT XLPE jointing, LT armored cable pulling, end termination, and Megger insulation resistance testing.' UNION ALL
 SELECT 6,'GI TRAYS','Cable Tray Installation','Heavy-duty GI perforated and ladder-type cable tray routing with structural supports, seismic clamps, and organized multi-tier bundling.' UNION ALL
 SELECT 7,'TRANSFORMER','Transformer Sales & Installation','High-efficiency copper wound transformer procurement, civil foundation alignment, marshaling box wiring, and full commissioning.' UNION ALL
 SELECT 8,'SWITCHGEAR','HT Panel Sales & Installation','Procurement and turnkey site installation of high-tension 11kV/22kV/33kV VCB panels, Ring Main Units (RMU), and protection relays.' UNION ALL
 SELECT 9,'POWER BACKUP','DG Sales & Installation','Industrial diesel generator sets, automatic transfer switches (ATS/AMF), exhaust silencer stacks, and synchronized standby solutions engineered for uninterrupted industrial continuity.'
) x WHERE NOT EXISTS (SELECT 1 FROM services);

INSERT INTO equipment (sort_order,tag,title,description,bullets) SELECT * FROM (
 SELECT 1 a,'TRANSFORMER YARD' b,'Industrial Power Transformers' c,'High-capacity step-down and step-up transformers (100 kVA to 5000 kVA) with turnkey civil erection, oil filtration, and protective earthing.' d,'Oil Cooled (ONAN) & Dry Cast Resin
Off-Circuit Tap & OLTC Variants
Buchholz Relay & WTI/OTI Protection' e UNION ALL
 SELECT 2,'SWITCHGEAR SYSTEMS','HT Electrical Panels & Switchgear','Vacuum Circuit Breaker (VCB) panels, Ring Main Units (RMU), and custom Motor Control Centers engineered to withstand high short-circuit levels.','Rated 11kV, 22kV, 33kV Class
Internal Arc Classified (IAC) Safety
Numerical Relay Integration' UNION ALL
 SELECT 3,'BACKUP POWER','Industrial Diesel Generator Sets','Heavy industrial silent DG gensets for continuous and emergency standby utility backup with complete acoustic room treatment and fuel piping.','Capacities from 50 kVA to 2000 kVA
CPCB-IV+ Emission Compliant
Automatic AMF Synchronizing Panels'
) x WHERE NOT EXISTS (SELECT 1 FROM equipment);

INSERT INTO why_points (sort_order,title,description) SELECT * FROM (
 SELECT 1 a,'A-Grade Electrical Contracting' b,'Statutorily recognized license enabling our teams to handle unrestricted voltage classes and major utility interconnections.' c UNION ALL
 SELECT 2,'Technical Consultancy','Expert power engineering guidance on transformer sizing, demand factor estimation, and harmonic distortion mitigation.' UNION ALL
 SELECT 3,'HT/LT Infrastructure Expertise','Proven engineering methods for heavy busduct installations, overhead HT distribution lines, and internal LT raceways.' UNION ALL
 SELECT 4,'Documentation & Approval Support','Turnkey statutory handling covering CEIG drawings, Rule 45 & Rule 32 submissions, and final electrical safety fitness clearance.' UNION ALL
 SELECT 5,'Quality-Focused Execution','Use of premier tier-1 switchgear components, certified copper busbars, and dual-layer thermal insulation sleeves.' UNION ALL
 SELECT 6,'Safety-Oriented Work Practices','Mandatory Lockout/Tagout (LOTO) protocols, calibrated safety discharge sticks, and specialized PPE during all operations.'
) x WHERE NOT EXISTS (SELECT 1 FROM why_points);

INSERT INTO projects (sort_order,category,tag,client,title,description,featured) SELECT * FROM (
 SELECT 1 a,'HT/LT Substations' b,'33kV/433V SUBSTATION' c,'AUTOMOTIVE INDUSTRIAL PLANT' d,'Turnkey 33kV Substation & Dual 2500 kVA Transformer Yard' e,'Complete design, CEIG approval liaison, civil plinth construction, equipment erection, and live grid synchronization.' f,1 g UNION ALL
 SELECT 2,'Cable Routing','CABLE INFRASTRUCTURE','PHARMA MANUFACTURING UNIT','12,000m Multi-Tier Cable Tray & Armored Cabling','Precision ladder tray installation along with fire-barrier sealing and high-grade gland terminations.',0 UNION ALL
 SELECT 3,'Panel Boards','PANEL MANUFACTURING','TEXTILE PROCESSING COMPLEX','4000A Main Power Control Center (PCC) Panel','Form 4b compartmentalized design with ACB protection and automated 12-step APFC harmonic filtration.',0 UNION ALL
 SELECT 4,'HT/LT Substations','EMERGENCY SYNCHRONIZATION','IT TECHNOLOGY CAMPUS','2 x 1500 kVA Automated DG Backup & AMF Synchronizing System','Seamless grid-to-generator auto transfer system with zero-break load transition and remote SCADA integration.',1
) x WHERE NOT EXISTS (SELECT 1 FROM projects);

INSERT INTO process_steps (sort_order,title,description,phase) SELECT * FROM (
 SELECT 1 a,'Requirement Discussion' b,'Understand project requirements, electrical loads and technical expectations.' c,'INTAKE' d UNION ALL
 SELECT 2,'Site Inspection','Evaluate the site, existing infrastructure and installation requirements.','SURVEY' UNION ALL
 SELECT 3,'Technical Planning','Prepare technical layouts, electrical planning and project execution strategy.','ENGINEERING' UNION ALL
 SELECT 4,'Documentation & Approvals','Coordinate applicable technical documentation and approval requirements.','STATUTORY' UNION ALL
 SELECT 5,'Installation & Execution','Execute HT/LT installation, cable infrastructure, equipment and panel-related work.','BUILD' UNION ALL
 SELECT 6,'Testing & Handover','Complete applicable inspections, testing and project handover.','COMMISSIONING'
) x WHERE NOT EXISTS (SELECT 1 FROM process_steps);

INSERT INTO testimonials (sort_order,name,role,quote) SELECT * FROM (
 SELECT 1 a,'D. Narayanan' b,'Infrastructure Director, Sterling Tech Parks' c,'When our distribution transformer failed during monsoon season, ARUL ELECTRICAL deployed, tested, and energized a replacement 1000 kVA transformer within 48 hours. Exceptional emergency support.' d UNION ALL
 SELECT 2,'R. Sundararajan','VP Engineering, Apex Auto Components','ARUL ELECTRICAL handled our entire 11kV substation expansion seamlessly. Their CEIG approval liaison saved us nearly 4 weeks of red tape. The panel board build quality is truly top-tier.' UNION ALL
 SELECT 3,'M. Karthikeyan','Plant Head, Horizon Metals & Alloys','Their team manufactured our customized 3200A MCC panel and installed high-tension underground cables without disturbing our continuous furnace operations. Extremely disciplined safety compliance.'
) x WHERE NOT EXISTS (SELECT 1 FROM testimonials);

-- SEO content update (applied automatically on a fresh install)
ALTER TABLE settings ADD COLUMN footer_address TEXT, ADD COLUMN logo_alt VARCHAR(200) DEFAULT '', ADD COLUMN hero_alt VARCHAR(200) DEFAULT '', ADD COLUMN about_alt VARCHAR(200) DEFAULT '', ADD COLUMN why_alt VARCHAR(200) DEFAULT '';
ALTER TABLE capabilities ADD COLUMN image_alt VARCHAR(200) DEFAULT '';
ALTER TABLE services ADD COLUMN image_alt VARCHAR(200) DEFAULT '';
ALTER TABLE equipment ADD COLUMN image_alt VARCHAR(200) DEFAULT '';
ALTER TABLE projects ADD COLUMN image_alt VARCHAR(200) DEFAULT '';
CREATE TABLE IF NOT EXISTS faqs (id INT AUTO_INCREMENT PRIMARY KEY, sort_order INT DEFAULT 0, question VARCHAR(255), answer TEXT);
UPDATE settings SET hours='Monday to Saturday, 9:00 AM to 6:30 PM', footer_address='Central Engineering HQ, Guindy Industrial Estate, Chennai, Tamil Nadu, India', logo_alt='ARUL ELECTRICAL logo, A-Grade licensed electrical contractors and consultants in Chennai', hero_alt='Engineers in hard hats reviewing plans beside a high-voltage substation transformer', about_alt='Technicians assembling a copper busbar switchboard in an electrical panel workshop', why_alt='Two engineers in hard hats and safety vests pointing at a high-voltage substation' WHERE id=1;
UPDATE capabilities SET description='High-voltage grid connection, indoor and outdoor electrical substation installation, switchyard installation and a complete LT electrical power distribution system for industrial sites.', image_alt='Engineers in orange overalls working in an HT switchyard with substation structures' WHERE sort_order=1;
UPDATE capabilities SET description='Transformer installation and supply, with civil plinth mounting, erection, vacuum oil filtration, BDV testing, earth mat grounding and live charging of power transformers.', image_alt='Oil-filled power transformer with bushings inside a substation yard' WHERE sort_order=2;
UPDATE capabilities SET description='In-house custom manufacturing of CPRI-compliant PCC and MCC panels, APFC (automatic power factor controller) panels, AMF (auto mains failure) panels, generator synchronization panels and industrial VCB boards.', image_alt='Rows of industrial electrical control panels in a panel manufacturing facility' WHERE sort_order=3;
UPDATE capabilities SET description='Statutory Indian Electricity Rules (Rule 45 & Rule 32) compliance, CEIG approval drawings, grid synchronization and licensing assistance.', image_alt='Engineer in a hard hat reviewing electrical drawings on a tablet over a plan table' WHERE sort_order=4;
UPDATE about_points SET description='Class-1 turnkey execution for manufacturing plants, heavy mills and commercial parks.' WHERE sort_order=1;
UPDATE about_points SET description='Single-line diagram (SLD) preparation, earthing designs and fault level calculations, backed by our electrical consultancy services and electrical engineering services.' WHERE sort_order=2;
UPDATE about_points SET description='Rigorous testing using calibrated Meggers, Hi-Pot analyzers and secondary injection kits.' WHERE sort_order=3;
UPDATE services SET description='New HT connection installation with technical documentation, scheme drawings and coordination for grid approval and sanctioning.', image_alt='Two engineers in hard hats reviewing HT connection drawings at a substation' WHERE sort_order=1;
UPDATE services SET description='LT electrical installation services for industrial factory shopfloors, warehouses and commercial facility power distribution, completing your HT/LT electrical installation.', image_alt='Electrician in a hard hat wiring an LT distribution panel in an industrial plant' WHERE sort_order=2;
UPDATE services SET description='In-house electrical panel manufacturing for PCC, MCC, LT, APFC, AMF and DG synchronization panels, built to project specifications.', image_alt='Technician assembling a PCC and MCC panel board in a manufacturing workshop' WHERE sort_order=3;
UPDATE services SET description='Technical documentation, statutory safety clearance, CEIG approval liaison and electrical statutory compliance support for mandatory Rule 45 and Rule 32 requirements.', image_alt='Engineers reviewing Rule 45 and Rule 32 documentation files and single-line diagrams' WHERE sort_order=4;
UPDATE services SET description='HT/LT cable laying in Chennai with underground trenching, XLPE jointing, armoured cable pulling, termination and Megger testing.', image_alt='Two engineers with a tablet at a substation planning underground HT and LT cable laying' WHERE sort_order=5;
UPDATE services SET description='Cable tray installation with heavy-duty GI perforated and ladder-type trays, structural supports, seismic clamps and organised multi-tier bundling.', image_alt='Technicians in orange suits routing cable trays beside a substation transformer yard' WHERE sort_order=6;
UPDATE services SET description='Transformer installation and supply of high-efficiency copper-wound transformers, with civil foundation alignment, marshalling box wiring and full commissioning.', image_alt='Engineers inspecting a power transformer at an outdoor substation' WHERE sort_order=7;
UPDATE services SET description='HT panel supply and turnkey site installation of 11kV/22kV/33kV VCB panels, Ring Main Units (RMU) and protection relays.', image_alt='Engineers checking an HT panel with VCB switchgear and protection relays' WHERE sort_order=8;
UPDATE services SET description='DG set installation in Chennai and supply of industrial diesel generator sets, ATS/AMF panels, exhaust silencer stacks and synchronized standby systems for uninterrupted industrial continuity.', image_alt='Technician and engineer commissioning a yellow diesel generator set with its control panel' WHERE sort_order=9;
UPDATE equipment SET description='Power transformer supplier and installer in Chennai for high-capacity step-down and step-up transformers (100 kVA to 5000 kVA), with turnkey civil erection, oil filtration and protective earthing.', image_alt='Oil-cooled power transformer on a concrete plinth in an outdoor transformer yard' WHERE sort_order=1;
UPDATE equipment SET description='Vacuum Circuit Breaker (VCB) panels, Ring Main Units (RMU) and custom Motor Control Centers, engineered to withstand high short-circuit levels.', image_alt='Row of HT switchgear panels with numerical relays in a switch room' WHERE sort_order=2;
UPDATE equipment SET description='Heavy industrial silent DG sets for continuous and emergency standby backup, with generator synchronization, acoustic room treatment and fuel piping.', image_alt='Silent diesel generator set in an enclosure beside an industrial building' WHERE sort_order=3;
UPDATE why_points SET description='A statutorily recognised licence that enables our teams, as a government licensed electrical contractor, to handle unrestricted voltage classes and major utility interconnections.' WHERE sort_order=1;
UPDATE why_points SET description='Expert power engineering guidance on transformer sizing, demand factor estimation and harmonic distortion mitigation.' WHERE sort_order=2;
UPDATE why_points SET description='Proven engineering methods for heavy busduct installations, overhead HT distribution lines and internal LT raceways.' WHERE sort_order=3;
UPDATE why_points SET description='Turnkey statutory handling covering CEIG drawings, Rule 45 & Rule 32 submissions and final electrical safety fitness clearance.' WHERE sort_order=4;
UPDATE why_points SET description='Use of premier tier-1 switchgear components, certified copper busbars and dual-layer thermal insulation sleeves.' WHERE sort_order=5;
UPDATE why_points SET description='Mandatory Lockout/Tagout (LOTO) protocols, calibrated safety discharge sticks and specialised PPE during all operations.' WHERE sort_order=6;
UPDATE projects SET image_alt='33kV substation with a dual transformer yard and steel switchyard structures under a blue sky' WHERE sort_order=1;
UPDATE projects SET image_alt='Multi-tier cable trays carrying armoured cables through a manufacturing facility' WHERE sort_order=2;
UPDATE projects SET image_alt='Technicians testing a row of PCC and MCC panel boards in a panel workshop' WHERE sort_order=3;
UPDATE projects SET image_alt='Two diesel generators with an AMF synchronizing panel in a generator room' WHERE sort_order=4;
INSERT INTO faqs (sort_order,question,answer) SELECT * FROM (
 SELECT 1 a,'What does an industrial electrical contractor in Chennai do?' b,'ARUL ELECTRICAL plans, installs, tests and commissions HT and LT electrical systems for industrial plants, including electrical substation installation, transformers, HT and LT panels, cable laying, cable trays and DG sets, along with the statutory documentation they need.' c UNION ALL
 SELECT 2,'Are you a licensed electrical contractor?','Yes. ARUL ELECTRICAL is an A-Grade government licensed electrical contractor and consultant, working to CEA and DISCOM requirements and CEIG statutory approvals.' UNION ALL
 SELECT 3,'Are you an electrical panel manufacturer in Chennai?','Yes. As an electrical panel manufacturer and control panel manufacturer, we build PCC panels, MCC panels, LT distribution panels, automatic power factor correction (APFC) panels, auto mains failure (AMF) panels, generator synchronization panels and HT VCB boards in-house, to each project''s specification.' UNION ALL
 SELECT 4,'Can you install and synchronize DG sets?','Yes. We supply and install industrial diesel generator sets with ATS/AMF panels, and build DG synchronization panels for seamless grid-to-generator changeover and standby power.' UNION ALL
 SELECT 5,'Do you handle transformer installation and HT connection approvals?','Yes. Our transformer installation covers civil plinth work, erection, oil filtration, testing and earthing. We also prepare Rule 45 and Rule 32 documentation and act as your CEIG approval consultant in Chennai for HT connection approvals.' UNION ALL
 SELECT 6,'How do I get an estimate for my project?','Fill in the Project Technical Assessment Form or call our technical team with your voltage requirement, equipment needed, site location, sanctioned load in kVA and target completion timeline.' UNION ALL
 SELECT 7,'Where can I find licensed electrical contractors near me in Chennai?','ARUL ELECTRICAL has its engineering office in the Guindy Industrial Zone, Chennai, Tamil Nadu. Contact our team to discuss your site, your requirements and a technical audit.'
) x WHERE NOT EXISTS (SELECT 1 FROM faqs);
