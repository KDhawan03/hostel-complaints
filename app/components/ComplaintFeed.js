'use client'
import React, { useState } from 'react'
import ComplaintCard from './ComplaintCard'
import FilterBar from './FilterBar'

function ComplaintFeed({initialComplaints}) {
    const [filters, setFilters] = useState({
        status: "ALL",
        category: "ALL",
        hostel: "ALL",
        sort: "Newest",
    });
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    // Filtering logic
    const filtered = initialComplaints.filter((c) => {
      const matchStatus = filters.status === "ALL" || c.status === filters.status;
      const matchCategory = filters.category === "ALL" || c.category === filters.category;
      const matchHostel = filters.hostel === "ALL" || c.hostel === filters.hostel; 
      return matchStatus && matchCategory && matchHostel;
    }).sort((a, b) => {
      return filters.sort === "Newest" 
        ? new Date(b.createdAt) - new Date(a.createdAt) 
        : new Date(a.createdAt) - new Date(b.createdAt);
    });
  
    return (
      <>
        <FilterBar filters={filters} setFilters={setFilters} />
    
        <div className="flex flex-col gap-4 mt-6">
          {filtered.map((complaint) => (
            <ComplaintCard 
              key={complaint.id} 
              complaint={complaint} 
              onClick={() => setSelectedComplaint(complaint)} 
            />
          ))}
        </div>
      </>
    );
}

export default ComplaintFeed
