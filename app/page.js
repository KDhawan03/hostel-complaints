import ComplaintCard from './components/ComplaintCard';
import Navbar from './components/Navbar'
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ComplaintCard />
        <ComplaintCard />
        <ComplaintCard />
        <ComplaintCard />
      </div>
    </div>
  );
}
