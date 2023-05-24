import React, { useEffect, useState } from "react";
import { Pagination } from "../../types/common";
import { Form } from "../../types/data";
import { listForms } from "../../utils/apiUtils";
import Home from "../Home";
import { User } from "../../types/User";

const fetchForms = async (
  offset: number,
  setPageCB: (value: Pagination<Form>) => void
) => {
  const forms = await listForms({ limit: 5, offset: offset });
  setPageCB(forms);
};

export const PaginationUI = (currentUser:User) => {
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<Pagination<Form>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [pageIndex, setPageIndex] = useState<number>(0);
  const maxPage = Math.ceil(page!.count / 5);

  useEffect(() => {
    fetchForms(offset, setPage);
  }, [offset]);

  const changePage = (index: number) => {
    setPageIndex(index);
    setOffset(index * 5);
  };

  const handleNext = () => {
    setOffset(offset + 5);
    fetchForms(offset, setPage);
  };

  const handlePrevious = () => {
    setOffset(offset - 5);
    fetchForms(offset, setPage);
  };

  const updateForms = () => {
    fetchForms(offset, setPage);
  };

  return (
    <div className="flex flex-col w-full items-start justify-between border-t border-gray-200 bg-white px-4 py-2">
        {/* {page!.results.map((form: Form) => (
          <div key={form.id} className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {form.title}
              </div>
              <div className="text-sm text-gray-500">{form.description}</div>
            </div>
          </div>
        ))} */}
        {page ? <Home forms={page.results} updateFormsCB={updateForms} currentUser={currentUser} /> : ""}
      <div className="flex flex-1 justify-between sm:hidden w-full">
        {page!.previous ? (
          <button
            onClick={handlePrevious}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
        ) : (
          ""
        )}
        {page!.next ? (
          <button
            onClick={handleNext}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 w-full sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{offset}</span> to{" "}
            <span className="font-medium">
              {page.count > offset + 5 ? offset + 5 : page.count}
            </span>{" "}
            of <span className="font-medium">{page.count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm mx-2"
            aria-label="Pagination"
          >
            {page!.previous ? (
              <button
                onClick={handlePrevious}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                {"<"}
              </button>
            ) : (
              ""
            )}

            {[...Array(maxPage)].map((_, index) => (
              <button
                key={index}
                onClick={() => changePage(index)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 
                        ${
                          index === pageIndex
                            ? "bg-cyan-500 focus-visible:outline-cyan-500 text-white "
                            : "bg-white text-gray-900 hover:bg-gray-50 ring-gray-300"
                        }`}
              >
                {index + 1}
              </button>
            ))}

            {page!.next ? (
              <button
                onClick={handleNext}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                {">"}
              </button>
            ) : (
              ""
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};
