import ComplaintCard from './components/ComplaintCard';
import FilterBar from './components/FilterBar';
import Navbar from './components/Navbar'

export default async function Home() {
  const res = await fetch(
    "http://localhost:3000/api/complaints?page=1&limit=9",
    { cache: "no-store" }
  );

  const result = await res.json();
  const {data: complaints, pagination} = result;
  return (
    <div>
      <Navbar />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {complaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint}/>
        ))}
      </div>
    </div>
  );
}
