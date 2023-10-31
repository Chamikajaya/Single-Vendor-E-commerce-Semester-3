import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

// todo @Chamika : Carousel is not working properly. (The images are not scaling properly. I will fix it later.☹️)

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product.product_id}>
          <Link to={`/product/${product.product_id}`}>
            <Image
              src="https://csg1003200203c04e96.blob.core.windows.net/ecom-blob/New-Odyssey-Ark-2nd_1440x640_PC-NoText.webp"
              alt={product.title}
              fluid
            />
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
