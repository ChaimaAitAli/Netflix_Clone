import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.css";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListItemButton } from "@mui/material";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  console.log(genre);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,

            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      <br />
      
      {lists.map((list, i) => (
        <List list={list} key={i} /> 
      ))}
    </div>
  );
};

export default Home;