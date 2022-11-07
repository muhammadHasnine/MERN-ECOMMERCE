import React, { Fragment, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../actions/productAction";
import Loader from "./layout/Loader/Loader";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import MetaData from "./layout/MetaData";
const category = [
  "Processore",
  "Component",
  "Desktop",
  "Monitor",
  "Graphics Card",
  "T-shirt",
];
const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, products, productCount, resultPerPage,filteredProductCount } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const [range, setrange] = useState(0);
  const [range2, setrange2] = useState(250000);
  const [total, settotal] = useState([0, 250000]);
  const [Category, setcategory] = useState("");
  const [ratings, setratings] = useState(0)
  const count = filteredProductCount;

  useEffect(() => {
    settotal([range, range2]);
  }, [range, range2]);

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, total, Category,ratings));
  }, [dispatch, keyword, currentPage, total, Category,ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products --- Ecommerce"/>
          <h1 className="text-[1.7vmax] border-b w-[14vmax] text-center p-[1vmax] m-[3vmax_auto] font-medium font-[sans-serif]">
            Products
          </h1>
          <div className="flex flex-wrap justify-center p-[0_5vmax] min-h-[40vh]">
            {products &&
              products.map((product,i) => <ProductCard key={i} product={product} />)}
          </div>
          <div className="sm:absolute sm:top-[4vw] sm:left-[2.5vw]  lg:left-[4vw] w-[80%] sm:w-fit flex flex-col items-center sm:items-start m-[2vmax_auto]">
            <p className="border-b sm:border-none pb-[1vmax] sm:pb-0 mb-[2vmax] sm:mb-[1vmax] w-[40%] text-center sm:text-start font-semibold text-lg">
              Price
         
            </p>
            <div className="flex flex-row sm:flex-col sm:w-[12vmax] lg:w-fit sm:text-[1.5vmax] lg:text-[1vmax]">
              <div>
                <h2 className="text-center border p-1 rounded font-medium">
                  Min: ৳{total[0]}
                </h2>
                <input
                  className="sm:w-[12vmax] lg:w-fit"
                  type="range"
                  value={range}
                  min="0"
                  max="250000"
                  onChange={(e) => setrange(e.target.value)}
                />
              </div>
              <div>
                <h2 className="text-center border p-1 rounded font-medium">
                  Max: ৳{total[1]}
                </h2>
                <input
                  className="sm:w-[12vmax] lg:w-fit"
                  type="range"
                  value={range2}
                  min="0"
                  max="250000"
                  onChange={(e) => setrange2(e.target.value)}
                />
              </div>
            </div>
            <div className="category">
              <h1 className="font-medium font-roboto mb-[0.5vmax]">Category</h1>
              <li
                className="list-none cursor-pointer text-[0.8rem] font-light transition-all hover:text-[tomato]"
                onClick={() => setcategory(null)}
              >
                ALL
              </li>
              {category.map((c, i) => {
                return (
                  <li
                    className="list-none cursor-pointer text-[0.8rem] font-light transition-all hover:text-[tomato]"
                    key={i}
                    onClick={() => setcategory(c)}
                  >
                    {c}
                  </li>
                );
              })}
            </div>
            <div className="ratings">
              <h1>Ratings Above</h1>
              <p className="text-sm"><span className="text-base font-medium">{ratings}</span> Ratings</p>
              <input type="range" value={ratings} min={0} max={5} onChange={(e) => setratings(e.target.value)} />
            </div>
          </div>
          {resultPerPage < count && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              nextPageText="Next"
              itemClass="page_item"
              linkClass="page_link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
