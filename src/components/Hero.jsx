import { useEffect, useState } from "react";

export default function Hero() {
  const slides = [
    {
      title: "CUSTOM PRINTING & CORPORATE GIFTING",
      subtitle: "Creative, customisable, and cost-effective",
      button: "Explore Corporate Gifts",
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1920",
    },
    {
      title: "PREMIUM T-SHIRT PRINTING",
      subtitle: "Bulk orders for events, brands & teams",
      button: "View T-Shirt Printing",
      image:
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1920",
    },
    {
      title: "PERSONALISED MUG PRINTING",
      subtitle: "Perfect for gifts & branding",
      button: "Shop Mugs",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1920",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-slider">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay" />

          <div className="content">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <button>{slide.button}</button>
          </div>
        </div>
      ))}

      {/* DOTS */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <style>{`
      
      .hero-slider {
        position: relative;
        width: 100%;
        height: calc(100vh - 120px);
        overflow: hidden;
      }

      .slide {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        opacity: 0;
        transition: opacity 0.8s ease;
      }

      .slide.active {
        opacity: 1;
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.45);
      }

      .content {
        position: absolute;
        left: 8%;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        max-width: 520px;
      }

      h2 {
        font-size: 38px;
        font-weight: 800;
        margin-bottom: 16px;
      }

      p {
        font-size: 18px;
        margin-bottom: 24px;
      }

      button {
        background: white;
        color: #111;
        border: none;
        padding: 14px 26px;
        border-radius: 28px;
        font-weight: 600;
        cursor: pointer;
      }

      /* DOTS */

      .dots {
        position: absolute;
        bottom: 20px;
        left: 8%;
        display: flex;
        gap: 8px;
      }

      .dots span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        cursor: pointer;
      }

      .dots span.active {
        background: white;
      }

      /* MOBILE */

      @media (max-width: 768px) {
        .content {
          left: 20px;
          right: 20px;
        }

        h2 {
          font-size: 26px;
        }

        p {
          font-size: 15px;
        }

        .hero-slider {
          height: 60vh;
        }
      }

      `}</style>
    </section>
  );
}