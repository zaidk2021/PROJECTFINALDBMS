import React, { useEffect, useState } from "react";

function RegVisitor() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/getAllVisitors') // Adjust the URL based on your server setup
      .then(response => response.json())
      .then(data => setVisitors(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <section className="bg-white py-20">
<div className="container">
  <div className="flex flex-wrap -mx-4">
    <div className="w-full px-4">
      <div className="max-w-full overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-500 text-center">
              <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
                Visitor ID
              </th>
              <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
              Name
              </th>
              <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
              Phone Number
              </th>
              <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
              Visit Date
              </th>
              <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
              Room No
              </th>
              <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
              Block No
              </th>
            </tr>
          </thead>
          <tbody>
            {visitors.map(visitor => (
              <tr key={visitor.visitor_id} className="text-center">
                <td className="text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                  {visitor.visitor_id}
                </td>
                <td className="text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                {visitor.visitor_name}
                </td>
                <td className="text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                {visitor.phone_number}
                </td>
                <td className="text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                {visitor.visit_date}
                </td>
                <td className="text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                {visitor.room_no}
                </td>
                <td className="text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                {visitor.block_no}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</section>
    
  );
}

export default RegVisitor;





