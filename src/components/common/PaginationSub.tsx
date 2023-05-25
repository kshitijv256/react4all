import React, { useEffect, useState } from "react";
import { Pagination } from "../../types/common";
import { Submission } from "../../types/data";
import { listSubmissions } from "../../utils/apiUtils";
import { User } from "../../types/User";
import Answer from "./Answer";
import { navigate } from "raviger";

const fetchSubmissions = async (
  form_pk: number,
  offset: number,
  setPageCB: (value: Pagination<Submission>) => void
) => {
  const Submissions = await listSubmissions(form_pk, {
    limit: 1,
    offset: offset,
  });
  setPageCB(Submissions);
};

export const PaginationSub = (props: {
  form_pk: number;
  currentUser: User;
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<Pagination<Submission>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [pageIndex, setPageIndex] = useState<number>(0);
  const maxPage = Math.ceil(page!.count);

  useEffect(() => {
    fetchSubmissions(props.form_pk, offset, setPage);
  }, [props.form_pk, offset]);

  const changePage = (index: number) => {
    setPageIndex(index);
    setOffset(index * 1);
  };

  const handleNext = () => {
    if (pageIndex === maxPage - 1) {
      return;
    }
    setPageIndex(pageIndex + 1);
    setOffset(offset + 1);
  };

  const handlePrevious = () => {
    if (pageIndex === 0) {
      return;
    }
    setPageIndex(pageIndex - 1);
    setOffset(offset - 1);
  };

  if (props.currentUser.username === "") {
    navigate("/");
  }

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
      <div className="text-lg font-semibold text-gray-700">Submissions</div>
      {page ? (
        // <Answer submission={page.results}/>
        <div>
          {page.results.map((submission: Submission) => (
            <Answer
              key={submission.id}
              submission={submission}
              form_pk={props.form_pk}
            />
          ))}
        </div>
      ) : (
        ""
      )}
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
              {page.count > offset + 1 ? offset + 1 : page.count}
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
