import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import {
  Select,
  Option,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(0);

  const [languages, setLanguages] = useState("");
  const handleChange = (e) => {
    const key = e;
    setSelectedCountry(countries[key]);
    const langs = Object.values(countries[key].languages);
    handleLanguages(langs);
  };

  const handleLanguages = (languagesArray) => {
    let languages = languagesArray[0];
    if (languagesArray.length > 2) {
      languagesArray.slice(1).map((lang) => (languages = lang + "," + languages));
    }
    setLanguages(languages);
  };
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        console.log(res.data);
        setCountries(res.data);
        setSelectedCountry(res.data[0]);
        handleLanguages(Object.values(res.data[0].languages));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="p-7">
      <div className="flex w-full items-end gap-4">
        <Select label="Select Country" onChange={(e) => handleChange(e)}>
          {countries.map((country, key) => {
            return (
              <Option key={key} value={`${key}`}>
                {country.name.common}
              </Option>
            );
          })}
        </Select>
      </div>
      <Card className="w-full bg-gray-700 max-w-[300px] mx-auto text-white my-5">
        <CardHeader floated={false}>
          <img src={selectedCountry.flags ? selectedCountry.flags.png : ""} alt="flag" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {selectedCountry.name ? selectedCountry.name.official : ""}
          </Typography>
          <Typography>
            Capital Name: {selectedCountry.capital ? selectedCountry.capital[0] : ""}
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">{languages}</Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
