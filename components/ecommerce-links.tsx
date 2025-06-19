import Link from "next/link"

export function EcommerceLinks() {
  return (
    <div className="ecommerce-links">
      <Link href="/shop">
        <div className="ecommerce-link">
          <img src="/images/shop/biodegradable-bags.png" alt="Biodegradable bags" />
          <h3>Eco-Friendly Products</h3>
          <p>Shop our range of sustainable and eco-friendly products.</p>
        </div>
      </Link>

      <Link href="/shop">
        <div className="ecommerce-link">
          <img src="/images/shop/reusable-water-bottle.jpg" alt="Reusable water bottle" />
          <h3>Reusable Bottles</h3>
          <p>Stay hydrated with our stylish and durable reusable water bottles.</p>
        </div>
      </Link>

      <Link href="/shop">
        <div className="ecommerce-link">
          <img src="/images/shop/organic-cotton-tote-bag.jpg" alt="Organic cotton tote bag" />
          <h3>Organic Tote Bags</h3>
          <p>Carry your groceries in style with our organic cotton tote bags.</p>
        </div>
      </Link>
    </div>
  )
}

export default EcommerceLinks
