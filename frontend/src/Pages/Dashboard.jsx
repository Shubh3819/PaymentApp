import Topbar from "../components/Topbar";
import Balance from "../components/Balance";
import { Users } from "../components/Users";
import Transactions from "../components/Transactions";

const LIGHT_BG = 'rgb(255, 247, 250)';

export default function Dashboard() {
  return (

    <div className="min-h-screen font-sans" style={{ backgroundColor: LIGHT_BG }}>
      
      <Topbar />
      
      <div className="p-4 md:p-6 lg:p-8">

        <div className="max-w-7xl mx-auto space-y-6">
            
            <Balance /> 

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-1 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <Users />
                </div>
                
                <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <Transactions />
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}