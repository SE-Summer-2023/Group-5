const destinationCities = [
  { value: "LAS", label: "Los Angeles, USA" },
  { value: "JFK", label: "New York, USA" },
  { value: "ORD", label: "Chicago, USA" },
  { value: "YEG", label: "Edmonton, Canada" },
  { value: "YYZ", label: "Toronto, Canada" },
  { value: "YVR", label: "Vancouver, Canada" },
  { value: "YXX", label: "Abbotsford, Canada" },
  { value: "CRK", label: "Angeles, Philippines" },
  { value: "AAE", label: "Annaba, Algeria" },
];

const departureCountry = [
  { value: "India", label: "India" },
  { value: "USA", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "UK", label: "UK" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
];

const IndianFlights = ["HYD", "AMD", "MAA", "DEL", "CCU", "BOM"];
const USAFlights = ["LAS", "JFK", "ORD", "SEA", "MIA", "PHX"];
const CanadaFlights = ["YYZ", "YVR", "YUL", "YEG"];
const UKFlights = ["LGW", "LHR", "MAN", "BHX"];
const SaudiFlights = ["JED", "RUH", "DMM", "MED"];

const getFlightData = (countryFrom, city) => {
  if (countryFrom === "India")
    return IndianFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
  else if (countryFrom === "USA")
    return USAFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
  else if (countryFrom === "Canada")
    return CanadaFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
  else if (countryFrom === "UK")
    return UKFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
  else if (countryFrom === "Saudi Arabia")
    return SaudiFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
};

const getHotelsData = (city) => {
  switch (city) {
    case "LAS":
      return [
        { value: "Hotel1", label: "Hotel1" },
        { value: "Hotel2", label: "Hotel2" },
        { value: "Hotel3", label: "Hotel3" },
      ];
    case "JFK":
      return [
        { value: "Hotel1", label: "Hotel1" },
        { value: "Hotel2", label: "Hotel2" },
        { value: "Hotel3", label: "Hotel3" },
      ];
    case "ORD":
      return [
        { value: "Hotel1", label: "Hotel1" },
        { value: "Hotel2", label: "Hotel2" },
        { value: "Hotel3", label: "Hotel3" },
      ];
    case "YEG":
      return [
        { value: "Hotel1", label: "Hotel1" },
        { value: "Hotel2", label: "Hotel2" },
        { value: "Hotel3", label: "Hotel3" },
      ];
    case "YYZ":
      return [
        { value: "Hotel1", label: "Hotel1" },
        { value: "Hotel2", label: "Hotel2" },
        { value: "Hotel3", label: "Hotel3" },
      ];
    case "YVR":
      return [
        { value: "Hotel1", label: "Hotel1" },
        { value: "Hotel2", label: "Hotel2" },
        { value: "Hotel3", label: "Hotel3" },
      ];
    case "YXX":
      return [
        { value: "Hotel1", label: "Hotel1" },
        { value: "Hotel2", label: "Hotel2" },
        { value: "Hotel3", label: "Hotel3" },
      ];
    case "CRK":
      return [
        { value: "Hotel1", label: "Hotel1" },
        { value: "Hotel2", label: "Hotel2" },
        { value: "Hotel3", label: "Hotel3" },
      ];
    case "AAE":
      return [
        { value: "Hotel1", label: "Hotel1" },
        { value: "Hotel2", label: "Hotel2" },
        { value: "Hotel3", label: "Hotel3" },
      ];
  }
};

const activities = [
  { value: "hiking", label: "Hiking" },
  { value: "surfing", label: "Surfing" },
  { value: "meals", label: "Meals" },
  { value: "camping", label: "Camping" },
  { value: "horse ride", label: "Horse Ride" },
  { value: "fishing", label: "Fishing" },
  { value: "boating", label: "Boating" },
];

export const getData = (dataType, countryFrom, cityTo) => {
  const country = countryFrom === "" ? "India" : countryFrom;
  const city = cityTo === "" ? "Los Angeles, USA" : cityTo;
  switch (dataType) {
    case "destination":
      return destinationCities;
    case "departure":
      return departureCountry;
    case "flights":
      return getFlightData(country, city);
    case "hotels":
      return getHotelsData(city);
    case "activities":
      return activities;
  }
};
