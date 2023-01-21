const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US&page=2`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US&page=1`,
};

export default requests;
