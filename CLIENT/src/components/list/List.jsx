
  import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
  import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
  import { useRef, useState } from "react";
  import ListItem from "../listItem/ListItem";
  import "./list.css";
  
  export default function List({list}) {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  
    const listRef = useRef();
  
    const handleClick = (direction) => {
      setIsMoved(true);
      let distance = listRef.current.getBoundingClientRect().x - 50;
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
      }
      if (direction === "right" && slideNumber < 10 - clickLimit) {
        setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      }
    };
    return (
      
      <div className="list">
        <br/>
        <span className="listTitle">{list.title}</span>
        <br/>
        <br/>
        <div className="wrapper">
          <ArrowBackIosIcon
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className="container" ref={listRef}>
            {list.content.map((item, i) => (
              <ListItem index={i} item={item} key={i} />
            ))}
          </div>
          <ArrowForwardIosIcon
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
        <br/>
      </div>
    );
  }