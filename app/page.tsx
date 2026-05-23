"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function Home() {
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);
  const [voucher, setVoucher] = useState("");
  const [error, setError] = useState("");

  const handleKlaim = async () => {
    if (!nama.trim()) {
      setError("Nama tidak boleh kosong!");
      return;
    }
    setLoading(true);
    setError("");

    const { count } = await supabase
      .from("klaim_promo")
      .select("*", { count: "exact", head: true });

    if (count !== null && count >= 30) {
      setError("Maaf, kuota promo sudah habis!");
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase
      .from("klaim_promo")
      .insert([{ nama: nama.trim() }]);

    if (dbError) {
      setError("Terjadi kesalahan, coba lagi!");
      setLoading(false);
      return;
    }

    const kodeUnik =
      "NYS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setVoucher(kodeUnik);
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
          background-image: url('/bg-nyeskoffie.jpeg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .bg-blob-1 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, #F13A3B 0%, transparent 70%);
          top: -120px; right: -100px;
          opacity: 0.12;
          pointer-events: none;
        }

        .bg-blob-2 {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, #C10708 0%, transparent 70%);
          bottom: -80px; left: -80px;
          opacity: 0.1;
          pointer-events: none;
        }

        .bg-blob-3 {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, #F56B6C 0%, transparent 70%);
          top: 60%; left: 70%;
          opacity: 0.08;
          pointer-events: none;
        }

        .card {
          position: relative;
          background: #ffffff;
          border-radius: 28px;
          padding: 44px 36px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow:
            0 4px 6px rgba(193,7,8,0.04),
            0 20px 60px rgba(193,7,8,0.12),
            0 1px 0px rgba(255,255,255,0.8) inset;
          animation: fadeUp 0.6s ease forwards;
          border: 1px solid rgba(193,7,8,0.08);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .badge {
          display: inline-block;
          background: linear-gradient(135deg, #C10708, #F13A3B);
          color: white;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 999px;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(193,7,8,0.3);
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 900;
          color: #C10708;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .tagline {
          color: #F56B6C;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          margin-bottom: 28px;
        }

        .promo-box {
          background: linear-gradient(135deg, #C10708 0%, #F13A3B 100%);
          border-radius: 20px;
          padding: 28px 24px;
          margin-bottom: 28px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(193,7,8,0.35);
        }

        .promo-box::before {
          content: '☕';
          position: absolute;
          font-size: 80px;
          top: -10px; right: -10px;
          opacity: 0.12;
          line-height: 1;
        }

        .promo-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin-bottom: 8px;
        }

        .promo-title {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          margin-bottom: 10px;
        }

        .promo-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.15);
          display: inline-block;
          padding: 4px 14px;
          border-radius: 999px;
          letter-spacing: 0.5px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #fccece;
        }

        .divider-text {
          color: #F89C9D;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .input {
          width: 100%;
          background: #fff5f5;
          border: 1.5px solid #fccece;
          color: #3a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          padding: 15px 20px;
          border-radius: 12px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          text-align: center;
          margin-bottom: 12px;
        }

        .input::placeholder { color: #F89C9D; }

        .input:focus {
          border-color: #F13A3B;
          box-shadow: 0 0 0 3px rgba(241,58,59,0.1);
          background: #fff;
        }

        .error {
          color: #C10708;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          margin-bottom: 12px;
          background: #fff5f5;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid #fccece;
        }

        .btn {
          width: 100%;
          background: linear-gradient(135deg, #C10708 0%, #F13A3B 100%);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 16px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 6px 20px rgba(193,7,8,0.35);
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(193,7,8,0.45);
        }

        .btn:active:not(:disabled) { transform: translateY(0); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .voucher-box {
          background: linear-gradient(145deg, #f0fdf4, #dcfce7);
          border: 2px dashed #86efac;
          border-radius: 20px;
          padding: 32px 24px;
          animation: fadeUp 0.5s ease forwards;
        }

        .voucher-icon { font-size: 44px; margin-bottom: 12px; }

        .voucher-title {
          color: #16a34a;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 17px;
          margin-bottom: 4px;
        }

        .voucher-sub {
          color: #6b7280;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          margin-bottom: 18px;
        }

        .voucher-code {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #C10708;
          letter-spacing: 3px;
          background: #fff;
          padding: 14px 20px;
          border-radius: 12px;
          border: 1.5px solid #fccece;
          box-shadow: 0 2px 8px rgba(193,7,8,0.08);
          margin-bottom: 16px;
        }

        .screenshot-note {
          background: #fff7ed;
          border: 1.5px solid #fed7aa;
          border-radius: 10px;
          padding: 12px 16px;
          margin-top: 4px;
        }

        .screenshot-note p {
          color: #c2410c;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .screenshot-note span {
          color: #9a3412;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
        }

        .voucher-note {
          color: #9ca3af;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          margin-top: 14px;
        }
      `}</style>

      <div className="page">
        <div className="bg-blob-1" />
        <div className="bg-blob-2" />
        <div className="bg-blob-3" />

        <div className="card">
          <div className="badge">✦ Grand Opening ✦</div>
          <div className="logo">Nyeskoffie</div>
          <div className="tagline">Ada promo spesial buat kamu ☕💛</div>

          <div className="promo-box">
            <div className="promo-label">Promo Eksklusif</div>
            <div className="promo-title">
              BELI 1<br />
              GRATIS 1
            </div>
            <div className="promo-sub">⏳ Hanya untuk 30 orang pertama</div>
          </div>

          <div className="divider">
            <div className="divider-line" />
            <div className="divider-text">Klaim Sekarang</div>
            <div className="divider-line" />
          </div>

          {!voucher ? (
            <div>
              <input
                type="text"
                placeholder="Masukkan nama kamu..."
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input"
                onKeyDown={(e) => e.key === "Enter" && handleKlaim()}
              />
              {error && <div className="error">⚠ {error}</div>}
              <button onClick={handleKlaim} disabled={loading} className="btn">
                {loading ? "⏳ Memproses..." : "🎁 Klaim Promo Sekarang!"}
              </button>
            </div>
          ) : (
            <div className="voucher-box">
              <div className="voucher-icon">🎉</div>
              <div className="voucher-title">Promo Berhasil Diklaim!</div>
              <div className="voucher-sub">Kode promo kamu:</div>
              <div className="voucher-code">{voucher}</div>
              <div className="screenshot-note">
                <p>📸 Screenshot halaman ini!</p>
                <span>Dan tunjukkan kode promo ke kasir.</span>
              </div>
              <div className="voucher-note">
                Hai <strong style={{ color: "#C10708" }}>{nama}</strong>,
                selamat menikmati! ☕
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
