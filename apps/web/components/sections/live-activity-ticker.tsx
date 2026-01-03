import { Activity } from 'lucide-react';

// Mock data - Replace with Server Action fetching from ClickHouse
async function getLiveActivities() {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    { name: 'Ahmet K.', district: 'Kadıköy', action: 'Philips EverFlo kiraladı', time: '2 dk önce' },
    { name: 'Ataşehir Mobil Ekip', action: 'teslimat tamamlandı', time: '4 dk önce' },
    { name: 'Ayşe M.', district: 'Ümraniye', action: 'oksijen dolumu yaptırdı', time: '7 dk önce' },
    { name: 'Mehmet B.', district: 'Beşiktaş', action: 'teknik servis çağırdı', time: '12 dk önce' },
  ];
}

export async function LiveActivityTicker() {
  const activities = await getLiveActivities();

  return (
    <div className="bg-slate-900 text-white py-3 overflow-hidden">
      <div className="container-wide">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-emerald-400 flex-shrink-0">
            <Activity className="w-4 h-4 animate-pulse" strokeWidth={1.5} />
            <span className="text-sm font-semibold">Canlı Aktivite</span>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-slate-300">
                    <strong className="text-white">{activity.name}</strong>
                    {activity.district && (
                      <span className="text-slate-400"> ({activity.district})</span>
                    )}
                    {' '}
                    {activity.action}
                  </span>
                  <span className="text-slate-500 text-xs">• {activity.time}</span>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {activities.map((activity, index) => (
                <div key={`dup-${index}`} className="flex items-center gap-2 text-sm">
                  <span className="text-slate-300">
                    <strong className="text-white">{activity.name}</strong>
                    {activity.district && (
                      <span className="text-slate-400"> ({activity.district})</span>
                    )}
                    {' '}
                    {activity.action}
                  </span>
                  <span className="text-slate-500 text-xs">• {activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







