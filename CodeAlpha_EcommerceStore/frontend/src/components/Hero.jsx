import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <div className="hero-eyebrow">
          <Sparkles size={16} />
          <span>New season. New favorites.</span>
        </div>

        <h1>
          Everything you love,
          <span> all in one place.</span>
        </h1>

        <p>
          Discover thoughtfully selected products,
          everyday essentials and exclusive deals
          designed to make shopping simpler.
        </p>

        <div className="hero-buttons">
          <a href="#shop" className="primary-button">
            Shop now
            <ArrowRight size={18} />
          </a>

          <a href="#categories" className="secondary-button">
            Explore categories
          </a>
        </div>

        <div className="hero-trust">
          <div>
            <strong>500+</strong>
            <span>Products</span>
          </div>

          <div>
            <strong>4.8/5</strong>
            <span>Customer rating</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Support</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">

        <div className="hero-card hero-card-main">
          <div className="hero-card-label">
            TRENDING NOW
          </div>

          <div className="hero-product-shape">
            <span>SHOP</span>
          </div>

          <div className="hero-card-bottom">
            <div>
              <small>Featured collection</small>
              <strong>Curated picks</strong>
            </div>

            <span className="hero-arrow">
              →
            </span>
          </div>
        </div>

        <div className="floating-card floating-card-one">
          <span>⭐</span>
          <div>
            <strong>Top rated</strong>
            <small>Customer favorites</small>
          </div>
        </div>

        <div className="floating-card floating-card-two">
          <strong>Free shipping</strong>
          <small>On selected orders</small>
        </div>
      </div>

    </section>
  );
}

export default Hero;