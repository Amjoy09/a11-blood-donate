import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxios from "../../../Hook/useAxios";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get(`manager/products/${user?.email}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosInstance, user?.email]);

  console.log(products);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price (BDT)</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {products?.map((product) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={product?.productImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product?.productName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {product?.price}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {product?.paymentOption}
                  </span>
                </td>
                <td>{product?.category}</td>
                <th>
                  <button className="btn btn-ghost btn-xs text-[14px] mr-2 bg-cyan-500 text-white">
                    Edit
                  </button>
                  <button className="btn btn-ghost btn-xs text-[14px] bg-red-500 text-white">
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
