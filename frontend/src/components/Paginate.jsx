import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { updatePage } from '../slices/pageSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePage(page));
  }, [page, dispatch]);
  
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
