"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { RotatingLines } from "react-loader-spinner";

import Product from "../../components/Product";
import useProductsFetch from "../../hooks/useProductsFetch";
import { QueryContext } from "../../context/QueryContext";

import { QueryContextPropsType } from "../../lib/types";

function ProductGrid({
  setTotalItems,
}: {
  setTotalItems: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { q, queryParams } = useContext<QueryContextPropsType>(QueryContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [products, hasMore, loading, totalHits, error] =
    useProductsFetch(pageNumber);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      const options = {
        root: null,
        rootMargin: "100px",
        threshold: 1,
      };

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Update total items
  useEffect(() => {
    setTotalItems(totalHits);
  }, [totalHits, setTotalItems]);

  // Reset page number and scroll to top on query change
  useEffect(() => {
    setPageNumber(1);
    window.scroll({ top: 0, behavior: "smooth" });
  }, [q, queryParams]);

  if (!loading && products.length === 0)
    return (
      <div className="flex flex-col items-center">
        <section className="text-xl">No results found for '{q}'</section>
        <section>
          Try clearing some filters from here or try searching some other
          keywords Look at other items in our store
        </section>
      </div>
    );

  return (
    <div className="search-products-grid grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4 overflow-y-auto no-scrollbar">
      {products.map((p, index) => {
        if (index === products.length - 1) {
          return (
            <Product
              ref={lastElementRef}
              key={p.id}
              id={p.id}
              image_url={p.images[0]}
              title={p.title}
              price={p.price}
              discounted_price={p.discountedPrice}
            />
          );
        }
        return (
          <Product
            key={p.id}
            id={p.id}
            image_url={p.images[0]}
            title={p.title}
            price={p.price}
            discounted_price={p.discountedPrice}
          />
        );
      })}
      {loading && (
        <div className="col-span-2 md:col-span-3 xl:col-span-4 flex justify-center">
          <RotatingLines visible={true} width="30" strokeColor="grey" />
        </div>
      )}

      {!hasMore && (
        <div className="col-span-2 md:col-span-3 xl:col-span-4 flex justify-center items-center">
          <section className="bg-gray-200 p-2 text-black-200 rounded-sm">
            No more results
          </section>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
