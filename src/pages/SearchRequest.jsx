import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../Hook/useAxios";

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]); // State for search results
  const [loading, setLoading] = useState(false); // Loading state
  const [hasSearched, setHasSearched] = useState(false); // Track if a search was performed

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/district.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const selectedDistrict = districts.find((d) => d.name === district);

  const filteredUpazilas = selectedDistrict
    ? upazilas.filter((u) => u.district_id === selectedDistrict.id)
    : [];

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!bloodGroup || !district || !upazila) {
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await axiosInstance.get("/search-donors", {
        params: {
          bloodGroup,
          district,
          upazila,
        },
      });

      console.log(res.data);

      setDonors(res.data.result);
    } catch (error) {
      console.log(error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Find a Hero
          </h2>
          <p className="text-gray-600">
            Search for available donors in your area and save a life today.
          </p>
        </div>

        {/* Search Form Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 mb-16 border border-gray-100">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end"
          >
            {/*  ----------  Blood Group Dropdown ----- */}

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Blood Group
              </label>
              <select
                name="blood"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
              >
                <option value="">Choose Blood Group</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ),
                )}
              </select>
            </div>

            {/*-------------- District Dropdown---------- */}

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                District
              </label>
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila("");
                }}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
              >
                <option value="">Choose District</option>
                {districts.map((d) => (
                  <option value={d?.name} key={d?.id}>
                    {d?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ---------- Upazila Dropdown ----------- */}

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Upazila
              </label>
              <select
                value={upazila}
                disabled={!district}
                onChange={(e) => setUpazila(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
              >
                <option value="">
                  {district ? "Choose Upazila" : "Choose District First"}
                </option>

                {filteredUpazilas.map((u) => (
                  <option value={u?.name} key={u?.id}>
                    {u?.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-100 transition-all transform active:scale-95"
            >
              Search Donors
            </button>

            {/* --------------- Reset Button ------------------ */}
            <button
              type="button"
              onClick={() => {
                setBloodGroup("");
                setDistrict("");
                setUpazila("");
                setDonors([]);
                setHasSearched(false);
              }}
              className="w-full border bg-black border-gray-300 text-white font-bold py-3.5 rounded-xl hover:bg-gray-50 hover:text-black transition-all"
            >
              Reset
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {hasSearched && !loading && (
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Available Donors
              </h3>

              <span className="text-sm text-gray-500">
                {donors.length} donor{donors.length !== 1 ? "s" : ""} found
              </span>
            </div>
          )}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
            </div>
          ) : donors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-50 hover:shadow-xl transition-shadow group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-black text-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                      {donor.blood}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {donor.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {donor.upazila}, {donor.district}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">
                      Active Donor
                    </span>
                    <button className="text-sm font-bold text-red-600 hover:underline">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            hasSearched && (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">
                  No donors found matching your criteria.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchRequest;
