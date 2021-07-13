import { CountMetersQuery } from '../graphql/graphql';
import Loader from '../components/Loader';
import { numberWithCommas } from '../utils/utils';

const HomeView = () => {
  const meterCountQuery = CountMetersQuery();

  let component;

  if (meterCountQuery.loading) {
    component = (
      <div className="mt-16">
        <Loader />
      </div>
    );
  } else if (meterCountQuery.error) {
    console.log('meter count query error', meterCountQuery.error);
    component = (
      <p className="text-md">
        Whoops. Looks like an error occurred while fetching data.
      </p>
    );
  } else {
    component = (
      <div className="container mx-auto pt-8">
        <div className="flex mb-4">
          <div className="w-1/2 text-center">
            <h3 className="text-gray-700 text-3xl">Meters in Service</h3>
            <h2 className="text-gray-900 text-4xl">
              {numberWithCommas(meterCountQuery.data?.countMeters || 0)}
            </h2>
          </div>
        </div>
        <hr />
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex justify-center px-8 relative">
        <img
          className="rounded-b-lg"
          style={{ maxHeight: '40vh' }}
          src="images/martin-adams-los-angeles-unsplash.jpg"
          alt="Downtown Los Angeles"
        />
        <span className="text-white text-opacity-50 text-xs absolute bottom-0 pb-1">
          <a href="https://unsplash.com/@martinadams?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Photo by Martin Adams on Unsplash
          </a>
        </span>
      </div>
      {component}
    </div>
  );
};

export default HomeView;
