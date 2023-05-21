import { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Container } from "@mantine/core";

import PackageCard from "../../components/packageCard/PackageCard";
import SearchBar from "../../components/searchBar/SearchBar";

const Packages = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const { allPacks } = useSelector((state) => state.allpacks);

  const filterPackages = (text) => {
    const regex = new RegExp(text, "i"); // 'i' flag for case-insensitive search
    return allPacks.filter(
      (item) =>
        regex.test(item.packageName) ||
        regex.test(item.packagePrice) ||
        regex.test(item.stayDetails) ||
        regex.test(item.activities) ||
        regex.test(item.country)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const filteredPacks = filterPackages(e.target.value);
        setFilteredPackages(filteredPacks);
      }, 500)
    );
  };
  return (
    <Container size={"xl"}>
      <SearchBar onChange={handleSearchChange} value={searchText} />
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} p={35}>
        {searchText ? (
          <>
            {filteredPackages.map((item) => (
              <Grid.Col lg={3} md={4} sm={5} key={item.packageId}>
                <PackageCard
                  key={item.packageId}
                  packageName={item.packageName}
                  packageDuration={item.packageDuration}
                  flightDetails={item.flightDetails}
                  country={item.country}
                  stayDetails={item.stayDetails}
                  activities={item.activities}
                  packagePrice={item.packagePrice}
                />
              </Grid.Col>
            ))}
          </>
        ) : (
          <>
            {allPacks.map((item) => (
              <Grid.Col lg={4} md={4} sm={5} key={item.packageId}>
                <PackageCard
                  key={item.packageId}
                  packageName={item.packageName}
                  packageDuration={item.packageDuration}
                  flightDetails={item.flightDetails}
                  country={item.country}
                  stayDetails={item.stayDetails}
                  activities={item.activities}
                  packagePrice={item.packagePrice}
                />
              </Grid.Col>
            ))}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Packages;
