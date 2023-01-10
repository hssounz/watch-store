import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, Banner } from "../components";

const index = ({ products, bannerData }) => {
  return (
    <>
      <Banner bannerData={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Watches of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]{
    _id, _type, details, image, name, price, slug,"imageUrl": image[0].asset->url
  }`;
  const products = await client.fetch(query);
  console.log(products);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default index;
