import React, { useState, useRef, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Cabinet+Grotesk:wght@300;400;500;600;700;800&display=swap');`;

const css = `
${FONTS}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --ink: #0a0a0a;
  --ink2: #2a2a2a;
  --ink3: #6b6b6b;
  --ink4: #9b9b9b;
  --surface: #ffffff;
  --surface2: #f7f6f3;
  --surface3: #f0ede8;
  --accent: #c8a96e;
  --accent2: #a8893e;
  --accent-light: #faf6ee;
  --green: #2d5a3d;
  --green2: #3d7a52;
  --green-light: #eef5f1;
  --border: #e8e4dc;
  --radius: 12px;
  --radius-lg: 20px;
}
html { scroll-behavior: smooth; }
body { font-family: 'Cabinet Grotesk', sans-serif; background: var(--surface); color: var(--ink); overflow-x: hidden; }
h1,h2,h3,h4,h5 { font-family: 'Fraunces', serif; }

/* ── NAVBAR ── */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 5%; display: flex; align-items: center; justify-content: space-between; height: 64px; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
.nav-logo { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: var(--ink); letter-spacing: -0.5px; cursor: pointer; }
.nav-logo span { color: var(--accent); }
.nav-links { display: flex; align-items: center; gap: 32px; }
.nav-link { font-size: 14px; color: var(--ink3); text-decoration: none; transition: color 0.15s; cursor: pointer; }
.nav-link:hover { color: var(--ink); }
.nav-cta { padding: 8px 20px; border-radius: 999px; background: var(--ink); color: #fff; font-family: 'Cabinet Grotesk', sans-serif; font-size: 14px; font-weight: 500; border: none; cursor: pointer; transition: all 0.15s; }
.nav-cta:hover { background: var(--ink2); transform: translateY(-1px); }

/* ── HERO ── */
.hero { min-height: 100vh; display: flex; align-items: center; padding: 100px 5% 80px; position: relative; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 50%, #fdf8ef 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, #e8f5ee 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, #f0e8f5 0%, transparent 50%); pointer-events: none; }
.hero-grain { position: absolute; inset: 0; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); pointer-events: none; }
.hero-content { max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-light); border: 1px solid rgba(200,169,110,0.3); border-radius: 999px; padding: 6px 14px; font-size: 13px; color: var(--accent2); font-weight: 500; margin-bottom: 24px; }
.hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
.hero-title { font-size: clamp(42px, 5vw, 64px); font-weight: 600; line-height: 1.1; letter-spacing: -1.5px; color: var(--ink); margin-bottom: 20px; }
.hero-title em { font-style: italic; color: var(--accent); }
.hero-subtitle { font-size: 18px; color: var(--ink3); line-height: 1.65; margin-bottom: 36px; font-weight: 400; max-width: 440px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
.btn-primary { padding: 14px 28px; border-radius: 999px; background: var(--green); color: #fff; font-family: 'Cabinet Grotesk', sans-serif; font-size: 15px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
.btn-primary:hover { background: var(--green2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(45,90,61,0.25); }
.btn-secondary { padding: 14px 28px; border-radius: 999px; background: transparent; color: var(--ink); font-family: 'Cabinet Grotesk', sans-serif; font-size: 15px; font-weight: 500; border: 1.5px solid var(--border); cursor: pointer; transition: all 0.2s; }
.btn-secondary:hover { border-color: var(--ink3); background: var(--surface2); }
.hero-trust { display: flex; align-items: center; gap: 16px; font-size: 13px; color: var(--ink4); }
.hero-trust-dots { display: flex; gap: -4px; }
.trust-dot { width: 28px; height: 28px; border-radius: 50%; background: var(--surface3); border: 2px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; margin-left: -6px; }
.hero-visual { position: relative; }
.invoice-card { background: #fff; border-radius: 20px; box-shadow: 0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06); padding: 28px; border: 1px solid var(--border); transform: rotate(1.5deg); transition: transform 0.3s; }
.invoice-card:hover { transform: rotate(0deg); }
.invoice-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.invoice-logo-block { width: 48px; height: 48px; border-radius: 10px; background: var(--green); display: flex; align-items: center; justify-content: center; color: #fff; font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; }
.invoice-title-block { text-align: right; }
.invoice-title-block h3 { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; color: var(--ink); }
.invoice-title-block p { font-size: 12px; color: var(--ink4); margin-top: 2px; }
.invoice-divider { height: 1px; background: var(--border); margin: 16px 0; }
.invoice-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; }
.invoice-row span:first-child { color: var(--ink3); }
.invoice-row span:last-child { font-weight: 500; color: var(--ink); }
.invoice-total-row { display: flex; justify-content: space-between; font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; padding: 12px 0 0; border-top: 2px solid var(--ink); margin-top: 8px; }
.floating-tag { position: absolute; background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 10px 14px; font-size: 12px; font-weight: 500; box-shadow: 0 4px 16px rgba(0,0,0,0.08); white-space: nowrap; }
.floating-tag.top { top: -16px; right: 20px; color: var(--green); display: flex; align-items: center; gap: 6px; }
.floating-tag.bottom { bottom: -16px; left: 20px; color: var(--ink3); }
.tag-icon { width: 20px; height: 20px; background: var(--green-light); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; }



/* ── HOW IT WORKS ── */
.how-section { padding: 100px 5%; background: linear-gradient(160deg, #f0ede8 0%, #eef5f1 100%); }
.section-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent2); margin-bottom: 12px; }
.section-title { font-family: 'Fraunces', serif; font-size: clamp(32px, 4vw, 48px); font-weight: 500; color: var(--ink); margin-bottom: 16px; letter-spacing: -1px; line-height: 1.15; }
.section-subtitle { font-size: 17px; color: var(--ink3); line-height: 1.6; max-width: 480px; }
.how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 60px; background: var(--border); border-radius: 20px; overflow: hidden; }
.how-card { background: var(--surface); padding: 40px 32px; }
.how-num { font-family: 'Fraunces', serif; font-size: 48px; font-weight: 300; color: var(--border); line-height: 1; margin-bottom: 20px; }
.how-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--accent-light); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; }
.how-card h3 { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 500; color: var(--ink); margin-bottom: 8px; }
.how-card p { font-size: 14px; color: var(--ink3); line-height: 1.6; }

/* ── FEATURES ── */
.features-section { padding: 100px 5%; }
.features-inner { max-width: 1200px; margin: 0 auto; }
.features-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; margin-bottom: 64px; }
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.feature-card { padding: 28px; border-radius: var(--radius-lg); border: 1px solid var(--border); background: var(--surface); transition: all 0.2s; }
.feature-card:hover { border-color: var(--accent); box-shadow: 0 8px 32px rgba(200,169,110,0.1); transform: translateY(-2px); }
.feature-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; }
.feature-card h3 { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 500; color: var(--ink); margin-bottom: 8px; }
.feature-card p { font-size: 14px; color: var(--ink3); line-height: 1.6; }

/* ── PRICING ── */
.pricing-section { padding: 100px 5%; background: linear-gradient(160deg, #eef5f1 0%, #f5f0e8 100%); }
.pricing-inner { max-width: 900px; margin: 0 auto; text-align: center; }
.pricing-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 56px; text-align: left; }
.pricing-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 36px; }
.pricing-card.featured { background: var(--ink); border-color: var(--ink); }
.pricing-tier { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink3); margin-bottom: 8px; }
.pricing-card.featured .pricing-tier { color: var(--accent); }
.pricing-price { font-family: 'Fraunces', serif; font-size: 52px; font-weight: 600; color: var(--ink); line-height: 1; margin-bottom: 4px; letter-spacing: -2px; }
.pricing-card.featured .pricing-price { color: #fff; }
.pricing-price sub { font-size: 16px; font-weight: 400; letter-spacing: 0; }
.pricing-period { font-size: 14px; color: var(--ink4); margin-bottom: 28px; }
.pricing-card.featured .pricing-period { color: #888; }
.pricing-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
.pricing-feature { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ink2); }
.pricing-card.featured .pricing-feature { color: #ccc; }
.pricing-check { width: 20px; height: 20px; border-radius: 50%; background: var(--green-light); display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; color: var(--green); font-weight: 700; }
.pricing-card.featured .pricing-check { background: rgba(45,90,61,0.3); color: #6fcf97; }
.pricing-btn { width: 100%; padding: 13px; border-radius: 999px; font-family: 'Cabinet Grotesk', sans-serif; font-size: 15px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; }
.pricing-btn-free { background: var(--surface2); color: var(--ink); }
.pricing-btn-free:hover { background: var(--surface3); }
.pricing-btn-pro { background: var(--accent); color: #fff; }
.pricing-btn-pro:hover { background: var(--accent2); transform: translateY(-1px); }

/* ── FOOTER ── */
.footer { padding: 48px 5%; border-top: 1px solid var(--border); }
.footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
.footer-logo { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; color: var(--ink); }
.footer-logo span { color: var(--accent); }
.footer-copy { font-size: 13px; color: var(--ink4); }
.footer-links { display: flex; gap: 24px; }
.footer-link { font-size: 13px; color: var(--ink3); text-decoration: none; cursor: pointer; }
.footer-link:hover { color: var(--ink); }

/* ── APP ── */
.app-wrap { min-height: 100vh; background: linear-gradient(135deg, #f5f0e8 0%, #eef5f1 50%, #f0ede8 100%); padding: 80px 0 0; }
.app-header { background: #fff; border-bottom: 1px solid var(--border); padding: 0 5%; height: 64px; display: flex; align-items: center; justify-content: space-between; position: fixed; top: 0; left: 0; right: 0; z-index: 50; }
.app-logo { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; cursor: pointer; }
.app-logo span { color: var(--accent); }
.app-tabs { display: flex; gap: 4px; }
.app-tab { padding: 7px 18px; border-radius: 999px; font-size: 14px; font-weight: 500; border: none; cursor: pointer; transition: all 0.15s; background: transparent; color: var(--ink3); }
.app-tab.active { background: var(--ink); color: #fff; }
.app-tab:hover:not(.active) { background: var(--surface2); color: var(--ink); }
.app-body { max-width: 1200px; margin: 0 auto; padding: 32px 5%; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.app-form-col { display: flex; flex-direction: column; gap: 16px; }
.app-preview-col { position: sticky; top: 96px; }

/* FORM CARDS */
.form-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; }
.form-card-title { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 500; color: var(--ink); margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--surface3); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 4px; }
.field label { font-size: 12px; font-weight: 500; color: var(--ink3); }
.field input, .field textarea, .field select { padding: 9px 12px; border-radius: 10px; border: 1px solid var(--border); font-family: 'Cabinet Grotesk', sans-serif; font-size: 13px; color: var(--ink); background: var(--surface2); outline: none; transition: border 0.15s, background 0.15s; width: 100%; }
.field input:focus, .field textarea:focus, .field select:focus { border-color: var(--accent); background: #fff; }
.field textarea { resize: vertical; min-height: 68px; }
.opt-tag { font-size: 10px; color: var(--ink4); margin-left: 4px; }

/* TEMPLATE SELECTOR */
.template-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.template-opt { border: 2px solid var(--border); border-radius: 12px; padding: 12px 10px; cursor: pointer; text-align: center; transition: all 0.15s; background: var(--surface2); }
.template-opt:hover { border-color: var(--accent); }
.template-opt.selected { border-color: var(--accent); background: var(--accent-light); }
.template-thumb { height: 56px; border-radius: 6px; margin-bottom: 8px; display: flex; flex-direction: column; gap: 3px; padding: 6px; }
.template-thumb-line { height: 4px; border-radius: 2px; background: var(--border); }
.template-thumb-line.dark { background: var(--ink); }
.template-thumb-line.accent { background: var(--accent); }
.template-thumb-line.short { width: 60%; }
.template-thumb-line.shorter { width: 40%; }
.template-name { font-size: 12px; font-weight: 500; color: var(--ink2); }

/* LINE ITEMS */
.line-items { display: flex; flex-direction: column; gap: 8px; }
.line-item { display: grid; grid-template-columns: 1fr 72px 88px 28px; gap: 7px; align-items: center; }
.line-item input { padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border); font-family: 'Cabinet Grotesk', sans-serif; font-size: 13px; color: var(--ink); background: var(--surface2); outline: none; width: 100%; }
.line-item input:focus { border-color: var(--accent); background: #fff; }
.li-headers { display: grid; grid-template-columns: 1fr 72px 88px 28px; gap: 7px; margin-bottom: 4px; }
.li-header { font-size: 11px; font-weight: 600; color: var(--ink4); text-transform: uppercase; letter-spacing: 0.06em; padding: 0 10px; }
.li-header.c { text-align: center; }
.li-header.r { text-align: right; }
.remove-btn { width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--border); background: none; color: var(--ink4); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
.remove-btn:hover { border-color: #e57373; color: #e57373; background: #fef0f0; }
.add-item-btn { padding: 7px 14px; border-radius: 8px; border: 1px dashed var(--border); background: none; color: var(--green); font-family: 'Cabinet Grotesk', sans-serif; font-size: 13px; cursor: pointer; margin-top: 4px; }
.add-item-btn:hover { background: var(--green-light); border-color: var(--green); }

/* TOTALS */
.totals-box { background: var(--surface2); border-radius: 10px; padding: 14px; margin-top: 12px; }
.total-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--ink3); padding: 4px 0; align-items: center; }
.total-row.grand { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: var(--ink); padding-top: 8px; border-top: 1px solid var(--border); margin-top: 4px; }
.total-input { width: 80px; padding: 4px 8px; border-radius: 6px; border: 1px solid var(--border); font-family: 'Cabinet Grotesk', sans-serif; font-size: 13px; text-align: right; background: #fff; outline: none; }

/* LOGO UPLOAD */
.logo-upload { border: 1.5px dashed var(--border); border-radius: 10px; padding: 14px 16px; cursor: pointer; transition: all 0.15s; background: var(--surface2); display: flex; align-items: center; gap: 12px; }
.logo-upload:hover { border-color: var(--accent); background: var(--accent-light); }
.logo-preview { max-height: 40px; max-width: 120px; object-fit: contain; border-radius: 6px; }
.logo-upload-text { font-size: 13px; color: var(--ink3); }
.logo-upload-text strong { color: var(--accent2); display: block; margin-bottom: 1px; }
.logo-remove { padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: none; font-size: 12px; color: var(--ink3); cursor: pointer; margin-left: auto; }
.logo-remove:hover { border-color: #e57373; color: #e57373; }

/* ACTIONS */
.gen-btn { width: 100%; padding: 13px; border-radius: 999px; border: none; background: var(--green); color: #fff; font-family: 'Cabinet Grotesk', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
.gen-btn:hover { background: var(--green2); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(45,90,61,0.25); }
.gen-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
.spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* PREVIEW */
.preview-card { background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border); padding: 28px; min-height: 400px; }
.preview-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink4); margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
.download-btn { padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: none; font-family: 'Cabinet Grotesk', sans-serif; font-size: 12px; font-weight: 500; color: var(--ink2); cursor: pointer; display: flex; align-items: center; gap: 6px; }
.download-btn:hover { background: var(--surface2); }
.preview-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 360px; color: var(--ink4); text-align: center; }
.preview-empty-icon { font-size: 40px; margin-bottom: 12px; opacity: 0.4; }
.preview-empty p { font-size: 14px; }

/* INVOICE PREVIEW STYLES */
.inv-preview { font-family: 'Cabinet Grotesk', sans-serif; }
.inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.inv-logo-img { max-height: 44px; max-width: 120px; object-fit: contain; }
.inv-logo-name { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; color: var(--green); }
.inv-right { text-align: right; }
.inv-title { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 600; letter-spacing: -1px; color: var(--ink); }
.inv-num { font-size: 12px; color: var(--ink4); margin-top: 3px; }
.inv-dates { font-size: 12px; color: var(--ink3); margin-top: 4px; line-height: 1.8; }
.inv-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.inv-party-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink4); margin-bottom: 4px; }
.inv-party-name { font-family: 'Fraunces', serif; font-size: 14px; font-weight: 500; }
.inv-party-sub { font-size: 12px; color: var(--ink3); line-height: 1.5; }
.inv-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 13px; }
.inv-table th { text-align: left; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink4); padding: 8px 8px; border-bottom: 2px solid var(--ink); }
.inv-table th.r { text-align: right; }
.inv-table td { padding: 9px 8px; color: var(--ink2); border-bottom: 1px solid var(--surface3); }
.inv-table td.r { text-align: right; font-weight: 500; color: var(--ink); }
.inv-totals { margin-left: auto; width: 200px; }
.inv-total-row { display: flex; justify-content: space-between; font-size: 12px; color: var(--ink3); padding: 3px 0; }
.inv-grand { display: flex; justify-content: space-between; font-family: 'Fraunces', serif; font-size: 15px; font-weight: 600; padding-top: 8px; border-top: 2px solid var(--ink); margin-top: 4px; }
.inv-notes { margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--surface3); font-size: 12px; color: var(--ink3); line-height: 1.6; }
.inv-notes strong { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink4); margin-bottom: 4px; }
.inv-footer-txt { margin-top: 20px; text-align: center; font-size: 11px; color: #ccc; }

/* CONTRACT PREVIEW */
.con-header { text-align: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid var(--ink); }
.con-logo-img { max-height: 36px; max-width: 100px; object-fit: contain; display: block; margin: 0 auto 8px; }
.con-title { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; letter-spacing: -0.3px; }
.con-sub { font-size: 12px; color: var(--ink4); margin-top: 3px; }
.con-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: var(--surface2); border-radius: 8px; padding: 12px; margin-bottom: 16px; }
.con-party-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink4); margin-bottom: 3px; }
.con-party-name { font-family: 'Fraunces', serif; font-size: 13px; font-weight: 600; }
.con-party-sub { font-size: 11px; color: var(--ink3); }
.clause { margin-bottom: 14px; }
.clause-num { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--green); margin-bottom: 2px; }
.clause-title { font-family: 'Fraunces', serif; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.clause-body { font-size: 12px; color: var(--ink2); line-height: 1.65; }
.sigs { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--surface3); }
.sig-line { border-bottom: 1px solid var(--ink); height: 28px; margin-bottom: 4px; }
.sig-label { font-size: 10px; color: var(--ink4); }
.sig-name { font-size: 12px; font-weight: 500; margin-top: 2px; }
.disclaimer { margin-top: 14px; padding: 10px 12px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 6px 6px 0; font-size: 11px; color: #92400e; line-height: 1.5; }

/* PAYWALL */
.paywall-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 20px; backdrop-filter: blur(4px); }
.paywall-card { background: #fff; border-radius: 24px; padding: 44px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 32px 80px rgba(0,0,0,0.25); }
.paywall-icon { font-size: 44px; margin-bottom: 12px; }
.paywall-card h3 { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; color: var(--ink); margin-bottom: 10px; letter-spacing: -0.5px; }
.paywall-card p { font-size: 15px; color: var(--ink3); line-height: 1.6; margin-bottom: 24px; }
.paywall-price { font-family: 'Fraunces', serif; font-size: 52px; font-weight: 600; color: var(--green); letter-spacing: -2px; line-height: 1; }
.paywall-price sub { font-size: 16px; font-weight: 400; letter-spacing: 0; color: var(--ink4); }
.paywall-period { font-size: 13px; color: var(--ink4); margin-bottom: 24px; }
.paywall-features { text-align: left; background: var(--surface2); border-radius: 12px; padding: 16px; margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px; }
.pf { font-size: 14px; color: var(--ink2); display: flex; gap: 8px; align-items: flex-start; }
.pf::before { content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; margin-top: 1px; }
.paywall-btn { width: 100%; padding: 14px; border-radius: 999px; border: none; background: var(--green); color: #fff; font-family: 'Cabinet Grotesk', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; margin-bottom: 10px; transition: all 0.2s; }
.paywall-btn:hover { background: var(--green2); transform: translateY(-1px); }
.paywall-dismiss { font-size: 13px; color: var(--ink4); cursor: pointer; }
.paywall-dismiss:hover { color: var(--ink); }

/* GATE WALL */
.gate-wall { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 52px 40px; text-align: center; margin: 40px auto; max-width: 480px; }
.gate-icon { font-size: 40px; margin-bottom: 16px; }
.gate-wall h3 { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
.gate-wall p { font-size: 15px; color: var(--ink3); line-height: 1.6; margin-bottom: 24px; }
.gate-price { font-family: 'Fraunces', serif; font-size: 44px; font-weight: 600; color: var(--green); letter-spacing: -2px; margin-bottom: 4px; }
.gate-price span { font-size: 16px; font-weight: 400; color: var(--ink4); letter-spacing: 0; }
.gate-features { text-align: left; background: var(--surface2); border-radius: 10px; padding: 16px; margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px; }
.gate-btn { width: 100%; padding: 14px; border-radius: 999px; border: none; background: var(--green); color: #fff; font-family: 'Cabinet Grotesk', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.gate-btn:hover { background: var(--green2); }


/* ── LEGAL PAGES ── */
.legal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px); }
.legal-modal { background: #fff; border-radius: 20px; max-width: 680px; width: 100%; max-height: 88vh; overflow-y: auto; box-shadow: 0 32px 80px rgba(0,0,0,0.2); }
.legal-header { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: #fff; z-index: 1; border-radius: 20px 20px 0 0; }
.legal-header h2 { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; letter-spacing: -0.3px; }
.legal-header p { font-size: 12px; color: var(--ink4); margin-top: 2px; }
.legal-close { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); background: none; cursor: pointer; font-size: 16px; color: var(--ink3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.legal-close:hover { background: var(--surface2); }
.legal-body { padding: 28px 32px 36px; }
.legal-section { margin-bottom: 24px; }
.legal-section h3 { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 8px; }
.legal-section p { font-size: 14px; color: var(--ink2); line-height: 1.75; margin-bottom: 8px; }
.legal-section ul { padding-left: 18px; margin-top: 6px; }
.legal-section ul li { font-size: 14px; color: var(--ink2); line-height: 1.75; margin-bottom: 4px; }
.legal-highlight { background: var(--accent-light); border-left: 3px solid var(--accent); border-radius: 0 8px 8px 0; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; color: var(--accent2); line-height: 1.6; }


/* ── SUCCESS STATE ── */
.success-banner { background: var(--green-light); border: 1px solid var(--green); border-radius: var(--radius); padding: 16px 20px; display: flex; align-items: center; gap: 14px; margin-bottom: 16px; animation: slideIn 0.3s ease; }
@keyframes slideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
.success-icon { width: 36px; height: 36px; background: var(--green); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; flex-shrink: 0; }
.success-text { flex: 1; }
.success-text strong { font-size: 14px; font-weight: 600; color: var(--green); display: block; }
.success-text span { font-size: 13px; color: var(--ink3); }
.success-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.success-action-btn { padding: 7px 14px; border-radius: 999px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; border: none; }
.success-action-primary { background: var(--green); color: #fff; }
.success-action-primary:hover { background: var(--green2); }
.success-action-secondary { background: var(--surface2); color: var(--ink2); border: 1px solid var(--border); }
.success-action-secondary:hover { background: var(--surface3); }

/* ── EMAIL CAPTURE ── */
.email-capture { background: linear-gradient(135deg, var(--accent-light), var(--green-light)); border: 1px solid rgba(200,169,110,0.3); border-radius: var(--radius-lg); padding: 24px; margin-top: 12px; text-align: center; }
.email-capture h4 { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
.email-capture p { font-size: 13px; color: var(--ink3); margin-bottom: 16px; line-height: 1.5; }
.email-capture-row { display: flex; gap: 8px; max-width: 360px; margin: 0 auto; }
.email-capture-input { flex: 1; padding: 10px 14px; border-radius: 999px; border: 1px solid var(--border); font-family: 'Cabinet Grotesk', sans-serif; font-size: 13px; outline: none; }
.email-capture-input:focus { border-color: var(--accent); }
.email-capture-btn { padding: 10px 18px; border-radius: 999px; background: var(--accent); color: #fff; border: none; font-family: 'Cabinet Grotesk', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; }
.email-capture-btn:hover { background: var(--accent2); }
.email-submitted { font-size: 14px; color: var(--green); font-weight: 500; }

@media(max-width:768px){
  .hero-content,.app-body,.features-header { grid-template-columns:1fr; }
  .how-grid,.features-grid,.pricing-cards { grid-template-columns:1fr; }
  .hero-visual { display: none; }
  .app-preview-col { display: none; }
  .app-body { grid-template-columns: 1fr; }
}
`;

const CURRENCIES = ["USD $","EUR €","GBP £","INR ₹","AUD $","CAD $"];
const PAYMENT_TERMS = ["Due on Receipt","Net 7","Net 14","Net 30","50% Upfront / 50% on Delivery"];
const CONTRACT_CONFIGS = {
  "Freelance Service Agreement": {
    icon: "📋",
    color: "#eef5f1",
    extraFields: [
      { key: "deliveryFormat", label: "Delivery Format", placeholder: "e.g. PDF, Google Docs, Figma" },
      { key: "milestones", label: "Key Milestones", placeholder: "e.g. Draft by Week 2, Final by Week 4" },
    ],
    clauseHints: "Include clauses about general service delivery, quality standards, and communication expectations.",
  },
  "Web Design & Development Contract": {
    icon: "💻",
    color: "#e8eef5",
    extraFields: [
      { key: "techStack", label: "Tech Stack / Platform", placeholder: "e.g. React, WordPress, Shopify" },
      { key: "hostingIncluded", label: "Hosting Included?", placeholder: "e.g. No — client to arrange own hosting" },
      { key: "browserSupport", label: "Browser Support", placeholder: "e.g. Chrome, Safari, Firefox latest 2 versions" },
    ],
    clauseHints: "Include specific clauses about browser compatibility, hosting responsibility, CMS training, and post-launch support period.",
  },
  "Content Writing Agreement": {
    icon: "✍️",
    color: "#f5f0e8",
    extraFields: [
      { key: "wordCount", label: "Word Count / Volume", placeholder: "e.g. 2000 words per article, 4 articles/month" },
      { key: "topicApproval", label: "Topic Approval Process", placeholder: "e.g. Client approves topics 1 week before delivery" },
      { key: "plagiarismTool", label: "Plagiarism Check", placeholder: "e.g. Copyscape verified before delivery" },
    ],
    clauseHints: "Include clauses about SEO requirements, editing rounds, plagiarism-free guarantee, and content ownership transfer.",
  },
  "Consulting Agreement": {
    icon: "🤝",
    color: "#f0eef5",
    extraFields: [
      { key: "engagementModel", label: "Engagement Model", placeholder: "e.g. 10 hours/week retainer" },
      { key: "reportingCadence", label: "Reporting Cadence", placeholder: "e.g. Weekly status updates via email" },
      { key: "nonCompete", label: "Non-Compete Clause", placeholder: "e.g. No direct competitors for 6 months" },
    ],
    clauseHints: "Include clauses about advisory scope, non-compete, expense reimbursement, and IP created during engagement.",
  },
  "Graphic Design Contract": {
    icon: "🎨",
    color: "#fef5e8",
    extraFields: [
      { key: "fileFormats", label: "File Formats Delivered", placeholder: "e.g. AI, EPS, PDF, PNG, SVG" },
      { key: "printReady", label: "Print-Ready Files?", placeholder: "e.g. Yes — CMYK at 300dpi" },
      { key: "fontLicensing", label: "Font Licensing", placeholder: "e.g. Client responsible for purchasing font licences" },
    ],
    clauseHints: "Include clauses about source file delivery, font licensing, print production responsibility, and usage rights.",
  },
  "Photography Agreement": {
    icon: "📷",
    color: "#eef5f5",
    extraFields: [
      { key: "shootDate", label: "Shoot Date & Location", placeholder: "e.g. 15 June 2024, Mumbai Studio" },
      { key: "rawFiles", label: "Raw Files Included?", placeholder: "e.g. No — edited JPGs only" },
      { key: "usageRights", label: "Usage Rights", placeholder: "e.g. Commercial use, digital only, no print" },
    ],
    clauseHints: "Include specific clauses about shoot cancellation policy, weather contingency, raw file delivery, and exclusivity of usage rights.",
  },
  "Social Media Management Contract": {
    icon: "📱",
    color: "#f5eef5",
    extraFields: [
      { key: "platforms", label: "Platforms Covered", placeholder: "e.g. Instagram, LinkedIn, Twitter" },
      { key: "postsPerMonth", label: "Posts Per Month", placeholder: "e.g. 12 posts + 4 stories per platform" },
      { key: "adSpend", label: "Ad Spend Management", placeholder: "e.g. Not included / Up to $500/mo managed" },
    ],
    clauseHints: "Include clauses about content approval workflow, account access and security, ad spend liability, and performance reporting.",
  },
  "Software Development Agreement": {
    icon: "⚙️",
    color: "#eef0f5",
    extraFields: [
      { key: "techRequirements", label: "Tech Requirements", placeholder: "e.g. Node.js API, React frontend, PostgreSQL" },
      { key: "bugWarranty", label: "Bug Fix Warranty Period", placeholder: "e.g. 30 days post-launch bug fixes included" },
      { key: "sourceCodeDelivery", label: "Source Code Delivery", placeholder: "e.g. Via GitHub repo transfer on final payment" },
    ],
    clauseHints: "Include clauses about source code ownership, bug warranty period, deployment responsibility, and third-party library licensing.",
  },
};
const CONTRACT_TYPES = Object.keys(CONTRACT_CONFIGS);
const FREE_LIMIT = 1;

function fmt(amount, currency) {
  const sym = currency?.split(" ")[1] || "$";
  return sym + parseFloat(amount || 0).toFixed(2);
}

// LANDING PAGE
function LandingPage({ onGetStarted }) {
  const [legalPage, setLegalPage] = React.useState(null);
  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Lumos<span>doc</span></div>
        <div className="nav-links">
          <span className="nav-link" onClick={() => document.getElementById('how').scrollIntoView()}>How it works</span>
          <span className="nav-link" onClick={() => document.getElementById('features').scrollIntoView()}>Features</span>
          <span className="nav-link" onClick={() => document.getElementById('pricing').scrollIntoView()}>Pricing</span>
        </div>
        <button className="nav-cta" onClick={onGetStarted}>Try free →</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <div className="hero-content">
          <div>
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              AI-powered documents
            </div>
            <h1 className="hero-title">
              Professional invoices & contracts,<br />
              <em>instantly.</em>
            </h1>
            <p className="hero-subtitle">
              Lumosdoc generates polished invoices and plain English contracts in under 60 seconds. Built for freelancers who want to look professional without the hassle.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={onGetStarted}>
                ✦ Create your first document free
              </button>

            </div>
            <div className="hero-trust">
              <div className="hero-trust-dots">
                {["🇮🇳","🇺🇸","🇬🇧","🇦🇺"].map((f,i) => (
                  <div key={i} className="trust-dot" style={{zIndex:4-i}}>{f}</div>
                ))}
              </div>
              <span>Trusted by freelancers worldwide · $5.99/mo after free trial</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-tag top">
              <div className="tag-icon">✦</div>
              AI-generated in 30 seconds
            </div>
            <div className="invoice-card">
              <div className="invoice-card-header">
                <div className="invoice-logo-block">L</div>
                <div className="invoice-title-block">
                  <h3>INVOICE</h3>
                  <p>#INV-2024-042</p>
                </div>
              </div>
              <div className="invoice-divider" />
              <div className="invoice-row"><span>Web Design Services</span><span>$2,400.00</span></div>
              <div className="invoice-row"><span>Brand Strategy</span><span>$800.00</span></div>
              <div className="invoice-row"><span>SEO Audit</span><span>$600.00</span></div>
              <div className="invoice-divider" />
              <div className="invoice-total-row"><span>Total Due</span><span>$3,800.00</span></div>
            </div>
            <div className="floating-tag bottom">
              📄 Contract generated · 8 clauses
            </div>
          </div>
        </div>
      </section>



      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div className="section-label">Simple process</div>
          <h2 className="section-title">Three steps to a<br />professional document</h2>
          <div className="how-grid">
            <div className="how-card">
              <div className="how-num">01</div>
              <div className="how-icon">📝</div>
              <h3>Fill in your details</h3>
              <p>Enter your information, your client's details, and what you're charging for. Takes under 60 seconds.</p>
            </div>
            <div className="how-card">
              <div className="how-num">02</div>
              <div className="how-icon">✦</div>
              <h3>AI polishes everything</h3>
              <p>Our AI refines your line items into professional language and generates legally-sound plain English contract clauses.</p>
            </div>
            <div className="how-card">
              <div className="how-num">03</div>
              <div className="how-icon">⬇</div>
              <h3>Download and send</h3>
              <p>Get a beautifully designed PDF with your logo. Send it directly to your client and get paid faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="features-inner">
          <div className="features-header">
            <div>
              <div className="section-label">Everything you need</div>
              <h2 className="section-title">Built for the modern freelancer</h2>
            </div>
            <p className="section-subtitle">No design skills, no legal knowledge, no expensive accountant. Just fast, professional documents that make you look like a pro.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: "🖼️", bg: "#eef5f1", title: "Your logo, your brand", desc: "Upload your logo and it appears on every invoice and contract. Your clients see a polished, branded document every time." },
              { icon: "🤖", bg: "#faf6ee", title: "AI-powered language", desc: "Rough bullet points become professional line items. Vague descriptions become legally sound contract clauses. Automatically." },
              { icon: "📄", bg: "#f0f4ff", title: "Invoice templates", desc: "Choose from minimal, professional, or bold designs. Your invoice always looks intentional and impressive." },
              { icon: "📝", bg: "#fff0f5", title: "Plain English contracts", desc: "8 contract types written in language anyone can understand. No legalese, no confusion — just clear agreements." },
              { icon: "⚡", bg: "#eef5f1", title: "Live preview", desc: "See your document update in real time as you type. Know exactly what you're sending before you hit generate." },
              { icon: "🌍", bg: "#faf6ee", title: "Global currencies", desc: "Invoice in USD, EUR, GBP, INR, AUD and more. Lumosdoc works for freelancers in every market worldwide." },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon" style={{background: f.bg}}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="pricing-inner">
          <div className="section-label">Simple pricing</div>
          <h2 className="section-title">One free document.<br />Then $5.99 a month.</h2>
          <p className="section-subtitle" style={{margin:'12px auto 0',textAlign:'center',maxWidth:420}}>No hidden fees, no per-document charges, no surprises. Cancel anytime.</p>
          <div className="pricing-cards" style={{gridTemplateColumns:"1fr 1fr 1fr"}}>
            <div className="pricing-card">
              <div className="pricing-tier">Free Trial</div>
              <div className="pricing-price">$0</div>
              <div className="pricing-period">one document · PDF included · no card</div>
              <div className="pricing-features">
                {["1 invoice or contract","AI-polished language","Logo upload","PDF download included","Live preview"].map((f,i) => (
                  <div key={i} className="pricing-feature">
                    <div className="pricing-check">✓</div>{f}
                  </div>
                ))}
              </div>
              <button className="pricing-btn pricing-btn-free" onClick={onGetStarted}>Try free now</button>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-tier">Pro Monthly</div>
              <div className="pricing-price">$5.99<sub>/mo</sub></div>
              <div className="pricing-period">unlimited everything · cancel anytime</div>
              <div className="pricing-features">
                {["Unlimited invoices","Unlimited contracts","All invoice templates","All contract types","PDF download always","Cancel anytime"].map((f,i) => (
                  <div key={i} className="pricing-feature">
                    <div className="pricing-check">✓</div>{f}
                  </div>
                ))}
              </div>
              <button className="pricing-btn pricing-btn-pro" onClick={()=>alert("PADDLE_MONTHLY_URL")}>Get Pro — $5.99/mo →</button>
            </div>
            <div className="pricing-card featured" style={{background:"var(--ink)"}}>
              <div className="pricing-tier" style={{color:"var(--accent)"}}>Pro Annual 🔥</div>
              <div className="pricing-price" style={{color:"#fff"}}>$59.99<sub style={{color:"#888"}}>/yr</sub></div>
              <div className="pricing-period" style={{color:"#888"}}>just $5/mo · save 2 months free</div>
              <div className="pricing-features">
                {["Everything in Monthly","2 months free","Best value","Priority support","PDF download always","Cancel anytime"].map((f,i) => (
                  <div key={i} className="pricing-feature">
                    <div className="pricing-check" style={{background:"rgba(45,90,61,0.3)",color:"#6fcf97"}}>✓</div>{f}
                  </div>
                ))}
              </div>
              <button className="pricing-btn" style={{background:"var(--accent)",color:"#fff"}} onClick={()=>alert("PADDLE_ANNUAL_URL")}>Get Annual — $59.99/yr →</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">Lumos<span>doc</span></div>
          <div className="footer-links">
            <span className="footer-link" onClick={()=>setLegalPage("privacy")}>Privacy</span>
            <span className="footer-link" onClick={()=>setLegalPage("terms")}>Terms</span>
            <span className="footer-link" onClick={()=>setLegalPage("support")}>Support</span>
          </div>
          <div className="footer-copy">© 2024 Lumosdoc. Built for freelancers worldwide.</div>
        </div>
      </footer>
      <LegalModal page={legalPage} onClose={()=>setLegalPage(null)} />
    </div>
  );
}

