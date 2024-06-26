"use client";
import React, { useState, useContext } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilter from "./ProductFilter";
import SortBy from "./components/SortBy";
import { QueryContext } from "../../context/QueryContext";
import { titleCase } from "../../utils/utils";

import { QueryContextPropsType } from "../../lib/types";

function SearchPage() {
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const { q } = useContext<QueryContextPropsType>(QueryContext);
  const capitalizedQuery = titleCase(q);

  return (
    <div className="search-container md:px-2 lg:px-8 xl:px-12">
      <div className="flex flex-row justify-between items-center py-4 sticky">
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-2xl font-semibold">{capitalizedQuery}</h1>
          <h2 className="text-gray-600">
            {totalItems ? totalItems + " Items" : ""}
          </h2>
        </div>
        <div className="hidden md:block">
          <SortBy />
        </div>
      </div>
      <div className="search-grid grid grid-flow-row grid-cols-2">
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-[3fr_9fr] gap-4 xl:gap-8">
          <ProductFilter />
          <ProductGrid setTotalItems={setTotalItems} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
