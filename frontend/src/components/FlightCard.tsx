import { type Flight } from "../store/flightSlice";

interface Props {
  flight: Flight;
  onSelect: () => void;
}

const FlightCard: React.FC<Props> = ({ flight, onSelect }) => {
  const dep = new Date(flight.departureTime);
  const arr = new Date(flight.arrivalTime);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center justify-between hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img
          src={flight.airlineLogoUrl}
          alt={flight.airlineName}
          className="h-10 w-10 object-contain"
        />
        <div>
          <p className="font-semibold">{flight.airlineName}</p>
          <p className="text-xs text-slate-500">{flight.flightNumber}</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold">
          {dep.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <span className="text-[10px] text-slate-400">
          {flight.fromCity.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xs text-slate-500">Duration</span>
        <span className="text-sm font-medium">{flight.durationMin} min</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold">
          {arr.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <span className="text-[10px] text-slate-400">
          {flight.toCity.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-lg font-semibold text-blue-600">
          ₹{flight.price.toFixed(0)}
        </span>
        <button
          onClick={onSelect}
          className="mt-2 px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
