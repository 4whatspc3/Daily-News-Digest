import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Category from "./components/categories/Category";
import Icons from "./components/categories/icons/Icons";
import Logo from "./components/logo/Logo";
import News from "./components/news/News";
import Title from "./components/title/Title";

function App() {
  const [resourceType, setResourceType] = useState("politics");
  const [firstArr, setFirstArr] = useState([]);
  const [secondArr, setSecondArr] = useState([]);

  function changeResource(value) {
    return setResourceType(value);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchFirstData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts`,
          { method: "GET", mode: "cors", signal: signal }
        );
        const json = await response.json();

        console.log(json);

        setFirstArr(json);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Something went wrong:", error);
        }
      }
    }

    async function fetchSecondData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts`,
          { method: "GET", mode: "cors", signal: signal }
        );
        const json = await response.json();

        console.log(json);

        setSecondArr(json);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Something went wrong:", error);
        }
      }
    }

    fetchFirstData();

    fetchSecondData();

    //https://api.thenewsapi.com/v1/news/top?locale=us&language=en&categories=${resourceType}&api_token=FAZEdTRjUMs66l39jd9FoodWHiK0wjYgPfQymiyEhttps://api.thenewsapi.com/v1/news/top?locale=us&language=en&categories=${resourceType}&api_token=FAZEdTRjUMs66l39jd9FoodWHiK0wjYgPfQymiyE

    return () => {
      abortController.abort();
    };
  }, [resourceType]);

  return (
    <>
      <header>
        <Logo />
      </header>
      <nav>
        <Title />
        <Category
          title="Politics"
          icon={<Icons expr={"polis"} />}
          changeResource={() => changeResource("politics")}
        />
        <Category
          title="Sport"
          icon={<Icons expr={"sport"} />}
          changeResource={() => changeResource("sports")}
        />
        <Category
          title="Cinema and TV"
          icon={<Icons expr={"cinema"} />}
          changeResource={() => changeResource("entertainment")}
        />
        <Category
          title="Business"
          icon={<Icons expr={"music"} />}
          changeResource={() => changeResource("business")}
        />
        <Category
          title="Science"
          icon={<Icons expr={"science"} />}
          changeResource={() => changeResource("science")}
        />
      </nav>
      <main>
        <div className="container-horizontal-news">
          {firstArr.slice(0, 3).map((item) => (
            <News
              key={item.id}
              direction="horizontal"
              thumbnail="ola mundo"
              content={item.body}
            />
          ))}
        </div>
        <div className="container-vertical-news">
          {secondArr.slice(0, 3).map((item) => (
            <News
              key={item.id}
              direction="vertical"
              thumbnail="ola mundo"
              content={item.body}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
