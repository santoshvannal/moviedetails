import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import style from "./style.css";
import SearchIcon from "@rsuite/icons/Search";

const API_URl = `https://api.themoviedb.org/3/movie/popular?api_key=c6d9acd601be9855cb40393602a7c70c&page=`;
const API_URL2 = "https://api.themoviedb.org/3/search/movie?query=";

function Page() {
  const [movie, setMovie] = useState([]);
  const [num, setNum] = useState("1"); // Set initial state to an empty string
  const [totalpages, setTotalpages] = useState();
  const [favourites, setFavourites] = useState([]);
  const [render, setRender] = useState(false);
  const [colors, setColors] = useState("blue");
  const [movieName, SetMovieName] = useState("");
  const [enterbutton, SetEnterbutton] = useState(false);
  const [url, SetUrl] = useState(`${API_URl}` + `${num}`);

  useEffect(() => {
    const fetchData = async () => {
      let url2 =
        `${API_URL2}` +
        `${movieName}` +
        `&api_key=c6d9acd601be9855cb40393602a7c70c`;
      if (movieName.length >= 1) {
        SetUrl(url2);
      }
      if (movieName.length === 0) {
        SetUrl(`${API_URl}` + `${num}`);
      }
      try {
        const response = await fetch(url).then((res) => res.json());
        setMovie(response.results);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.name);
        } else {
          console.log("This is an unknown error");
        }
      }
    };

    fetchData();
  }, [num, movieName,url]);
  console.log(url);
  function handleClick(e) {
    e.preventDefault();
    if ("1" >= num) {
      setNum("1");
    } else {
      setNum(num - 1);
    }
  }

  function addFav(currmovie) {
    if (!favourites?.includes(currmovie)) {
      setFavourites([...favourites, currmovie]);
      const data = favourites;
    } else {
      setFavourites([...favourites.filter((item) => item !== movie)]);
    }
  }

  function increament(e) {
    e.preventDefault();
    setNum(Number(num) + 1);
  }

  return (
    <>
      {render ? (
        <>
          {favourites?.map((fav) => {
            const {
              id,
              original_title,
              poster_path,
              release_date,
              overview,
              original_language,
              vote_average,
            } = fav;
            return (
              <div className="movie">
                <div className="sub_movie" key={id}>
                  <img
                    className="poster"
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    alt=""
                    width="250"
                    height="100"
                  />
                  <div className="article_div">
                    <h1 className="title">
                      <b>{original_title}</b>
                    </h1>
                    <div className="">
                      <svg width="16" height="20" fill="currentColor">
                        <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                      </svg>

                      <h2>
                        <b>Rating : </b>
                        {vote_average} / 10.
                      </h2>
                    </div>
                    <div>
                      <h2 className="">
                        <b>Language : </b>
                        {original_language.toUpperCase()}.
                      </h2>
                    </div>
                    <div className="">
                      <h2>
                        <b>Year : </b> {release_date}.
                      </h2>
                    </div>
                    <div className="">
                      <p className="">
                        <b>About : </b>
                        {overview.substring(0, 156)}...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="buttons">
            <button onClick={() => setRender(!render)}>Favourite</button>
            <div className="Searchdiv">
              <input onChange={(e) => SetMovieName(e.target.value)} />
              <SearchIcon
                className="Searchicon"
                onClick={() => {
                  SetEnterbutton(true);
                }}
              />
            </div>
          </div>
          <div>
            {movieName.length === 0 ? (
              <>
                <div className="next_prev">
                  <button onClick={handleClick}>Prev </button>
                  <span>{num}</span>
                  <button onClick={increament}>Next</button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="movie">
            {movie.map((currmovie) => {
              const {
                id,
                original_title,
                poster_path,
                release_date,
                overview,
                original_language,
                vote_average,
              } = currmovie;
              return (
                <div className="sub_movie" key={id}>
                  <img
                    className="poster"
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    alt=""
                    width="250"
                    height="100"
                  />
                  <div className="article_div">
                    <h1 className="title">
                      <b>{original_title}</b>
                    </h1>
                    <div className="">
                      <svg width="16" height="20" fill="currentColor">
                        <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                      </svg>

                      <h2>
                        <b>Rating : </b>
                        {vote_average} / 10.
                      </h2>
                    </div>
                    <div>
                      <h2 className="">
                        <b>Language : </b>
                        {original_language.toUpperCase()}.
                      </h2>
                    </div>
                    <div className="">
                      <h2>
                        <b>Year : </b> {release_date}.
                      </h2>
                    </div>
                    <NavLink>
                      <div className="">
                        <AiOutlineHeart
                          className="Favorite_icon"
                          style={{
                            color: favourites?.map((mov) => {
                              mov?.id === id;
                            })
                              ? colors
                              : "blue",
                          }}
                          onClick={() => {
                            addFav(currmovie);
                            setColors("red");
                          }}
                        />
                      </div>
                    </NavLink>
                    <div className="">
                      <p className="">
                        <b>About : </b>
                        {overview.substring(0, 156)}...
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Page;
