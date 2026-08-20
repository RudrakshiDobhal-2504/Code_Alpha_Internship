import {
  ArrowRight,
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
    icon: Shirt,
    number: "01",
    description:
      "Everyday styles and wardrobe essentials.",
  },
  {
    name: "Electronics",
    icon: Smartphone,
    number: "02",
    description:
      "Useful technology for work and life.",
  },
  {
    name: "Beauty",
    icon: Sparkles,
    number: "03",
    description:
      "Thoughtful personal care essentials.",
  },
  {
    name: "Home",
    icon: Home,
    number: "04",
    description:
      "Pieces that make your space yours.",
  },
  {
    name: "Accessories",
    icon: Watch,
    number: "05",
    description:
      "Small details with a big difference.",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    number: "06",
    description:
      "Gear for movement and active living.",
  },
];

function Categories() {
  return (
    <main className="categories-page">
      <div className="page-container">

        <div className="page-title">
          <span className="eyebrow">
            COLLECTIONS
          </span>

          <h1>
            Shop by category.
          </h1>

          <p>
            Start with what interests you
            and discover something worth
            bringing home.
          </p>
        </div>

        <div className="large-category-grid">
          {categories.map(
            ({
              name,
              icon: Icon,
              number,
              description,
            }) => (
              <Link
                key={name}
                to={`/shop?category=${encodeURIComponent(
                  name
                )}`}
                className="large-category-card"
              >
                <div className="large-category-top">
                  <span>
                    {number}
                  </span>

                  <ArrowRight
                    size={20}
                  />
                </div>

                <div className="large-category-icon">
                  <Icon size={32} />
                </div>

                <div>
                  <h2>{name}</h2>
                  <p>
                    {description}
                  </p>
                </div>

                <span className="category-explore">
                  Explore collection →
                </span>
              </Link>
            )
          )}
        </div>

      </div>
    </main>
  );
}

export default Categories;