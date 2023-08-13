import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Component/SearchResult";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    const Fetch_data = async () => {
      setLoding(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        console.log(json);
        setData(json);
        setLoding(false);
      } catch (error) {
        setError("unable to fetch data");
      }
    };

    Fetch_data();
  }, []);
  if (error) return <div>{error}</div>;
  if (loding) return <div>loding.....</div>;

  return (
    <>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/Foody Zone.png" alt="logo" />
        </div>
        <div className="search">
          <input placeholder="Search Food" />
        </div>
      </TopContainer>
      <FilterContainer>
        <Button>All</Button>
        <Button>Breakfast</Button>
        <Button>Lunch</Button>
        <Button>Dinner</Button>
      </FilterContainer>
     
    </Container>
     <SearchResult foodData={data} />
     </>
  );
};

export default App;
const Container = styled.div`
  background-color: #323343;
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
    }
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
`;
