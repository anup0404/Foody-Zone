import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Component/SearchResult";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loding, setLoding] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const [selectedbtn, setSelectedBtn] = useState("All");

  useEffect(() => {
    const Fetch_data = async () => {
      setLoding(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        console.log(json);
        setData(json);
        setFilterData(json);
        setLoding(false);
      } catch (error) {
        setError("unable to fetch data");
      }
    };

    Fetch_data();
  }, []);
  if (error) return <div>{error}</div>;
  if (loding) return <div>loding.....</div>;
  const searchFood = (event) => {
    const searchValue = event.target.value;

    if (searchValue === "") {
      setFilterData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };

  const filterFood = (type) => {
    if (type == "All") {
      setFilterData(data);
      setSelectedBtn("All");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedBtn(type);
  };
  const filterbtn = [
    {
      name: "All",
      type: "All",
    },
    {
      name: "Breakfast",
      type: "Breakfast",
    },
    {
      name: "Lunch",
      type: "Lunch",
    },
    {
      name: "Dinner",
      type: "Dinner",
    },
  ];

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/Foody Zone.png" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterbtn.map(({ name, type }) => (
            <Button isSelected={selectedbtn===type} key={name} onClick={() => filterFood(type)}>
              {type}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult foodData={filterData} />
    </>
  );
};

export default App;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
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
      &::placeholder{
        color: white;
      }
    }
  }
  @media (0 < width < 600px){
    height: 120px;
    flex-direction: column;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background-color:${({isSelected})=>(isSelected)?"#621c1c":" #ff4343"};
  outline:1px solid ${({isSelected})=>(isSelected)?"white":" #ff4343"};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #621c1c;
  }
`;
