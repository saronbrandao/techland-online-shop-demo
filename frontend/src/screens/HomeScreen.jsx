import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message';
import { useParams, Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { scrollToTop } from '../utils/helper';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const { currentPage } = useSelector((state) => state.page);

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  return (
    <>
      {!keyword && !pageNumber && <ProductCarousel />}
      {keyword && (
        <Link to="/" className="btn btn-light mt-2 mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {keyword ? (
            <h1>Search Results</h1>
          ) : (
            <h1 style={{ marginTop: `${pageNumber ? '25px' : '0'}` }}>
              Latest Products
            </h1>
          )}
          {data.products.length === 0 ? (
            <h3>No Items Found :/</h3>
          ) : (
            <>
              <Row>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
