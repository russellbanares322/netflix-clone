const requests = {
  requestPopular: `/movie/popular?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US&page=1`,
  requestTopRated: `/movie/top_rated?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US&page=1`,
  requestTrending: `/movie/popular?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US&page=2`,
  requestUpcoming: `/movie/upcoming?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US&page=1`,
  requestHorror: `/search/movie?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US&query=horror&page=1&include_adult=false`,
};

export default requests;
