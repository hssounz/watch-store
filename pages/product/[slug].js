import React, { useState, useEffect } from "react";
import { urlFor, client } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "../../components/Product";
import { useStateContext } from "../../context/StateContext";
import { toast } from "react-hot-toast";

const ProductDetails = ({ product, similarProducts }) => {
  const { image, name, price, details } = product;
  const [index, setIndex] = useState(0);
  const { state, dispatch } = useStateContext();
  const { qty } = state;

  useEffect(() => {
    dispatch({ type: "setQty", value: 1 });
  }, [product]);

  const handleBuyNow = () => {
    dispatch({ type: "addToCart", value: { product, qty } });
    dispatch({ type: "setshowCart", value: true });
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {image && (
              <img
                src={urlFor(image[index]).width(500)}
                className="product-detail-image"
                alt="product image"
              />
            )}
          </div>
          <div className="small-images-container">
            {image?.map((item, idx) => (
              <img
                key={item._key}
                src={urlFor(item)}
                alt=""
                className={
                  idx === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => {
                  setIndex(idx);
                }}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details} </p>
          <p className="price">$ {price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={() => {
                  if (qty > 1) {
                    dispatch({ type: "decQty" });
                  }
                }}
              >
                <AiOutlineMinus />{" "}
              </span>
              <span className="num" onClick={() => {}}>
                {qty}
              </span>
              <span
                className="plus"
                onClick={() => dispatch({ type: "incQty" })}
              >
                <AiOutlinePlus />{" "}
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                dispatch({ type: "addToCart", value: { product, qty } });
                toast.success(`${qty} ${product.name} added to cart`);
              }}
            >
              Add To Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You May Also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {similarProducts?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == 'product']{
    slug
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => {
    return {
      params: {
        slug: product?.slug?.current,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const similarProductsQuery = `*[_type == "product"]`;
  const similarProducts = await client.fetch(similarProductsQuery);

  return {
    props: { product, similarProducts },
  };
};

export default ProductDetails;
