import { products, site } from '../content'
import { Arrow, Art, SectionLabel } from './Identity'

function MaisArtwork() {
  return <div className="mais-artwork" aria-hidden="true">
    <Art name="chart-trend" size={220} className="float mais-float mais-float-a" />
    <Art name="donut" size={170} className="float float-late mais-float mais-float-b" />
    <Art name="bars" size={130} className="float float-slow mais-float mais-float-c" />
  </div>
}

export default function Products() {
  return <section className="products-section" id="products" data-nav="products" aria-labelledby="products-title">
    <div className="container">
      <SectionLabel number="02">Products</SectionLabel>
      <div className="section-heading-row reveal"><h2 id="products-title">{site.productsIntro.heading}</h2><p>{site.productsIntro.description}</p></div>
      <div className="product-entries">
        {products.map((product, index) => <article key={product.id} className="product-entry featured-product reveal">
          <div className="product-copy">
            <div className="product-meta"><p className="product-category"><span>{String(index + 1).padStart(2, '0')}</span> / {product.category}</p><span className="product-status">{product.stage}</span></div>
            <h3 className="product-name">{product.name}</h3>
            <h4>{product.headline}</h4>
            {product.description.map(text => <p className="product-description" key={text}>{text}</p>)}
            {product.capabilities ? <ul className="capability-list">{product.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul> : null}
            <div className="product-actions">
              {product.href ? <a className="text-link product-link" href={product.href}>Explore {product.name}<Arrow diagonal /></a> : null}
              {product.prototypeUrl?.trim() ? <a className="text-link prototype-link" href={product.prototypeUrl.trim()} target="_blank" rel="noopener noreferrer">View prototype<Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a> : null}
            </div>
          </div>
          {product.id === 'mais' ? <MaisArtwork /> : null}
        </article>)}
        <article className="product-entry next-product reveal">
          <div className="product-copy">
            <p className="product-category">{site.whatsNext.label}</p>
            <h3 className="next-product-title">{site.whatsNext.headline}</h3>
            <p className="product-description">{site.whatsNext.description}</p>
            <a className="text-link product-link" href={site.whatsNext.href}>Where we’re looking<Arrow diagonal /></a>
          </div>
          <div className="next-product-art" aria-hidden="true"><span className="next-cross"><Art name="cube-hex" size={90} /></span></div>
        </article>
      </div>
    </div>
  </section>
}