// INVOICE PREVIEW
function InvoicePreview({ inv, items, logo, template }) {
  const subtotal = items.reduce((s,it) => s + (parseFloat(it.qty)||0)*(parseFloat(it.rate)||0), 0);
  const discountAmt = parseFloat(inv.discount)||0;
  const taxAmt = ((subtotal-discountAmt)*(parseFloat(inv.tax)||0))/100;
  const total = subtotal - discountAmt + taxAmt;

  const templates = {
    minimal: {
      wrapper: { fontFamily:"'Cabinet Grotesk', sans-serif", color:"#111" },
      header: { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:32, paddingBottom:24, borderBottom:"2px solid #111" },
      titleStyle: { fontFamily:"'Fraunces',serif", fontSize:36, fontWeight:600, letterSpacing:"-1px", color:"#111", lineHeight:1 },
      accentBar: null,
      tableHeaderStyle: { borderBottom:"1px solid #111", borderTop:"1px solid #111" },
      totalBg: "transparent",
      totalBorder: "1px solid #111",
    },
    professional: {
      wrapper: { fontFamily:"'Cabinet Grotesk', sans-serif", color:"#111" },
      header: { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, background:"#2d5a3d", margin:"-28px -28px 28px", padding:"28px 28px 24px", borderRadius:"18px 18px 0 0" },
      titleStyle: { fontFamily:"'Fraunces',serif", fontSize:36, fontWeight:600, letterSpacing:"-1px", color:"#fff", lineHeight:1 },
      accentBar: null,
      tableHeaderStyle: { borderBottom:"2px solid #2d5a3d", borderTop:"2px solid #2d5a3d" },
      totalBg: "#eef5f1",
      totalBorder: "none",
    },
    bold: {
      wrapper: { fontFamily:"'Cabinet Grotesk', sans-serif", color:"#111" },
      header: { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 },
      titleStyle: { fontFamily:"'Fraunces',serif", fontSize:36, fontWeight:600, letterSpacing:"-1px", color:"#111", lineHeight:1 },
      accentBar: { height:4, background:"#c8a96e", margin:"-28px -28px 28px", borderRadius:"18px 18px 0 0" },
      tableHeaderStyle: { borderBottom:"2px solid #c8a96e", borderTop:"2px solid #c8a96e" },
      totalBg: "#0a0a0a",
      totalBorder: "none",
      totalColor: "#fff",
    },
  };

  const t = templates[template] || templates.minimal;
  const isProf = template === "professional";
  const isBold = template === "bold";

  return (
    <div style={t.wrapper}>
      {t.accentBar && <div style={t.accentBar} />}
      <div style={t.header}>
        <div>
          {logo
            ? <img src={logo} style={{maxHeight:48, maxWidth:140, objectFit:"contain", marginBottom:8}} alt="logo" />
            : <div style={{fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:600, color: isProf?"#fff":"#2d5a3d", marginBottom:4}}>{inv.fromName||"Your Business"}</div>
          }
          <div style={{fontSize:12, color: isProf?"rgba(255,255,255,0.7)":"#888", lineHeight:1.8, marginTop:4}}>
            {inv.fromEmail}{inv.fromAddress && <><br/>{inv.fromAddress}</>}
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={t.titleStyle}>INVOICE</div>
          <div style={{fontSize:13, color: isProf?"rgba(255,255,255,0.6)":"#aaa", marginTop:4}}>No. {inv.invoiceNumber}</div>
          <div style={{fontSize:12, color: isProf?"rgba(255,255,255,0.7)":"#888", marginTop:6, lineHeight:1.8}}>
            {inv.issueDate && <div>Issued: {inv.issueDate}</div>}
            {inv.dueDate && <div>Due: {inv.dueDate}</div>}
          </div>
        </div>
      </div>

      {/* Billed to / from section */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28}}>
        <div>
          <div style={{fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#aaa", marginBottom:6}}>From</div>
          <div style={{fontSize:14, fontWeight:600, color:"#111", marginBottom:2}}>{inv.fromName||"—"}</div>
          <div style={{fontSize:12, color:"#666", lineHeight:1.7}}>{inv.fromEmail}{inv.fromAddress && <><br/>{inv.fromAddress}</>}</div>
        </div>
        <div>
          <div style={{fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#aaa", marginBottom:6}}>Billed To</div>
          <div style={{fontSize:14, fontWeight:600, color:"#111", marginBottom:2}}>{inv.toName||"—"}</div>
          <div style={{fontSize:12, color:"#666", lineHeight:1.7}}>{inv.toEmail}{inv.toAddress && <><br/>{inv.toAddress}</>}</div>
        </div>
      </div>

      {/* Line items table */}
      <table style={{width:"100%", borderCollapse:"collapse", marginBottom:16}}>
        <thead>
          <tr style={t.tableHeaderStyle}>
            <th style={{textAlign:"left", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", color:"#888", padding:"10px 0", width:"50%"}}>Item</th>
            <th style={{textAlign:"center", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", color:"#888", padding:"10px 8px"}}>Qty</th>
            <th style={{textAlign:"right", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", color:"#888", padding:"10px 8px"}}>Unit Price</th>
            <th style={{textAlign:"right", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", color:"#888", padding:"10px 0"}}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it,i) => (
            <tr key={i} style={{borderBottom:"1px solid #f0f0f0"}}>
              <td style={{padding:"11px 0", fontSize:13, color:"#333"}}>{it.desc||"—"}</td>
              <td style={{padding:"11px 8px", fontSize:13, color:"#666", textAlign:"center"}}>{it.qty}</td>
              <td style={{padding:"11px 8px", fontSize:13, color:"#666", textAlign:"right"}}>{fmt(it.rate, inv.currency)}</td>
              <td style={{padding:"11px 0", fontSize:13, fontWeight:600, color:"#111", textAlign:"right"}}>{fmt((parseFloat(it.qty)||0)*(parseFloat(it.rate)||0), inv.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{display:"flex", justifyContent:"flex-end", marginBottom:24}}>
        <div style={{width:220}}>
          {discountAmt > 0 && (
            <div style={{display:"flex", justifyContent:"space-between", fontSize:13, color:"#888", padding:"4px 0"}}>
              <span>Discount</span><span>−{fmt(discountAmt, inv.currency)}</span>
            </div>
          )}
          {taxAmt > 0 && (
            <div style={{display:"flex", justifyContent:"space-between", fontSize:13, color:"#888", padding:"4px 0"}}>
              <span>Tax ({inv.tax}%)</span><span>{fmt(taxAmt, inv.currency)}</span>
            </div>
          )}
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:t.totalBg, border:t.totalBorder, borderRadius:t.totalBg!=="transparent"?10:0, padding: t.totalBg!=="transparent"?"12px 14px":"10px 0 0", marginTop:8, borderTop: t.totalBg==="transparent"?"2px solid #111":"none"}}>
            <span style={{fontFamily:"'Fraunces',serif", fontSize:14, fontWeight:600, color: isBold?"#fff":"#111"}}>Total</span>
            <span style={{fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:600, color: isBold?"#fff":"#111"}}>{fmt(total, inv.currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {(inv.notes || inv.additionalInfo) && (
        <div style={{paddingTop:16, borderTop:"1px solid #f0f0f0", marginTop:8}}>
          {inv.notes && (
            <div style={{marginBottom:8}}>
              <div style={{fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#aaa", marginBottom:4}}>Notes</div>
              <div style={{fontSize:12, color:"#666", lineHeight:1.7}}>{inv.notes}</div>
            </div>
          )}
          {inv.additionalInfo && (
            <div>
              <div style={{fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#aaa", marginBottom:4}}>Additional Info</div>
              <div style={{fontSize:12, color:"#666", lineHeight:1.7}}>{inv.additionalInfo}</div>
            </div>
          )}
        </div>
      )}

      {/* Payment terms */}
      {inv.paymentTerms && (
        <div style={{marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#aaa"}}>Payment Terms</div>
          <div style={{fontSize:12, color:"#333", fontWeight:500}}>{inv.paymentTerms}</div>
        </div>
      )}

      <div style={{marginTop:24, textAlign:"center", fontSize:11, color:"#ddd"}}>Generated with Lumosdoc · lumosdoc.com</div>
    </div>
  );
}

// CONTRACT PREVIEW
function ContractPreview({ con, clauses, logo, template, bgColor }) {
  const clauseEntries = Object.entries({
    "Scope of Work": clauses.scope,
    "Deliverables": clauses.deliverables,
    "Payment": clauses.payment,
    "Revisions": clauses.revisions,
    "Ownership": clauses.ownership,
    "Confidentiality": clauses.confidentiality,
    "Termination": clauses.termination,
    "Disputes": clauses.disputes,
    ...(con.additionalInfo ? {"Additional Terms": con.additionalInfo} : {}),
  }).filter(([,v]) => v);

  const bg = bgColor || "#ffffff";
  const isLight = bg === "#ffffff";

  const templates = {
    minimal: {
      headerStyle: { borderBottom:"2px solid #111", paddingBottom:20, marginBottom:24 },
      titleColor: "#111",
      numColor: "#111",
      clauseTitleColor: "#111",
      sigLineColor: "#111",
      partyBg: bg === "#ffffff" ? "#f9f9f9" : "rgba(0,0,0,0.04)",
      dividerColor: "#e8e8e8",
    },
    professional: {
      headerStyle: { background:"#2d5a3d", margin:"-28px -28px 28px", padding:"28px 28px 24px", borderRadius:"18px 18px 0 0" },
      titleColor: "#fff",
      numColor: "#2d5a3d",
      clauseTitleColor: "#2d5a3d",
      sigLineColor: "#2d5a3d",
      partyBg: "#eef5f1",
      dividerColor: "#e0ede5",
    },
    bold: {
      headerStyle: { background:"#0a0a0a", margin:"-28px -28px 28px", padding:"28px 28px 24px", borderRadius:"18px 18px 0 0" },
      titleColor: "#fff",
      numColor: "#c8a96e",
      clauseTitleColor: "#111",
      sigLineColor: "#c8a96e",
      partyBg: "#faf6ee",
      dividerColor: "#f0ebe0",
    },
  };

  const t = templates[template||"minimal"];
  const isColorHeader = template === "professional" || template === "bold";

  return (
    <div style={{fontFamily:"'Cabinet Grotesk', sans-serif", color:"#111", fontSize:13, background:bg, padding: bg !== "#ffffff" ? "4px" : 0, borderRadius: bg !== "#ffffff" ? 8 : 0}}>

      {/* HEADER */}
      <div style={t.headerStyle}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
          <div>
            {logo && <img src={logo} style={{maxHeight:40, maxWidth:120, objectFit:"contain", marginBottom:8, display:"block", filter: isColorHeader?"brightness(0) invert(1)":"none"}} alt="logo" />}
            <div style={{fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:600, color: t.titleColor, letterSpacing:"-0.3px"}}>{con.type}</div>
            <div style={{fontSize:12, color: isColorHeader?"rgba(255,255,255,0.6)":"#aaa", marginTop:3}}>
              Effective {con.startDate}{con.endDate ? ` – ${con.endDate}` : ""}
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color: isColorHeader?"rgba(255,255,255,0.5)":"#bbb", marginBottom:4}}>Agreement Between</div>
            <div style={{fontSize:13, fontWeight:600, color: t.titleColor}}>{con.freelancerName||"Freelancer"}</div>
            <div style={{fontSize:12, color: isColorHeader?"rgba(255,255,255,0.6)":"#aaa"}}>and</div>
            <div style={{fontSize:13, fontWeight:600, color: t.titleColor}}>{con.clientName||"Client"}</div>
          </div>
        </div>
      </div>

      {/* PARTIES */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24}}>
        {[
          { label:"Freelancer", name: con.freelancerName, email: con.freelancerEmail, address: con.freelancerAddress },
          { label:"Client", name: con.clientName, email: con.clientEmail, address: con.clientAddress },
        ].map((p,i) => (
          <div key={i} style={{background:t.partyBg, borderRadius:10, padding:"12px 14px"}}>
            <div style={{fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#aaa", marginBottom:5}}>{p.label}</div>
            <div style={{fontSize:13, fontWeight:600, color:"#111", marginBottom:2}}>{p.name||"—"}</div>
            <div style={{fontSize:12, color:"#666", lineHeight:1.6}}>{p.email}{p.address && <><br/>{p.address}</>}</div>
          </div>
        ))}
      </div>

      {/* PAYMENT SUMMARY PILL */}
      {con.paymentAmount && (
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", background:t.partyBg, borderRadius:10, padding:"10px 16px", marginBottom:24, borderLeft:`3px solid ${t.numColor}`}}>
          <div style={{fontSize:12, color:"#888"}}>Project Value</div>
          <div style={{fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:600, color:"#111"}}>
            {con.paymentCurrency?.split(" ")[1]||"$"}{con.paymentAmount}
            <span style={{fontSize:12, fontWeight:400, color:"#aaa", marginLeft:6}}>{con.paymentSchedule}</span>
          </div>
        </div>
      )}

      {/* CLAUSES */}
      <div style={{display:"flex", flexDirection:"column", gap:0}}>
        {clauseEntries.map(([title, text], i) => (
          <div key={i} style={{padding:"14px 0", borderBottom:`1px solid ${t.dividerColor}`, display:"flex", gap:14}}>
            <div style={{fontSize:11, fontWeight:700, color:t.numColor, minWidth:20, paddingTop:1}}>{String(i+1).padStart(2,"0")}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600, color:t.clauseTitleColor, marginBottom:5, letterSpacing:"-0.1px"}}>{title}</div>
              <div style={{fontSize:12, color:"#555", lineHeight:1.75}}>{text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* SIGNATURES */}
      <div style={{marginTop:32, paddingTop:20, borderTop:`2px solid ${t.sigLineColor}`}}>
        <div style={{fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#aaa", marginBottom:20, textAlign:"center"}}>Agreed and Signed</div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:32}}>
          {[
            { label:"Freelancer", name: con.freelancerName },
            { label:"Client", name: con.clientName },
          ].map((s,i) => (
            <div key={i}>
              <div style={{height:48, borderBottom:`1.5px solid ${t.sigLineColor}`, marginBottom:8, position:"relative"}}>
                <div style={{position:"absolute", bottom:8, left:0, fontFamily:"'Fraunces',serif", fontSize:14, color:"#ccc", fontStyle:"italic"}}>Sign here</div>
              </div>
              <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#aaa", marginBottom:3}}>{s.label}</div>
              <div style={{fontSize:13, fontWeight:500, color:"#333"}}>{s.name||"_______________"}</div>
              <div style={{fontSize:12, color:"#aaa", marginTop:4}}>Date: ___________</div>
            </div>
          ))}
        </div>
      </div>

      {/* DISCLAIMER */}
      <div style={{marginTop:20, padding:"10px 14px", background:"#fffbeb", borderLeft:"3px solid #f59e0b", borderRadius:"0 6px 6px 0", fontSize:11, color:"#92400e", lineHeight:1.5}}>
        AI-generated document for reference only. Not legal advice. Review with a qualified lawyer before signing.
      </div>

      <div style={{marginTop:16, textAlign:"center", fontSize:11, color:"#ddd"}}>Generated with Lumosdoc · lumosdoc.com</div>
    </div>
  );
}


// LEGAL PAGES
function LegalModal({ page, onClose }) {
  if (!page) return null;

  const pages = {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: April 2024",
      content: (
        <>
          <div className="legal-highlight">
            Lumosdoc is committed to protecting your privacy. This policy explains what information we collect, how we use it, and what rights you have over it.
          </div>
          <div className="legal-section">
            <h3>1. Information We Collect</h3>
            <p>We collect information you provide directly when using Lumosdoc, including:</p>
            <ul>
              <li>Names, email addresses, and business details you enter when generating invoices or contracts</li>
              <li>Payment information processed securely through Paddle (we never store card details directly)</li>
              <li>Usage data such as which features you use and how often</li>
            </ul>
          </div>
          <div className="legal-section">
            <h3>2. How We Use Your Information</h3>
            <p>We use the information we collect to provide and improve Lumosdoc, process your payments, send you product updates if you have opted in, and respond to your support requests. We do not sell your personal data to any third party.</p>
          </div>
          <div className="legal-section">
            <h3>3. Third-Party Services</h3>
            <p>Lumosdoc uses the following third-party services to operate:</p>
            <ul>
              <li><strong>OpenAI</strong> — processes the text you enter to generate AI-polished document content. Your inputs are subject to OpenAI's privacy policy.</li>
              <li><strong>Paddle</strong> — processes all payments. Your payment data is handled under Paddle's privacy policy and PCI-DSS compliance.</li>
              <li><strong>Vercel</strong> — hosts the application and may collect standard server logs.</li>
            </ul>
          </div>
          <div className="legal-section">
            <h3>4. Data Retention</h3>
            <p>We retain your account information for as long as your account is active. Document data you enter is used only to generate your document in the current session and is not stored on our servers after generation.</p>
          </div>
          <div className="legal-section">
            <h3>5. Your Rights</h3>
            <p>You have the right to access, correct, or delete your personal data at any time. If you are located in the European Union, you have additional rights under GDPR, including the right to data portability and the right to object to processing. To exercise any of these rights, contact us at support@lumosdoc.com.</p>
          </div>
          <div className="legal-section">
            <h3>6. Cookies</h3>
            <p>Lumosdoc uses minimal cookies necessary for the application to function, including session cookies and payment processing cookies set by Paddle. We do not use advertising or tracking cookies.</p>
          </div>
          <div className="legal-section">
            <h3>7. Contact</h3>
            <p>For any privacy-related questions, contact us at support@lumosdoc.com. We aim to respond within 48 hours.</p>
          </div>
        </>
      )
    },
    terms: {
      title: "Terms of Service",
      updated: "Last updated: April 2024",
      content: (
        <>
          <div className="legal-highlight">
            By using Lumosdoc, you agree to these terms. Please read them carefully before creating your account or generating any documents.
          </div>
          <div className="legal-section">
            <h3>1. About Lumosdoc</h3>
            <p>Lumosdoc is an AI-powered document generation tool that helps freelancers create professional invoices and plain English contracts. We are a software tool, not a law firm or accounting service.</p>
          </div>
          <div className="legal-section">
            <h3>2. Not Legal or Financial Advice</h3>
            <p>All contracts and documents generated by Lumosdoc are created by AI for reference purposes only. They do not constitute legal advice. You should review any contract with a qualified lawyer before signing or sending it to a client. Lumosdoc accepts no liability for the legal sufficiency of generated documents in your specific jurisdiction.</p>
          </div>
          <div className="legal-section">
            <h3>3. Your Account</h3>
            <p>You are responsible for maintaining the confidentiality of your account and all activities that occur under it. You must provide accurate information when creating your account and keep it up to date.</p>
          </div>
          <div className="legal-section">
            <h3>4. Acceptable Use</h3>
            <p>You agree not to use Lumosdoc to generate fraudulent documents, impersonate other individuals or businesses, violate any applicable laws, or attempt to reverse engineer or copy the service. We reserve the right to suspend accounts that violate these terms without refund.</p>
          </div>
          <div className="legal-section">
            <h3>5. Payments and Refunds</h3>
            <p>Lumosdoc Pro is billed at $5.99 per month (monthly) or $59.99 per year (save 2 months). You may cancel at any time and will retain access until the end of your current billing period. We do not offer refunds for partial months. All payments are processed by Paddle and are subject to their terms of service.</p>
          </div>
          <div className="legal-section">
            <h3>6. Intellectual Property</h3>
            <p>The documents you generate using Lumosdoc belong to you. Lumosdoc retains all rights to its software, design, and underlying technology. You may not reproduce, distribute, or create derivative works from any part of the Lumosdoc platform without our written permission.</p>
          </div>
          <div className="legal-section">
            <h3>7. Limitation of Liability</h3>
            <p>Lumosdoc is provided on an "as is" basis. To the maximum extent permitted by law, Lumosdoc shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service, including any losses arising from documents generated through the platform.</p>
          </div>
          <div className="legal-section">
            <h3>8. Changes to These Terms</h3>
            <p>We may update these terms from time to time. We will notify you of significant changes by email. Continued use of Lumosdoc after changes constitutes acceptance of the updated terms.</p>
          </div>
          <div className="legal-section">
            <h3>9. Contact</h3>
            <p>For questions about these terms, contact us at support@lumosdoc.com.</p>
          </div>
        </>
      )
    },
    support: {
      title: "Support",
      updated: "We typically respond within 24 hours",
      content: (
        <>
          <div className="legal-highlight">
            Have a question or running into an issue? We are here to help. Lumosdoc is built by a small team and we take every support request seriously.
          </div>
          <div className="legal-section">
            <h3>Get in Touch</h3>
            <p>The fastest way to reach us is by email at <strong>support@lumosdoc.com</strong>. We aim to respond to all queries within 24 hours on business days.</p>
          </div>
          <div className="legal-section">
            <h3>Common Questions</h3>
            <p><strong>My document did not generate correctly.</strong> Try refreshing the page and generating again. If the issue persists, email us with a description of what happened and we will resolve it within 24 hours.</p>
            <p><strong>I want to cancel my subscription.</strong> You can cancel at any time by emailing us at support@lumosdoc.com with your account email. You will retain access until the end of your current billing period.</p>
            <p><strong>The AI generated incorrect information.</strong> Lumosdoc uses the information you enter to generate documents. Always review the output before sending to a client. If you notice a consistent issue with AI quality, please let us know.</p>
            <p><strong>I need a refund.</strong> We do not offer refunds for partial billing periods, but if you experienced a technical failure that prevented you from using the service, contact us and we will review your case fairly.</p>
            <p><strong>I have a feature suggestion.</strong> We love hearing from users. Send your idea to support@lumosdoc.com and we read every message.</p>
          </div>
          <div className="legal-section">
            <h3>Response Times</h3>
            <p>General enquiries are typically answered within 24 hours. Billing issues are prioritised and typically resolved within 12 hours. We do not currently offer live chat support, but email support is available seven days a week.</p>
          </div>
        </>
      )
    }
  };

  const p = pages[page];
  return (
    <div className="legal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="legal-modal">
        <div className="legal-header">
          <div>
            <h2>{p.title}</h2>
            <p>{p.updated}</p>
          </div>
          <button className="legal-close" onClick={onClose}>×</button>
        </div>
        <div className="legal-body">{p.content}</div>
      </div>
    </div>
  );
}

// MAIN APP
export default function App() {
  const [view, setView] = useState("landing");
  const [docsGeneratedRaw] = useState(() => {
    try { return parseInt(localStorage.getItem("lumosdoc_docs") || "0", 10); } catch { return 0; }
  });
  const [page, setPage] = useState("invoice");
  const [docsGenerated, setDocsGenerated] = useState(docsGeneratedRaw);
  const [showPaywall, setShowPaywall] = useState(false);
  const [emailCapture, setEmailCapture] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [successState, setSuccessState] = useState(null); // null | 'invoice' | 'contract'
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);

  // Invoice state
  const [invLogo, setInvLogo] = useState(null);
  const [invTemplate, setInvTemplate] = useState("minimal");
  const [inv, setInv] = useState({
    fromName:"", fromEmail:"", fromAddress:"",
    toName:"", toEmail:"", toAddress:"",
    invoiceNumber: (() => { try { const n = parseInt(localStorage.getItem("lumosdoc_inv_num")||"0")+1; localStorage.setItem("lumosdoc_inv_num",n); return "INV-" + String(n).padStart(4,"0"); } catch { return "INV-" + Date.now().toString().slice(-5); } })(),
    issueDate: new Date().toISOString().split("T")[0],
    dueDate:"", currency:"USD $", paymentTerms:"Net 30",
    tax:"", discount:"", notes:"", additionalInfo:"",
  });
  const [items, setItems] = useState([{desc:"",qty:"1",rate:""}]);

  // Contract state
  const [conLogo, setConLogo] = useState(null);
  const [conTemplate, setConTemplate] = useState("minimal");
  const [conBgColor, setConBgColor] = useState("#ffffff");
  const [con, setCon] = useState({
    type:"Freelance Service Agreement",
    freelancerName:"", freelancerEmail:"", freelancerAddress:"",
    clientName:"", clientEmail:"", clientAddress:"",
    projectDesc:"", startDate: new Date().toISOString().split("T")[0],
    endDate:"", paymentAmount:"", paymentCurrency:"USD $",
    paymentSchedule:"50% Upfront / 50% on Delivery",
    revisions:"2", additionalInfo:"", extraFields:{},
  });
  const [clauses, setClauses] = useState({});

  const invLogoRef = useRef();
  const conLogoRef = useRef();

  const updInv = (k,v) => setInv(p=>({...p,[k]:v}));
  const updCon = (k,v) => setCon(p=>({...p,[k]:v}));
  const updItem = (i,k,v) => setItems(p=>p.map((it,idx)=>idx===i?{...it,[k]:v}:it));
  const addItem = () => setItems(p=>[...p,{desc:"",qty:"1",rate:""}]);
  const removeItem = i => setItems(p=>p.filter((_,idx)=>idx!==i));

  const subtotal = items.reduce((s,it)=>s+(parseFloat(it.qty)||0)*(parseFloat(it.rate)||0),0);
  const discountAmt = parseFloat(inv.discount)||0;
  const taxAmt = ((subtotal-discountAmt)*(parseFloat(inv.tax)||0))/100;
  const total = subtotal - discountAmt + taxAmt;

  const handleLogo = (setter, ref) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setter(ev.target.result);
    reader.readAsDataURL(file);
  };

  const canProceed = () => {
    if (docsGenerated >= FREE_LIMIT) { setShowPaywall(true); return false; }
    return true;
  };

  const generateInvoice = async () => {
    if (!canProceed()) return;
    setLoading(true);
    let polishedItems = items;
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${import.meta.env.VITE_OPENAI_KEY}`},
        body: JSON.stringify({
          model:"gpt-3.5-turbo", max_tokens:500,
          messages:[{role:"user", content:`Polish these invoice line item descriptions to be concise and professional. Return ONLY a JSON array of strings, one per item. Items: ${JSON.stringify(items.map(i=>i.desc))}`}]
        })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content||"[]";
      const descs = JSON.parse(text.replace(/```json|```/g,"").trim());
      polishedItems = items.map((it,i)=>({...it,desc:descs[i]||it.desc}));
    } catch{}
    setDocsGenerated(d => { const n = d+1; try { localStorage.setItem("lumosdoc_docs", n); } catch{} return n; });
    setSuccessState("invoice");
    setGeneratedData({type:"invoice", items: polishedItems});
    setLoading(false);
  };

  const generateContract = async () => {
    if (!canProceed()) return;
    setLoading(true);
    let newClauses = {};
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${import.meta.env.VITE_OPENAI_KEY}`},
        body: JSON.stringify({
          model:"gpt-3.5-turbo", max_tokens:1200,
          messages:[{role:"user", content:`Write plain English contract clauses for a ${con.type}.
Freelancer: ${con.freelancerName} | Client: ${con.clientName}
Project: ${con.projectDesc}
Timeline: ${con.startDate} to ${con.endDate}
Payment: ${con.paymentCurrency.split(" ")[1]||"$"}${con.paymentAmount} via ${con.paymentSchedule}
Revisions: ${con.revisions} rounds
Type-specific details: ${JSON.stringify(con.extraFields||{})}
Additional: ${con.additionalInfo||"None"}
Special instructions: ${CONTRACT_CONFIGS[con.type]?.clauseHints||""}
Return ONLY a JSON object with keys: scope, deliverables, payment, revisions, ownership, confidentiality, termination, disputes. Each value: 2-3 plain English sentences specific to this type of contract. No legalese. Make clauses genuinely relevant to a ${con.type}.`}]
        })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content||"{}";
      newClauses = JSON.parse(text.replace(/```json|```/g,"").trim());
    } catch {
      newClauses = {
        scope:`The freelancer will provide ${con.projectDesc||"the agreed services"} as outlined.`,
        deliverables:"All deliverables will be provided in agreed formats upon project completion.",
        payment:`Total fee is ${con.paymentCurrency.split(" ")[1]||"$"}${con.paymentAmount||"0"}, payable as ${con.paymentSchedule}.`,
        revisions:`Client is entitled to ${con.revisions} rounds of revisions at no extra charge.`,
        ownership:"Full ownership transfers to client upon receipt of final payment.",
        confidentiality:"Both parties agree to keep all project-related information confidential.",
        termination:"Either party may terminate with 7 days written notice.",
        disputes:"Any disputes will be resolved through good-faith negotiation.",
      };
    }
    setClauses(newClauses);
    setDocsGenerated(d => { const n = d+1; try { localStorage.setItem("lumosdoc_docs", n); } catch{} return n; });
    setSuccessState("contract");
    setGeneratedData({type:"contract", clauses: newClauses});
    setLoading(false);
  };

  const isLocked = docsGenerated >= FREE_LIMIT;

  if (view === "landing") {
    return (
      <>
        <style>{css}</style>
        <LandingPage onGetStarted={() => setView("app")} />
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="app-wrap">
        {/* APP HEADER */}
        <header className="app-header">
          <div className="app-logo" onClick={() => setView("landing")}>Lumos<span>doc</span></div>
          <div className="app-tabs">
            <button className={`app-tab${page==="invoice"?" active":""}`} onClick={()=>setPage("invoice")}>📄 Invoice</button>
            <button className={`app-tab${page==="contract"?" active":""}`} onClick={()=>setPage("contract")}>📝 Contract</button>
          </div>
          <button className="nav-cta" onClick={()=>setShowPaywall(true)}>
            {docsGenerated === 0 ? "1 free doc remaining" : "Upgrade · $5.99/mo"}
          </button>
        </header>

        <div className="app-body">
          {/* FORM COLUMN */}
          <div className="app-form-col">
            {/* SUCCESS BANNER */}
            {successState && !isLocked && (
              <div className="success-banner">
                <div className="success-icon">✓</div>
                <div className="success-text">
                  <strong>Your {successState} is ready!</strong>
                  <span>Download it from the preview panel — you have used your 1 free document.</span>
                </div>
              </div>
            )}

            {/* EMAIL CAPTURE — shown after first doc generated, before upgrade */}
            {successState && !emailSubmitted && (
              <div className="email-capture">
                <h4>Get tips on winning more clients</h4>
                <p>Enter your email for freelance invoice tips, contract advice, and Lumosdoc updates. No spam, ever.</p>
                <div className="email-capture-row">
                  <input className="email-capture-input" type="email" placeholder="your@email.com" value={emailCapture} onChange={e=>setEmailCapture(e.target.value)} />
                  <button className="email-capture-btn" onClick={()=>{ if(emailCapture) setEmailSubmitted(true); }}>Subscribe</button>
                </div>
              </div>
            )}
            {emailSubmitted && (
              <div className="email-capture" style={{padding:16}}>
                <div className="email-submitted">✓ You are subscribed — thanks!</div>
              </div>
            )}

            {isLocked ? (
              <div className="gate-wall">
                <div className="gate-icon">✦</div>
                <h3>Your free document has been used</h3>
                <p>Upgrade to Lumosdoc Pro to create unlimited invoices and contracts, forever.</p>
                <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
                  <div style={{flex:1,background:"var(--green-light)",border:"1.5px solid var(--green)",borderRadius:12,padding:"14px 16px",textAlign:"center",cursor:"pointer"}} onClick={()=>alert("PADDLE_MONTHLY_URL")}>
                    <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:600,color:"var(--green)"}}>$5.99<span style={{fontSize:13,fontWeight:400}}>/mo</span></div>
                    <div style={{fontSize:12,color:"var(--ink3)"}}>Monthly</div>
                  </div>
                  <div style={{flex:1,background:"var(--ink)",borderRadius:12,padding:"14px 16px",textAlign:"center",cursor:"pointer"}} onClick={()=>alert("PADDLE_ANNUAL_URL")}>
                    <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:600,color:"var(--accent)"}}>$59.99<span style={{fontSize:13,fontWeight:400,color:"#888"}}>/yr</span></div>
                    <div style={{fontSize:12,color:"#888"}}>Annual · save 2 months 🔥</div>
                  </div>
                </div>
                <div className="gate-features">
                  {["Unlimited invoices & contracts","All invoice templates","Logo on every document","Plain English contracts","PDF download every time","Cancel anytime"].map((f,i)=>(
                    <div key={i} className="pf">{f}</div>
                  ))}
                </div>
              </div>
            ) : page === "invoice" ? (
              <>
                {/* TEMPLATE SELECTOR */}
                <div className="form-card">
                  <div className="form-card-title">Choose template</div>
                  <div className="template-grid">
                    {[
                      { id:"minimal", name:"Minimal", lines:[{},{},"accent","short"] },
                      { id:"professional", name:"Professional", lines:["dark",{},"accent","short"] },
                      { id:"bold", name:"Bold", lines:["dark","dark","accent","shorter"] },
                    ].map(t => (
                      <div key={t.id} className={`template-opt${invTemplate===t.id?" selected":""}`} onClick={()=>setInvTemplate(t.id)}>
                        <div className="template-thumb" style={{background: t.id==="bold" ? "#0a0a0a" : t.id==="professional" ? "#eef5f1" : "#f7f6f3"}}>
                          <div className="template-thumb-line dark" style={{width:"50%"}} />
                          <div className="template-thumb-line" style={{width:"100%", background: t.id==="bold"?"#333": t.id==="professional"?"var(--green)":"var(--border)"}} />
                          <div className="template-thumb-line" style={{width:"80%", background: t.id==="bold"?"#444":"var(--border)"}} />
                          <div className="template-thumb-line accent" style={{width:"40%", background: t.id==="bold"?"var(--accent)":t.id==="professional"?"var(--green)":"var(--ink)"}} />
                        </div>
                        <div className="template-name">{t.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LOGO */}
                <div className="form-card">
                  <div className="form-card-title">Logo <span className="opt-tag">(optional)</span></div>
                  <div className="logo-upload" onClick={()=>invLogoRef.current.click()}>
                    <input ref={invLogoRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleLogo(setInvLogo, invLogoRef)} />
                    {invLogo
                      ? <><img src={invLogo} className="logo-preview" alt="logo" /><button className="logo-remove" onClick={e=>{e.stopPropagation();setInvLogo(null)}}>Remove</button></>
                      : <><span style={{fontSize:22}}>🖼️</span><div className="logo-upload-text"><strong>Click to upload logo</strong>PNG or JPG — appears on your invoice</div></>
                    }
                  </div>
                </div>

                {/* FROM / TO */}
                <div className="form-card">
                  <div className="form-card-title">From (You)</div>
                  <div className="form-grid" style={{marginBottom:14}}>
                    <div className="field"><label>Your Name / Business</label><input value={inv.fromName} onChange={e=>updInv("fromName",e.target.value)} placeholder="Jane Doe" /></div>
                    <div className="field"><label>Your Email</label><input value={inv.fromEmail} onChange={e=>updInv("fromEmail",e.target.value)} placeholder="you@email.com" /></div>
                    <div className="field"><label>Your Address</label><input value={inv.fromAddress} onChange={e=>updInv("fromAddress",e.target.value)} placeholder="City, Country" /></div>
                  </div>
                  <div className="form-card-title" style={{marginTop:4}}>To (Client)</div>
                  <div className="form-grid">
                    <div className="field"><label>Client Name</label><input value={inv.toName} onChange={e=>updInv("toName",e.target.value)} placeholder="Client Name" /></div>
                    <div className="field"><label>Client Email</label><input value={inv.toEmail} onChange={e=>updInv("toEmail",e.target.value)} placeholder="client@email.com" /></div>
                    <div className="field"><label>Client Address</label><input value={inv.toAddress} onChange={e=>updInv("toAddress",e.target.value)} placeholder="City, Country" /></div>
                  </div>
                </div>

                {/* INVOICE DETAILS */}
                <div className="form-card">
                  <div className="form-card-title">Invoice Details</div>
                  <div className="form-grid" style={{gridTemplateColumns:"1fr 1fr 1fr"}}>
                    <div className="field"><label>Invoice No.</label><input value={inv.invoiceNumber} onChange={e=>updInv("invoiceNumber",e.target.value)} /></div>
                    <div className="field"><label>Issue Date</label><input type="date" value={inv.issueDate} onChange={e=>updInv("issueDate",e.target.value)} /></div>
                    <div className="field"><label>Due Date</label><input type="date" value={inv.dueDate} onChange={e=>updInv("dueDate",e.target.value)} /></div>
                    <div className="field"><label>Currency</label><select value={inv.currency} onChange={e=>updInv("currency",e.target.value)}>{CURRENCIES.map(c=><option key={c}>{c}</option>)}</select></div>
                    <div className="field"><label>Payment Terms</label><select value={inv.paymentTerms} onChange={e=>updInv("paymentTerms",e.target.value)}>{PAYMENT_TERMS.map(t=><option key={t}>{t}</option>)}</select></div>
                  </div>
                </div>

                {/* LINE ITEMS */}
                <div className="form-card">
                  <div className="form-card-title">Services / Items</div>
                  <div className="li-headers">
                    <div className="li-header">Description</div>
                    <div className="li-header c">Qty</div>
                    <div className="li-header r">Rate</div>
                    <div/>
                  </div>
                  <div className="line-items">
                    {items.map((it,i)=>(
                      <div className="line-item" key={i}>
                        <input value={it.desc} onChange={e=>updItem(i,"desc",e.target.value)} placeholder="Service description" />
                        <input value={it.qty} onChange={e=>updItem(i,"qty",e.target.value)} placeholder="1" style={{textAlign:"center"}} />
                        <input value={it.rate} onChange={e=>updItem(i,"rate",e.target.value)} placeholder="0.00" style={{textAlign:"right"}} />
                        <button className="remove-btn" onClick={()=>removeItem(i)}>×</button>
                      </div>
                    ))}
                  </div>
                  <button className="add-item-btn" onClick={addItem}>+ Add item</button>
                  <div className="totals-box">
                    <div className="total-row"><span>Subtotal</span><span>{fmt(subtotal, inv.currency)}</span></div>
                    <div className="total-row"><span>Discount</span><input className="total-input" value={inv.discount} onChange={e=>updInv("discount",e.target.value)} placeholder="0.00" /></div>
                    <div className="total-row"><span>Tax %</span><input className="total-input" value={inv.tax} onChange={e=>updInv("tax",e.target.value)} placeholder="0" /></div>
                    <div className="total-row grand"><span>Total Due</span><span>{fmt(total, inv.currency)}</span></div>
                  </div>
                </div>

                {/* NOTES */}
                <div className="form-card">
                  <div className="form-card-title">Notes & Additional Info</div>
                  <div className="form-grid">
                    <div className="field"><label>Notes <span className="opt-tag">(optional)</span></label><textarea value={inv.notes} onChange={e=>updInv("notes",e.target.value)} placeholder="Payment instructions, bank details..." /></div>
                    <div className="field"><label>Additional Info <span className="opt-tag">(optional)</span></label><textarea value={inv.additionalInfo} onChange={e=>updInv("additionalInfo",e.target.value)} placeholder="Anything else the client should know..." /></div>
                  </div>
                </div>

                <button className="gen-btn" onClick={generateInvoice} disabled={loading}>
                  {loading ? <><div className="spinner"/>Generating...</> : "✦ Generate Invoice"}
                </button>
              </>
            ) : (
              /* CONTRACT FORM */
              <>
                <div className="form-card">
                  <div className="form-card-title">Logo <span className="opt-tag">(optional)</span></div>
                  <div className="logo-upload" onClick={()=>conLogoRef.current.click()}>
                    <input ref={conLogoRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleLogo(setConLogo, conLogoRef)} />
                    {conLogo
                      ? <><img src={conLogo} className="logo-preview" alt="logo" /><button className="logo-remove" onClick={e=>{e.stopPropagation();setConLogo(null)}}>Remove</button></>
                      : <><span style={{fontSize:22}}>🖼️</span><div className="logo-upload-text"><strong>Click to upload logo</strong>PNG or JPG — appears on your contract</div></>
                    }
                  </div>
                </div>

                {/* CONTRACT TEMPLATE + BG COLOR */}
                <div className="form-card">
                  <div className="form-card-title">Style & Background</div>
                  <div style={{marginBottom:14}}>
                    <div style={{fontSize:12,fontWeight:500,color:"var(--ink3)",marginBottom:8}}>Template</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                      {[
                        {id:"minimal",name:"Minimal",preview:"#111"},
                        {id:"professional",name:"Professional",preview:"#2d5a3d"},
                        {id:"bold",name:"Bold",preview:"#c8a96e"},
                      ].map(tp=>(
                        <div key={tp.id} onClick={()=>setConTemplate(tp.id)} style={{
                          padding:"10px 8px", borderRadius:10, cursor:"pointer", textAlign:"center",
                          border: conTemplate===tp.id ? `2px solid ${tp.preview}` : "1.5px solid var(--border)",
                          background: conTemplate===tp.id ? tp.id==="bold"?"#faf6ee":tp.id==="professional"?"#eef5f1":"#f9f9f9" : "var(--surface2)",
                          transition:"all 0.15s",
                        }}>
                          <div style={{height:28,borderRadius:6,background:tp.preview,marginBottom:6}}/>
                          <div style={{fontSize:11,fontWeight:600,color:"var(--ink2)"}}>{tp.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize:12,fontWeight:500,color:"var(--ink3)",marginBottom:8}}>Background Colour</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {[
                        {color:"#ffffff",label:"White"},
                        {color:"#f9f7f4",label:"Cream"},
                        {color:"#f0f4f8",label:"Sky"},
                        {color:"#f4f0f8",label:"Lavender"},
                        {color:"#f0f8f4",label:"Mint"},
                        {color:"#fdf8ef",label:"Sand"},
                      ].map(bg=>(
                        <div key={bg.color} onClick={()=>setConBgColor(bg.color)} title={bg.label} style={{
                          width:28,height:28,borderRadius:"50%",background:bg.color,cursor:"pointer",
                          border: conBgColor===bg.color ? "2.5px solid var(--green)" : "1.5px solid var(--border)",
                          transition:"all 0.15s", flexShrink:0,
                        }}/>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-card">
                  <div className="form-card-title">Contract Type</div>
                  <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10}}>
                    {CONTRACT_TYPES.map(t => {
                      const cfg = CONTRACT_CONFIGS[t];
                      return (
                        <div key={t}
                          onClick={()=>updCon("type",t)}
                          style={{
                            padding:"12px 14px", borderRadius:12, cursor:"pointer",
                            border: con.type===t ? "2px solid var(--green)" : "1.5px solid var(--border)",
                            background: con.type===t ? "var(--green-light)" : cfg.color,
                            transition:"all 0.15s",
                          }}>
                          <div style={{fontSize:20, marginBottom:5}}>{cfg.icon}</div>
                          <div style={{fontSize:12, fontWeight:600, color: con.type===t ? "var(--green)" : "var(--ink2)", lineHeight:1.3}}>{t}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* TYPE-SPECIFIC EXTRA FIELDS */}
                {CONTRACT_CONFIGS[con.type]?.extraFields?.length > 0 && (
                  <div className="form-card">
                    <div className="form-card-title">{CONTRACT_CONFIGS[con.type].icon} {con.type} Details</div>
                    <div className="form-grid">
                      {CONTRACT_CONFIGS[con.type].extraFields.map(f => (
                        <div className="field" key={f.key}>
                          <label>{f.label}</label>
                          <input
                            value={con.extraFields?.[f.key]||""}
                            onChange={e=>updCon("extraFields",{...con.extraFields,[f.key]:e.target.value})}
                            placeholder={f.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-card">
                  <div className="form-card-title">Your Details (Freelancer)</div>
                  <div className="form-grid" style={{marginBottom:14}}>
                    <div className="field"><label>Your Name</label><input value={con.freelancerName} onChange={e=>updCon("freelancerName",e.target.value)} placeholder="Your full name" /></div>
                    <div className="field"><label>Your Email</label><input value={con.freelancerEmail} onChange={e=>updCon("freelancerEmail",e.target.value)} placeholder="you@email.com" /></div>
                    <div className="field"><label>Your Address <span className="opt-tag">(optional)</span></label><input value={con.freelancerAddress} onChange={e=>updCon("freelancerAddress",e.target.value)} placeholder="City, Country" /></div>
                  </div>
                  <div className="form-card-title" style={{marginTop:4}}>Client Details</div>
                  <div className="form-grid">
                    <div className="field"><label>Client Name</label><input value={con.clientName} onChange={e=>updCon("clientName",e.target.value)} placeholder="Client name or company" /></div>
                    <div className="field"><label>Client Email</label><input value={con.clientEmail} onChange={e=>updCon("clientEmail",e.target.value)} placeholder="client@email.com" /></div>
                    <div className="field"><label>Client Address <span className="opt-tag">(optional)</span></label><input value={con.clientAddress} onChange={e=>updCon("clientAddress",e.target.value)} placeholder="City, Country" /></div>
                  </div>
                </div>

                <div className="form-card">
                  <div className="form-card-title">Project Details</div>
                  <div className="field" style={{marginBottom:12}}>
                    <label>Project Description</label>
                    <textarea value={con.projectDesc} onChange={e=>updCon("projectDesc",e.target.value)} placeholder="Briefly describe what you'll be doing..." style={{minHeight:72}} />
                  </div>
                  <div className="form-grid" style={{gridTemplateColumns:"1fr 1fr 1fr"}}>
                    <div className="field"><label>Start Date</label><input type="date" value={con.startDate} onChange={e=>updCon("startDate",e.target.value)} /></div>
                    <div className="field"><label>End Date</label><input type="date" value={con.endDate} onChange={e=>updCon("endDate",e.target.value)} /></div>
                    <div className="field"><label>Revision Rounds</label><input value={con.revisions} onChange={e=>updCon("revisions",e.target.value)} placeholder="2" /></div>
                  </div>
                </div>

                <div className="form-card">
                  <div className="form-card-title">Payment</div>
                  <div className="form-grid" style={{gridTemplateColumns:"1fr 1fr 1fr"}}>
                    <div className="field"><label>Currency</label><select value={con.paymentCurrency} onChange={e=>updCon("paymentCurrency",e.target.value)}>{CURRENCIES.map(c=><option key={c}>{c}</option>)}</select></div>
                    <div className="field"><label>Total Amount</label><input value={con.paymentAmount} onChange={e=>updCon("paymentAmount",e.target.value)} placeholder="1500" /></div>
                    <div className="field"><label>Payment Schedule</label><select value={con.paymentSchedule} onChange={e=>updCon("paymentSchedule",e.target.value)}>{PAYMENT_TERMS.map(t=><option key={t}>{t}</option>)}</select></div>
                  </div>
                </div>

                <div className="form-card">
                  <div className="form-card-title">Additional Info <span className="opt-tag">(optional)</span></div>
                  <div className="field">
                    <textarea value={con.additionalInfo} onChange={e=>updCon("additionalInfo",e.target.value)} placeholder="e.g. Client provides all assets, hosting not included, may be used in portfolio..." style={{minHeight:72}} />
                  </div>
                </div>

                <button className="gen-btn" onClick={generateContract} disabled={loading}>
                  {loading ? <><div className="spinner"/>Generating...</> : "✦ Generate Contract"}
                </button>
              </>
            )}
          </div>

          {/* PREVIEW COLUMN */}
          <div className="app-preview-col">
            <div className="preview-card">
              <div className="preview-label">
                Live Preview
                {generatedData && (
                  <button className="download-btn" onClick={()=>window.print()}>
                    ⬇ Download PDF
                  </button>
                )}
              </div>
              {generatedData?.type === "invoice" ? (
                <InvoicePreview inv={inv} items={generatedData.items} logo={invLogo} template={invTemplate} />
              ) : generatedData?.type === "contract" ? (
                <ContractPreview con={con} clauses={generatedData.clauses} logo={conLogo} template={conTemplate} bgColor={conBgColor} />
              ) : (
                <div className="preview-empty">
                  <div className="preview-empty-icon">✦</div>
                  <p style={{fontWeight:500,color:"var(--ink3)",marginBottom:8}}>Your document preview appears here</p>
                  <p style={{fontSize:12,color:"var(--ink4)"}}>Fill in the form on the left and click Generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PAYWALL */}
      {showPaywall && (
        <div className="paywall-overlay">
          <div className="paywall-card">
            <div className="paywall-icon">✦</div>
            <h3>Upgrade to Lumosdoc Pro</h3>
            <p>Your free document has been used. Unlock unlimited invoices and contracts for one simple price.</p>
            <div style={{display:"flex",gap:10,margin:"8px 0 16px",width:"100%"}}>
              <button style={{flex:1,padding:"12px 8px",borderRadius:10,border:"1.5px solid var(--green)",background:"var(--green-light)",cursor:"pointer",fontFamily:"'Cabinet Grotesk',sans-serif"}} onClick={()=>alert("PADDLE_MONTHLY_URL")}>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:600,color:"var(--green)"}}>$5.99<span style={{fontSize:12,fontWeight:400}}>/mo</span></div>
                <div style={{fontSize:11,color:"var(--ink3)"}}>Monthly</div>
              </button>
              <button style={{flex:1,padding:"12px 8px",borderRadius:10,border:"none",background:"var(--ink)",cursor:"pointer",fontFamily:"'Cabinet Grotesk',sans-serif"}} onClick={()=>alert("PADDLE_ANNUAL_URL")}>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:600,color:"var(--accent)"}}>$59.99<span style={{fontSize:12,fontWeight:400,color:"#888"}}>/yr</span></div>
                <div style={{fontSize:11,color:"#888"}}>Annual · save 2 months 🔥</div>
              </button>
            </div>
            <div className="paywall-features">
              {["Unlimited invoices & contracts","All 3 invoice templates","Logo on all documents","8 contract types","PDF download every time","Cancel anytime"].map((f,i)=>(
                <div key={i} className="pf">{f}</div>
              ))}
            </div>
            <div className="paywall-dismiss" onClick={()=>setShowPaywall(false)}>Maybe later</div>
          </div>
        </div>
      )}
    </>
  );
}
