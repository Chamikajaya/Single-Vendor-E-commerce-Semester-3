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
              src="https://csg1003200203c04e96.blob.core.windows.net/ecom-blob/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907.jpg.landing-big_2x.jpg"
              alt={product.title}
              fluid
            />
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">
                {product.title}-{product.variant_title} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
