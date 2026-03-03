import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutateData, useFetchData } from "../hook/Request";

import videoFile from "../assets/happy.mp4";

import consultantImg from "../assets/happy.jpeg";

/* ─────────────────────────────────────────────
   YARA GROUP – Agriculture-first landing page
   Inspired by medwwidehome.com.ng
   Aesthetic: Organic / Natural / Editorial
   Colors: Deep forest green, warm cream, gold
───────────────────────────────────────────── */

const YaraHome = () => {
  const [webinarOpen, setWebinarOpen] = useState(false);
  const [inspectionOpen, setInspectionOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Webinar form state
  const [webinarForm, setWebinarForm] = useState({
    email: "",
    phone: "",
    name: "",
    available: "",
  });
  const [inspectionForm, setInspectionForm] = useState({
    email: "",
    phone: "",
    name: "",
    source: "",
  });

  // Mutations
  const { mutate: submitWebinar, isLoading: submittingWebinar } =
    useMutateData("webinar");
  const { mutate: submitInspection, isLoading: submittingInspection } =
    useMutateData("inspection");

  // Fetch active properties
  const { data: propertiesData, isLoading: loadingProperties } = useFetchData(
    "/Property",
    "activeProperties",
  );
  const properties = propertiesData?.data?.properties || [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    // Auto-open webinar modal after 3s
    const timer = setTimeout(() => setWebinarOpen(true), 3000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleWebinarSubmit = (e) => {
    e.preventDefault();

    console.log({
      jaja: webinarForm,
    });

    const consultationData = {
      fullName: webinarForm.name,
      email: webinarForm.email,
      phone: webinarForm.phone,
      propertyInterest: "palmrich",
      propertyType: "palmrich",
      preferredDate: new Date().toISOString(),
      message: webinarForm.available,
    };

    submitWebinar(
      { url: "/consultation", data: consultationData },
      {
        onSuccess: () => {
          alert("You're registered! We'll send you the webinar link.");
          setWebinarOpen(false);
        },
        onError: (err) => alert(err?.message || "Failed. Please try again."),
      },
    );
  };

  const handleInspectionSubmit = (e) => {
    e.preventDefault();
    submitInspection(
      { url: "/inspection", data: inspectionForm },
      {
        onSuccess: () => {
          alert("Inspection booked! We'll be in touch within 24 hours.");
          setInspectionOpen(false);
        },
        onError: (err) => alert(err?.message || "Failed. Please try again."),
      },
    );
  };

  // Sold-out phases (static content matching the reference)
  const phases = [
    {
      name: "Palmrich Phase 1",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Elaeis_guineensis_MS_3467.jpg/800px-Elaeis_guineensis_MS_3467.jpg",
      desc: "Our very first development, Phase 1 laid the foundation — prime oil palm land, fully verified, and high-value appreciation. It sold out quickly and set the tone for future phases.",
      soldOut: true,
    },
    {
      name: "Palmrich Phase 2",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Oil_palm_plantation_in_Mersing_District.jpg/800px-Oil_palm_plantation_in_Mersing_District.jpg",
      desc: "Phase 2 attracted early land owners who recognized opportunity early. With great access roads and a thriving palm canopy already established, it became a hotspot for savvy investors.",
      soldOut: true,
    },
    {
      name: "Palmrich Phase 3",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Oilpalm_malaysia.jpg/800px-Oilpalm_malaysia.jpg",
      desc: "Tucked slightly off the main road, Phase 3 offered a perfect mix of privacy and value. Mature oil palms already in harvest cycle appealed to clients seeking immediate returns.",
      soldOut: true,
    },
    {
      name: "Palmrich Phase 4",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/YosriLadangKelapaSawit.jpg/800px-YosriLadangKelapaSawit.jpg",
      desc: "This phase offered enhanced infrastructure and was our first to introduce perimeter fencing and estate layout design. Investors rushed in, and it sold out in record time after launch.",
      soldOut: true,
    },
    {
      name: "Palmrich Phase 5",
      img: "https://images.pexels.com/photos/2950868/pexels-photo-2950868.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Located in Ibadan, this phase features a thriving agro palm plantation already fruiting — the perfect blend of land ownership and immediate agricultural returns in a fast-growing city.",
      soldOut: false,
    },
    {
      name: "Palmrich Phase 6",
      img: "https://images.pexels.com/photos/30251970/pexels-photo-30251970.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Known for its prime location and active oil palm plantation already bearing fruit, Phase 6 attracts high-value buyers seeking both prestige and steady agricultural returns.",
      soldOut: false,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --cream: #f5f0e8;
          --cream-dark: #ede6d6;
          --forest: #1a2e1a;
          --forest-mid: #2d4a2d;
          --forest-light: #3d5c3d;
          --gold: #c49a3c;
          --gold-light: #e0b84a;
          --text-dark: #1a1a1a;
          --text-mid: #4a4a4a;
          --text-light: #7a7a7a;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-dark); }

        .font-display { font-family: 'Playfair Display', serif; }

        /* ── NAV ── */
        .yara-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.4s ease;
          padding: 1.5rem 0;
        }
        .yara-nav.scrolled {
          background: rgba(245,240,232,0.97);
          backdrop-filter: blur(12px);
          padding: 1rem 0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(196,154,60,0.2);
        }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--forest); text-decoration: none; }
        .nav-logo span { color: var(--gold); }
        .nav-links { display: flex; align-items: center; gap: 2.5rem; }
        .nav-link { font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dark); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: var(--gold); }
        .nav-cta { background: var(--forest); color: var(--cream) !important; padding: 0.65rem 1.5rem; font-size: 0.8rem !important; letter-spacing: 0.1em; transition: background 0.2s !important; }
        .nav-cta:hover { background: var(--forest-light) !important; color: var(--cream) !important; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          background-image: url('https://images.pexels.com/photos/30251970/pexels-photo-30251970.jpeg?auto=compress&cs=tinysrgb&w=1920');
          background-size: cover;
          background-position: center 40%;
          position: relative;
          display: flex; align-items: flex-end;
          padding-bottom: 8rem;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,20,10,0.2) 0%,
            rgba(10,20,10,0.1) 30%,
            rgba(10,20,10,0.6) 70%,
            rgba(10,20,10,0.85) 100%
          );
        }
        .hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .hero-tag { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
        .hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 700; color: #fff; line-height: 1.12; margin-bottom: 1.5rem; max-width: 700px; }
        .hero-h1 em { font-style: italic; color: var(--gold-light); }
        .hero-p { font-size: 1.05rem; color: rgba(255,255,255,0.8); max-width: 560px; line-height: 1.7; margin-bottom: 2.5rem; font-weight: 300; }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          background: var(--gold); color: var(--forest); font-weight: 600; font-size: 0.85rem;
          letter-spacing: 0.1em; text-transform: uppercase; padding: 1rem 2.2rem;
          border: none; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.2s;
          display: inline-block;
        }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
        .btn-outline {
          background: transparent; color: #fff; font-weight: 500; font-size: 0.85rem;
          letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem 2.2rem;
          border: 1px solid rgba(255,255,255,0.5); cursor: pointer; text-decoration: none;
          transition: border-color 0.2s, background 0.2s; display: inline-block;
        }
        .btn-outline:hover { border-color: var(--gold-light); background: rgba(196,154,60,0.15); }

        /* ── SECTION COMMONS ── */
        .section { padding: 6rem 0; }
        .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .section-tag { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
        .section-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: var(--text-dark); line-height: 1.2; }
        .section-h2 em { font-style: italic; color: var(--forest-mid); }
        .section-sub { font-size: 1rem; color: var(--text-mid); line-height: 1.75; max-width: 600px; margin-top: 1rem; }
        .divider { width: 60px; height: 3px; background: var(--gold); margin: 1.5rem 0; }

        /* ── WHY INVEST ── */
        .why-bg { background: var(--forest); }
        .why-bg .section-h2 { color: var(--cream); }
        .why-bg .section-tag { color: var(--gold-light); }
        .why-bg .section-sub { color: rgba(245,240,232,0.7); }
        .why-bg .divider { background: var(--gold-light); }
        .reasons-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3rem; margin-top: 4rem; }
        .reason-num { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 900; color: rgba(196,154,60,0.25); line-height: 1; margin-bottom: 1rem; }
        .reason-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 600; color: var(--cream); margin-bottom: 0.75rem; }
        .reason-body { font-size: 0.9rem; color: rgba(245,240,232,0.65); line-height: 1.75; }
        .reason-line { width: 40px; height: 2px; background: var(--gold); margin-bottom: 1rem; }

        /* ── AGENT ── */
        .agent-section { background: var(--cream-dark); }
        .agent-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .agent-img-wrap { position: relative; }
        .agent-img {
          width: 100%; aspect-ratio: 4/5; object-fit: cover; object-position: top;
          filter: grayscale(10%);
        }
        .agent-img-frame {
          position: absolute; bottom: -1.5rem; right: -1.5rem;
          width: calc(100% - 2rem); height: calc(100% - 2rem);
          border: 2px solid var(--gold); z-index: -1;
        }
        .agent-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.8rem); font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem; }
        .agent-role { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
        .agent-body { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; }
        .agent-body p { margin-bottom: 1.25rem; }

        /* ── PHASES ── */
        .phases-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; margin-top: 4rem; }
        .phase-card { background: #fff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; }
        .phase-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
        .phase-img-wrap { position: relative; overflow: hidden; height: 220px; }
        .phase-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .phase-card:hover .phase-img { transform: scale(1.05); }
        .sold-out-badge {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: rgba(10,20,10,0.35);
        }
        .sold-out-stamp {
          border: 3px solid rgba(255,255,255,0.85); color: #fff;
          font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 0.5rem 1.5rem;
          transform: rotate(-8deg);
          background: rgba(180,30,30,0.7);
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .phase-body { padding: 1.5rem; }
        .phase-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.6rem; }
        .phase-desc { font-size: 0.875rem; color: var(--text-mid); line-height: 1.7; }

        /* ── STORY ── */
        .story-section { background: #fff; }
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        .story-video { position: relative; }
        .story-video iframe { width: 100%; aspect-ratio: 16/9; border: none; }
        .story-body p { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; margin-bottom: 1.25rem; }
        .story-body em { font-style: italic; color: var(--forest-mid); font-weight: 500; }
        .story-sign { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic; color: var(--forest); margin-top: 0.5rem; }

        /* ── CTA BANNER ── */
        .cta-banner {
          background-image: url('https://images.pexels.com/photos/2950868/pexels-photo-2950868.jpeg?auto=compress&cs=tinysrgb&w=1920');
          background-size: cover; background-position: center;
          position: relative; text-align: center; padding: 7rem 2rem;
        }
        .cta-banner::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(10,20,10,0.72);
        }
        .cta-banner-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .cta-sup { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
        .cta-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,5vw,3.5rem); font-weight: 700; color: #fff; line-height: 1.15; margin-bottom: 1rem; }
        .cta-sub { font-size: 1rem; color: rgba(255,255,255,0.75); margin-bottom: 2.5rem; line-height: 1.7; }

        /* ── TESTIMONIALS ── */
        .testimonials-section { background: var(--cream-dark); }
        .testimonials-section .section-inner { text-align: center; }
        .video-wrapper { max-width: 700px; margin: 3rem auto 0; background: var(--forest); padding: 0.5rem; }
        .video-wrapper iframe { width: 100%; aspect-ratio: 16/9; border: none; display: block; }

        /* ── FOOTER ── */
        .footer { background: var(--forest); color: rgba(245,240,232,0.65); }
        .footer-inner { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem 2rem; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(245,240,232,0.1); }
        .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: var(--cream); margin-bottom: 1rem; }
        .footer-logo span { color: var(--gold-light); }
        .footer-desc { font-size: 0.875rem; line-height: 1.75; }
        .footer-col-title { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cream); margin-bottom: 1.25rem; }
        .footer-link { display: block; font-size: 0.875rem; color: rgba(245,240,232,0.6); text-decoration: none; margin-bottom: 0.6rem; transition: color 0.2s; }
        .footer-link:hover { color: var(--gold-light); }
        .footer-contact-item { display: flex; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.875rem; align-items: flex-start; }
        .footer-contact-icon { color: var(--gold-light); margin-top: 2px; flex-shrink: 0; }
        .footer-bottom { padding-top: 1.5rem; text-align: center; font-size: 0.8rem; color: rgba(245,240,232,0.4); }

        /* ── MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .modal-box {
          background: #fff; width: 100%; max-width: 520px;
          padding: 3rem 2.5rem; position: relative;
          animation: slideUp 0.35s ease;
        }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .modal-close {
          position: absolute; top: 1rem; right: 1rem;
          background: none; border: none; cursor: pointer;
          font-size: 1.5rem; color: var(--text-light); line-height: 1;
        }
        .modal-logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
        .modal-logo-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--forest); }
        .modal-logo-name span { color: var(--gold); }
        .modal-h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; }
        .modal-sub { font-size: 0.875rem; color: var(--text-mid); margin-bottom: 1.75rem; line-height: 1.6; }
        .modal-form { display: flex; flex-direction: column; gap: 0.85rem; }
        .modal-input {
          padding: 0.85rem 1rem; border: 1px solid #ddd;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--text-dark);
          outline: none; transition: border-color 0.2s; background: var(--cream);
        }
        .modal-input:focus { border-color: var(--gold); }
        .modal-btn {
          background: var(--forest); color: var(--cream); border: none;
          padding: 1rem; font-family: 'DM Sans', sans-serif; font-weight: 600;
          font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s; margin-top: 0.25rem;
        }
        .modal-btn:hover { background: var(--forest-light); }
        .modal-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .modal-skip { text-align: center; font-size: 0.8rem; color: var(--text-light); margin-top: 0.75rem; cursor: pointer; }
        .modal-skip:hover { text-decoration: underline; }

        /* ── MOBILE NAV ── */
        .mobile-nav-overlay {
          display: none;
        }
        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: var(--text-dark); transition: all 0.3s; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .reasons-grid { grid-template-columns: 1fr 1fr; }
          .phases-grid { grid-template-columns: repeat(2,1fr); }
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .mobile-nav-overlay {
            display: block;
            position: fixed; inset: 0; background: var(--cream); z-index: 99;
            padding: 6rem 2rem 2rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
          }
          .mobile-nav-overlay.open { transform: translateX(0); }
          .mobile-nav-links { display: flex; flex-direction: column; gap: 1.5rem; }
          .mobile-nav-link { font-size: 1.4rem; font-family: 'Playfair Display', serif; color: var(--text-dark); text-decoration: none; }
          .agent-grid, .story-grid { grid-template-columns: 1fr; }
          .agent-img-frame { display: none; }
          .reasons-grid { grid-template-columns: 1fr; }
          .phases-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; }
          .hero-actions a, .hero-actions button { text-align: center; }
          [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* ── WEBINAR MODAL ── */}
      {webinarOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setWebinarOpen(false)}
        >
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setWebinarOpen(false)}
            >
              ×
            </button>
            <div className="modal-logo">
              <div className="modal-logo-name">
                <span>YARA</span> Group
              </div>
            </div>
            <h3 className="modal-h3">
              Free Webinar: Own a Profitable Plantation
            </h3>
            <p className="modal-sub">
              Join our free webinar and learn the proven system for owning a
              profitable oil palm plantation that generates passive income for
              decades.
            </p>
            <form className="modal-form" onSubmit={handleWebinarSubmit}>
              <input
                className="modal-input"
                placeholder="Enter your email address"
                type="email"
                required
                value={webinarForm.email}
                onChange={(e) =>
                  setWebinarForm((p) => ({ ...p, email: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Phone Number"
                type="tel"
                required
                value={webinarForm.phone}
                onChange={(e) =>
                  setWebinarForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Your Name"
                type="text"
                required
                value={webinarForm.name}
                onChange={(e) =>
                  setWebinarForm((p) => ({ ...p, name: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Would you be available for the webinar?"
                value={webinarForm.available}
                onChange={(e) =>
                  setWebinarForm((p) => ({ ...p, available: e.target.value }))
                }
              />
              <button
                className="modal-btn"
                type="submit"
                disabled={submittingWebinar}
              >
                {submittingWebinar ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <p className="modal-skip" onClick={() => setWebinarOpen(false)}>
              Thanks, I'm not interested
            </p>
          </div>
        </div>
      )}

      {/* ── INSPECTION MODAL ── */}
      {inspectionOpen && (
        <div
          className="modal-overlay"
          onClick={(e) =>
            e.target === e.currentTarget && setInspectionOpen(false)
          }
        >
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setInspectionOpen(false)}
            >
              ×
            </button>
            <div className="modal-logo">
              <div className="modal-logo-name">
                <span>YARA</span> Group
              </div>
            </div>
            <h3 className="modal-h3">Book a Site Inspection</h3>
            <p className="modal-sub">
              See the land for yourself. Our team will walk you through the
              plantation and answer every question you have.
            </p>
            <form className="modal-form" onSubmit={handleInspectionSubmit}>
              <input
                className="modal-input"
                placeholder="Enter your email address"
                type="email"
                required
                value={inspectionForm.email}
                onChange={(e) =>
                  setInspectionForm((p) => ({ ...p, email: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Your Name"
                type="text"
                required
                value={inspectionForm.name}
                onChange={(e) =>
                  setInspectionForm((p) => ({ ...p, name: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Phone Number"
                type="tel"
                required
                value={inspectionForm.phone}
                onChange={(e) =>
                  setInspectionForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="How did you hear about us?"
                value={inspectionForm.source}
                onChange={(e) =>
                  setInspectionForm((p) => ({ ...p, source: e.target.value }))
                }
              />
              <button
                className="modal-btn"
                type="submit"
                disabled={submittingInspection}
              >
                {submittingInspection ? "Booking..." : "Book Inspection"}
              </button>
            </form>
            <p className="modal-skip" onClick={() => setInspectionOpen(false)}>
              Thanks, I'm not interested
            </p>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav className={`yara-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <span>YARA</span> Group
          </a>
          <div className="nav-links">
            <a href="#why" className="nav-link">
              Why Invest
            </a>
            <a href="#estates" className="nav-link">
              Estates
            </a>
            <a href="#story" className="nav-link">
              Our Story
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <button
              className="nav-link nav-cta"
              onClick={() => setInspectionOpen(true)}
            >
              Book Inspection
            </button>
          </div>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav-overlay ${menuOpen ? "open" : ""}`}>
        <div className="mobile-nav-links">
          <a
            href="#why"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Why Invest
          </a>
          <a
            href="#estates"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Estates
          </a>
          <a
            href="#story"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Our Story
          </a>
          <a
            href="#contact"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
          <button
            className="btn-primary"
            style={{ border: "none" }}
            onClick={() => {
              setMenuOpen(false);
              setInspectionOpen(true);
            }}
          >
            Book Inspection
          </button>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-tag">YARA Group · Agriculture Division</span>
          <h1 className="hero-h1">
            Build sustainable income with <em>oil palm</em> plantations
          </h1>
          <p className="hero-p">
            Nigeria's most reliable agricultural investment. Oil palm produces
            harvests every single year for 25+ years — delivering consistent
            passive income, land appreciation, and a legacy that outlasts you.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => setInspectionOpen(true)}
            >
              Book Inspection
            </button>
            <a href="#estates" className="btn-outline">
              Explore Estates
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: "var(--forest-mid)", padding: "2.5rem 0" }}>
        <div className="section-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            {[
              { num: "25+", label: "Years of Annual Harvest" },
              { num: "₦180B+", label: "Palm Oil Market Value in Nigeria" },
              { num: "3×", label: "Faster Growth Than Inflation" },
              { num: "6 Phases", label: "Of Palmrich — 4 Already Sold Out" },
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  borderRight: "1px solid rgba(245,240,232,0.1)",
                  padding: "0 1rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(1.6rem,3vw,2.4rem)",
                    fontWeight: 700,
                    color: "var(--gold-light)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(245,240,232,0.65)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY INVEST ── */}
      <section className="section why-bg" id="why">
        <div className="section-inner">
          <span className="section-tag">Why Oil Palm?</span>
          <h2 className="section-h2" style={{ color: "var(--cream)" }}>
            A crop that works for you,
            <br />
            <em style={{ color: "var(--gold-light)" }}>year after year</em>
          </h2>
          <div className="divider" />
          <div className="reasons-grid">
            {[
              {
                num: "01",
                title: "Strong and Predictable Cash Flow",
                body: "Oil palm produces harvests every year for decades, creating a dependable revenue stream that strengthens long-term financial planning.",
              },
              {
                num: "02",
                title: "High-Demand Commodity With Global Market Stability",
                body: "As a versatile product used across food, cosmetics, and energy industries, oil palm maintains steady international demand, reducing volatility and supporting sustainable price growth.",
              },
              {
                num: "03",
                title: "Inflation-Resistant Agricultural Asset",
                body: "Because its value is tied to essential consumer markets, oil palm consistently outperforms inflation over time, helping investors protect and grow their capital efficiently.",
              },
            ].map((r) => (
              <div key={r.num}>
                <div className="reason-num">{r.num}</div>
                <div className="reason-line" />
                <div className="reason-title">{r.title}</div>
                <div className="reason-body">{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENT ── */}
      <section className="section agent-section">
        <div className="section-inner">
          <div className="agent-grid">
            <div className="agent-img-wrap">
              <img
                // src="../" //"https://medwwidehome.com.ng/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-21_at_15.47.14_c78a4735-removebg-preview.png" //"https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=800&q=80"

                src={consultantImg}
                alt="Our Consultant"
                className="agent-img"
              />
              <div className="agent-img-frame" />
            </div>
            <div>
              <span className="section-tag">Meet the Expert</span>
              <h2 className="agent-title">Happiness warribo</h2>
              <p className="agent-role">
                Professional Agro Real Estate Consultant
              </p>
              <div className="divider" />
              <div className="agent-body">
                <p>
                  Happiness is a dedicated agro real estate consultant committed
                  to helping individuals and families build lasting wealth
                  through strategic agricultural investments. With a strong
                  understanding of both farmland value and long term
                  agribusiness potential, she guides clients toward
                  opportunities that offer stability, passive income, and
                  sustainable growth.
                </p>
                <p>
                  Known for her transparency, patience, and hands-on support,
                  Happiness simplifies the investment journey from property
                  discovery to documentation and after sales guidance. Her goal
                  is not just to sell land, but to empower clients with assets
                  that appreciate, generate consistent returns, and contribute
                  to generational prosperity.
                </p>
                <p>
                  Driven by integrity and a passion for agriculture, she has
                  helped many investors confidently step into the agro real
                  estate space, making informed decisions that align with their
                  financial goals.
                </p>

                <p>
                  With Happiness, clients don’t just acquire land they secure a
                  future built on value, growth, and long-term opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "var(--cream)", padding: "5rem 0" }}>
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="section-tag">Simple Process</span>
            <h2 className="section-h2">
              From Investment to <em>Harvest</em>
            </h2>
            <div className="divider" style={{ margin: "1.5rem auto" }} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "0",
              position: "relative",
            }}
          >
            {[
              {
                step: "01",
                icon: "🌱",
                title: "Choose Your Plot",
                body: "Select a plot size that fits your budget. Plots start from affordable entry points with clear documentation.",
              },
              {
                step: "02",
                icon: "📄",
                title: "Get Your Title",
                body: "Receive your Certificate of Occupancy and full legal documentation within weeks of purchase.",
              },
              {
                step: "03",
                icon: "🌴",
                title: "We Manage Everything",
                body: "YARA Group's agri-team plants, maintains, and manages your oil palms — completely hands-free for you.",
              },
              {
                step: "04",
                icon: "💰",
                title: "Receive Harvest Income",
                body: "From year 3 onward, your palms produce bunches of oil palm fruit twice a year, generating consistent passive income.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                style={{
                  padding: "2rem 1.5rem",
                  borderLeft: i > 0 ? "1px solid var(--cream-dark)" : "none",
                  position: "relative",
                }}
              >
                {i < 3 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2.5rem",
                      right: 0,
                      width: 24,
                      height: 24,
                      background: "var(--gold)",
                      borderRadius: "50%",
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.6rem",
                      color: "var(--forest)",
                      fontWeight: 700,
                    }}
                  >
                    →
                  </div>
                )}
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                  {item.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--text-dark)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-mid)",
                    lineHeight: 1.75,
                  }}
                >
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTATES / PHASES ── */}
      <section
        className="section"
        id="estates"
        style={{ background: "var(--cream)" }}
      >
        <div className="section-inner">
          <div
            style={{
              textAlign: "center",
              maxWidth: 700,
              margin: "0 auto 1rem",
            }}
          >
            <span className="section-tag">Our Portfolio</span>
            <h2 className="section-h2">
              Explore All Our <em>Estates</em>
            </h2>
            <div className="divider" style={{ margin: "1.5rem auto" }} />
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Palmrich is more than a land investment — it's a foundation for
              generational wealth. Built to grow in value, it offers you the
              opportunity to earn passive income, build lasting assets, and
              secure a financial legacy that stands the test of time.
            </p>
          </div>
          <div className="phases-grid">
            {phases.map((phase) => (
              <div className="phase-card" key={phase.name}>
                <div className="phase-img-wrap">
                  <img
                    src={phase.img}
                    alt={phase.name}
                    className="phase-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.pexels.com/photos/2950868/pexels-photo-2950868.jpeg?auto=compress&cs=tinysrgb&w=800";
                    }}
                  />
                  {phase.soldOut && (
                    <div className="sold-out-badge">
                      <div className="sold-out-stamp">Sold Out</div>
                    </div>
                  )}
                </div>
                <div className="phase-body">
                  <div className="phase-name">{phase.name}</div>
                  <div className="phase-desc">{phase.desc}</div>
                  {!phase.soldOut && (
                    <button
                      className="btn-primary"
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.78rem",
                        padding: "0.65rem 1.25rem",
                      }}
                      onClick={() => setInspectionOpen(true)}
                    >
                      Book Inspection →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="section story-section" id="story">
        <div className="section-inner">
          <div className="story-grid">
            <div>
              <span className="section-tag">Who We Are</span>
              <h2 className="section-h2">
                The <em>Palmrich</em> Story
              </h2>
              <div className="divider" />
              <div className="story-body">
                <p>
                  Palmrich began with a simple but powerful vision: to transform
                  ordinary land into extraordinary long-term value. In a world
                  where investments rise and fall overnight, Palmrich set out to
                  create something different — an asset that grows steadily,
                  pays consistently, and endures across generations.
                </p>
                <p>
                  Built on fertile soil and backed by a team committed to
                  transparency and real agricultural development, Palmrich
                  Estate became more than just farmland. It evolved into a
                  strategic wealth-building platform for everyday investors
                  seeking stability, passive income, and meaningful legacy.
                </p>
                <p>
                  Investors didn't just buy land — they secured a future. With
                  clear processes, honest documentation, and reliable support,
                  Palmrich earned the trust of families, professionals, and
                  visionaries who wanted an asset that would stand the test of
                  time.
                </p>
                <p>
                  Today, Palmrich is known as a dependable gateway to{" "}
                  <em>transgenerational wealth</em>, powered by a crop with
                  consistent global demand and designed to appreciate year after
                  year.
                </p>
                <p className="story-sign">
                  Palmrich isn't just an estate. It's a story of prosperity that
                  keeps growing.
                </p>
              </div>
            </div>
            <div className="story-video">
              <video width="600" controls>
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* <iframe
                src="https://youtu.be/1L1vQFasVF0?si=lOHXrzVeQ0_DTN1t" //"https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YARA Group Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}

              {/* <iframe
                width="560"
                height="315"
                src="https://www.youtube-nocookie.com/embed/1L1vQFasVF0?si=lOHXrzVeQ0_DTN1t"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe> */}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner-inner">
          <span className="cta-sup">Get Started With YARA Group</span>
          <h2 className="cta-h2">Own An Oil Palm Plantation Today</h2>
          <p className="cta-sub">
            Discover how YARA Group helps you own a sustainable asset that pays
            for decades. Get a quick overview of our solutions, features, and
            how to get started.
          </p>
          <button className="btn-primary" onClick={() => setWebinarOpen(true)}>
            Download Brochure
          </button>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="section-inner">
          <span className="section-tag">Social Proof</span>
          <h2 className="section-h2">Testimonials</h2>
          <div className="video-wrapper">
            {/* <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Palmrich Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}

            <video width="800" controls>
              <source src={videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/J7Idf9gMtyg?si=3U38svxuUJ-FJvlu"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe> */}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" id="contact">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <span>YARA</span> Group
              </div>
              <p className="footer-desc">
                Whether you're buying, selling, or investing, real estate can be
                complex. That's why we provide expert advice, strategic
                direction, and personalized care — ensuring your goals are not
                only accomplished but surpassed with ease and profitability.
              </p>
            </div>
            <div>
              <div className="footer-col-title">About Us</div>
              <a href="#" className="footer-link">
                About Organisation
              </a>
              <a href="#" className="footer-link">
                Our Journeys
              </a>
              <a href="#" className="footer-link">
                Our Partners
              </a>
            </div>
            <div>
              <div className="footer-col-title">Quick Links</div>
              <a href="#" className="footer-link">
                Introduction
              </a>
              <a href="#" className="footer-link">
                Organisation Team
              </a>
              <a href="#" className="footer-link">
                Press Enquiries
              </a>
              <div className="footer-col-title" style={{ marginTop: "1.5rem" }}>
                Important Links
              </div>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
              <a href="#" className="footer-link">
                Terms & Conditions
              </a>
            </div>
            <div>
              <div className="footer-col-title">Contact Info</div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>Lagos, Nigeria</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <a
                  href="tel:+2348000000000"
                  className="footer-link"
                  style={{ margin: 0 }}
                >
                  +234 800 YARA GROUP
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <a
                  href="mailto:info@yaragroup.ng"
                  className="footer-link"
                  style={{ margin: 0 }}
                >
                  info@yaragroup.ng
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            © 2025 YARA Group. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default YaraHome;
