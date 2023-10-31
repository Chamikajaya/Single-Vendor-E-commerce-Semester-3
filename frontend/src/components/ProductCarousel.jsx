import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

// todo @Chamika : Carousel is not working properly. (The images are not scaling properly. I will fix it later.☹️)

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const imgStyle = {
    width: "100%",
    height: "100%",
  };

  const divStyle = {
    overflow: "hidden",
    width: "100%",
    maxHeight: "500px",
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product.product_id}>
          <Link to={`/product/${product.product_id}`}>
            <div style={divStyle}>
              <Image
                src={product.img}
                alt={product.title}
                fluid
                style={imgStyle}
              />
            </div>
            <Carousel.Caption
              className="carousel-caption"
              style={{ fontSize: "20px" }}
            >
              <h2
                className="text-white text-right"
                style={{ fontSize: "50px" }}
              >
                {product.title}-{product.variant_title}
              </h2>
              <p>{product.description}</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
