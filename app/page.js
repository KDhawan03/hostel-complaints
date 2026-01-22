import ComplaintFeed from './components/ComplaintFeed';
import Navbar from './components/Navbar'

export default async function Home() {
  const res = await fetch(
    "http://localhost:3000/api/complaints?page=1&limit=50",
    { cache: "no-store" }
  );

  const result = await res.json();
  const {data: complaints, pagination} = result;
  return (
    <div>
      <Navbar />
      <ComplaintFeed initialComplaints={complaints}/>
    </div>
  );
}
