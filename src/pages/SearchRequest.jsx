import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../Hook/useAxios";

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("./district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;

    axiosInstance
      .get(
        `/search-request?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="fieldset flex">
        <select
          name="blood"
          defaultValue="Choose Blood Group"
          className="select"
        >
          <option selected>Choose Blood Group</option>

          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B-</option>
          <option value="C+">C+</option>
          <option value="C-">C-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <select
          name="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="select"
        >
          <option selected>Choose District</option>

          {districts.map((d) => (
            <option value={d?.name} key={d?.id}>
              {d?.name} ({d?.bn_name})
            </option>
          ))}
        </select>
        <select
          name="upazila"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="select"
        >
          <option selected>Choose Upazila</option>

          {upazilas.map((u) => (
            <option value={u?.name} key={u?.id}>
              {u?.name} ({u?.bn_name})
            </option>
          ))}
        </select>

        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  );
};

export default SearchRequest;
