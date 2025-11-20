import { useState } from "react";
import { getTrips } from "../services/tripApi";
import { Trip } from "../types/trips";
import { ListTrips } from "./ListTrips";

export const SearchTrips = () => {
  const [searchPlaca, setSearchPlaca] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchPlaca.trim()) return;

    try {
      setLoading(true);
      const data = await getTrips(searchPlaca);
      setTrips(data);
      setSearched(true);
    } catch (error) {
      console.error("Error buscando viajes por placa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div
        className="form-group"
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Ingresar placa"
          value={searchPlaca}
          onChange={(e) => setSearchPlaca(e.target.value.toUpperCase())}
          className="form-input"
        />
        <button onClick={handleSearch} className="form-button" style={{ marginLeft: "10px" }}>
          Buscar
        </button>
      </div>

      {loading && <p>Cargando...</p>}

      {!loading && searched && trips.length === 0 && (
        <p>No se encontraron viajes para esta placa.</p>
      )}

       {!loading && trips.length > 0 && <ListTrips trips={trips} />}
    </div>
  );
};
