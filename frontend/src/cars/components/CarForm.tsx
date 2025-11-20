import type { CreateCar } from "../types/cars";

interface Props {
  form: CreateCar;
  errors: { plate: string; color: string; entry_date: string };
  colors: string[];
  onChange: (data: CreateCar) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CarForm = ({ form, errors, colors, onChange, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="form">

      <div className="form-group">
        <label htmlFor="plate">Placa</label>
        <input
          id="plate"
          type="text"
          value={form.plate}
          placeholder="Placa"
          onChange={(e) => onChange({ ...form, plate: e.target.value })}
          className="form-input"
        />
        {errors.plate && <p className="form-error">{errors.plate}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="color">Color</label>
        <select
          id="color"
          value={form.color}
          onChange={(e) => onChange({ ...form, color: e.target.value })}
          className="form-select"
        >
          <option value="">Seleccione color</option>
          {colors.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.color && <p className="form-error">{errors.color}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="entry_date">Fecha Entrada</label>
        <input
          id="entry_date"
          type="date"
          value={form.entry_date}
          onChange={(e) => onChange({ ...form, entry_date: e.target.value })}
          className="form-input"
        />
        {errors.entry_date && <p className="form-error">{errors.entry_date}</p>}
      </div>

      <button type="submit" className="form-button">
        Crear Carro
      </button>
    </form>
  );
};
