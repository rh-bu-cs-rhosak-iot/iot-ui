/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import { convertToNumberOrDefaultTo, PAGE_SIZE } from '../utils/utils';
import { parse, stringify } from 'query-string';
import { MetersQuery } from '../graphql/graphql';
import Loader from '../components/Loader';

interface MeterListViewProps extends RouteComponentProps {
  history: History;
}

const MetersListView: React.FC<MeterListViewProps> = (
  props: MeterListViewProps
) => {
  const parsedQuery = parseQueryParams();

  const { loading, error, data } = MetersQuery({
    variables: {
      page: {
        limit: PAGE_SIZE,
        offset: parsedQuery.page * PAGE_SIZE
      }
    }
  });

  // Used to prevent pagination overflow
  const MAX_PAGES = Math.ceil((data?.meters.count || 0) / PAGE_SIZE);

  function parseQueryParams() {
    const query = parse(props.location.search);
    const pageQueryValue = query.page;

    return {
      page: Array.isArray(pageQueryValue)
        ? 0
        : convertToNumberOrDefaultTo(pageQueryValue)
    };
  }

  const nextPage = () => {
    if (parsedQuery.page + 1 >= MAX_PAGES) {
      return;
    }

    const query = stringify({
      page: parsedQuery.page + 1
    });

    props.history.push(`/meters/?${query}`);
  };

  const prevPage = () => {
    if (parsedQuery.page === 0) {
      return;
    }

    const query = stringify({
      page: parsedQuery.page - 1
    });

    props.history.push(`/meters/?${query}`);
  };

  let content: JSX.Element;
  if (loading) {
    content = (
      <div className="mt-64">
        <Loader />
      </div>
    );
  } else if (error) {
    content = (
      <div className="mt-64 text-center">
        <p>An error ocurred: {error?.message}</p>
      </div>
    );
  } else {
    // const paging =
    const rows = data?.meters.items.map((m, idx) => {
      return (
        <tr className="hover:bg-gray-200 fade-in" key={m?.id}>
          <td className="border px-4 py-2">
            <Link className="underline text-blue-700" to={`/meters/${m?.id}`}>
              {m?.id}
            </Link>
          </td>
          <td className="border px-4 py-2">{m?.address}</td>
          <td className="border px-4 py-2">
            {m?.latitude},{m?.longitude}
          </td>
          <td className="border px-4 py-2">{'Yes'}</td>
        </tr>
      );
    });

    content = (
      <div>
        <div className="flex">
          {/* See: https://tailwindui.com/components/application-ui/navigation/pagination */}
          <nav className="flex-1 justify-end relative z-0 inline-flex">
            <a
              href="#"
              onClick={() => {
                prevPage();
                return false;
              }}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <span className="-ml-px text-blue-700 relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
              Page {parsedQuery.page + 1} of {MAX_PAGES}
            </span>
            <a
              href="#"
              onClick={() => {
                nextPage();
                return false;
              }}
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Next"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
        <br />
        <table className="w-full table text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">UUID</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Lat/Long</th>
              <th className="px-4 py-2">Enabled</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>

        <div className="text-center pt-6"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-8 fade-in mb-8">
      <h2 className="text-3xl">Meters</h2>
      <hr />
      <br />
      {content}
    </div>
  );
};

export default withRouter(MetersListView);
