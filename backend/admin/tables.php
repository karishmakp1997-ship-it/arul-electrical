<?php
// Every editable section of the website. [column, label, type, options]
return [
 'settings' => ['label' => 'Site Settings', 'single' => true, 'fields' => [
   ['company','Company name','text'], ['tagline','Tagline','text'], ['phone','Main phone','text'], ['hotline','Support hotline(s)','text'],
   ['email','Email','text'], ['address','Office address (contact section)','textarea'], ['footer_address','Office address (footer)','textarea'], ['hours','Operations hours','text'],
   ['logo','Logo','image'], ['logo_alt','Logo alt text','text'], ['hero_image','Hero background image','image'], ['hero_alt','Hero image alt text','text'],
   ['about_image','About section image','image'], ['about_alt','About image alt text','text'], ['why_image','Why-choose-us image','image'], ['why_alt','Why-choose-us image alt text','text']]],
 'capabilities' => ['label' => 'Capabilities', 'fields' => [
   ['title','Title','text'], ['description','Description','textarea'], ['badge','Bottom link text','text'], ['image','Image','image'], ['image_alt','Image alt text','text']]],
 'about_points' => ['label' => 'About Points', 'fields' => [['title','Title','text'], ['description','Description','textarea']]],
 'services' => ['label' => 'Services', 'fields' => [
   ['tag','Tag (e.g. HT GRID)','text'], ['title','Title','text'], ['description','Description','textarea'], ['image','Image','image'], ['image_alt','Image alt text','text']]],
 'equipment' => ['label' => 'Equipment', 'fields' => [
   ['tag','Tag','text'], ['title','Title','text'], ['description','Description','textarea'], ['bullets','Bullet points (one per line)','textarea'], ['image','Image','image'], ['image_alt','Image alt text','text']]],
 'why_points' => ['label' => 'Why Choose Us', 'fields' => [['title','Title','text'], ['description','Description','textarea']]],
 'projects' => ['label' => 'Projects', 'fields' => [
   ['category','Filter category','select',['HT/LT Substations','Panel Boards','Cable Routing']],
   ['tag','Image tag','text'], ['client','Client / site type','text'], ['title','Title','text'], ['description','Description','textarea'],
   ['featured','Large featured card','checkbox'], ['image','Image','image'], ['image_alt','Image alt text','text']]],
 'process_steps' => ['label' => 'Process Steps', 'fields' => [
   ['title','Title','text'], ['description','Description','textarea'], ['phase','Phase (e.g. INTAKE)','text']]],
 'testimonials' => ['label' => 'Testimonials', 'fields' => [
   ['name','Name','text'], ['role','Role, Company','text'], ['quote','Quote','textarea'], ['photo','Photo','image']]],
 'faqs' => ['label' => 'FAQs', 'fields' => [['question','Question','text'], ['answer','Answer','textarea']]],
];
