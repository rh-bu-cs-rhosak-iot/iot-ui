function HomeView() {
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
    </div>
  );
}

export default HomeView;
