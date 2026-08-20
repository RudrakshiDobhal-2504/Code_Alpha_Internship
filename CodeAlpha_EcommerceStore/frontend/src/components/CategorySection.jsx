import {
  ArrowUpRight,
  Shirt,
  Smartphone,
  Sparkles,
  Home,
  Watch,
  Dumbbell,
} from "lucide-react";

import { Link } from "react-router-dom";

const categories = [
  {
    name: "Fashion",
    description:
      "Everyday silhouettes.",
    icon: Shirt,
    number: "01",
  },
  {
    name: "Electronics",
    description:
      "Technology that fits your life.",
    icon: Smartphone,
    number: "02",
  },
  {
    name: "Beauty",
    description:
      "Simple self-care essentials.",
    icon: Sparkles,
    number: "03",
  },
  {
    name: "Home",
    description:
      "Pieces for your space.",
    icon: Home,
    number: "04",
  },
  {
    name: "Accessories",
    description:
      "Details that complete you.",
    icon: Watch,
    number: "05",
  },
  {
    name: "Sports",
    description:
      "Move with purpose.",
    icon: Dumbbell,
    number: "06",
  },
];

function CategorySection() {
  return (
    <section className="category-section page-container">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">
            COLLECTIONS
          </span>

          <h2>
            Find your next
            <br />
            favourite.
          </h2>
        </div>

        <Link
          to="/categories"
          className="text-link"
        >
          View all categories
          <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="category-grid">
        {categories.map(
          ({
            name,
            description,
            icon: Icon,
            number,
          }) => (
            <Link
              key={name}
              to={`/shop?category=${encodeURIComponent(
                name
              )}`}
              className="category-card"
            >
              <span className="category-number">
                {number}
              </span>

              <div className="category-icon">
                <Icon size={25} />
              </div>

              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>

              <ArrowUpRight
                className="category-arrow"
                size={20}
              />
            </Link>
          )
        )}
      </div>
    </section>
  );
}

export default CategorySection;