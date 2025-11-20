// src/trips/components/TripForm.tsx
import { cities } from "../../utils/cities";
import { Car } from "../../cars/types/cars";
import { CreateTrip } from "../types/trips";

interface Props {
  cars: Car[];
  form: CreateTrip;
  errors: any;
  onChange: (form: CreateTrip) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormTrips = ({ cars, form, errors, onChange, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form-group">
        <label htmlFor="car">Carro</label>
        <select
          id="car"
          value={form.car}
          onChange={(e) => onChange({ ...form, car: Number(e.target.value) })}
          className="form-select"
        >
          <option value={0}>Seleccione carro</option>
          {cars.map((c) => (
            <option key={c.id} value={c.id}>
              {c.plate} - {c.color}
            </option>
          ))}
        </select>
        {errors.car && <p className="form-error">{errors.car}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="origin_city">Ciudad de origen</label>
        <select
          id="origin_city"
          value={form.origin_city}
          onChange={(e) =>
            onChange({ ...form, origin_city: Number(e.target.value) })
          }
          className="form-select"
        >
          <option value={0}>Seleccione ciudad</option>
          {cities.map((c) => (
            <option key={c.pk} value={c.pk}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.origin_city && <p className="form-error">{errors.origin_city}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="destination_city">Ciudad de destino</label>
        <select
          id="destination_city"
          value={form.destination_city}
          onChange={(e) =>
            onChange({ ...form, destination_city: Number(e.target.value) })
          }
          className="form-select"
        >
          <option value={0}>Seleccione ciudad</option>
          {cities.map((c) => (
            <option key={c.pk} value={c.pk}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.destination_city && (
          <p className="form-error">{errors.destination_city}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="hours">Horas</label>
        <input
          id="hours"
          type="number"
          min={1}
          value={form.hours}
          onChange={(e) => onChange({ ...form, hours: Number(e.target.value) })}
          className="form-input"
        />
        {errors.hours && <p className="form-error">{errors.hours}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Fecha</label>
        <input
          id="date"
          type="date"
          value={form.date}
          onChange={(e) => onChange({ ...form, date: e.target.value })}
          className="form-input"
        />
        {errors.date && <p className="form-error">{errors.date}</p>}
      </div>

      <button type="submit" className="form-button">Crear Viaje</button>
    </form>
  );
};
