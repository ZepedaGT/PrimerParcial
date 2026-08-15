import type { Departamento } from '../types';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    maximumFractionDigits: 0,
  }).format(value);

interface DepartamentoCardProps {
  departamento: Departamento;
  empleados: number;
  onEdit?: (departamento: Departamento) => void;
  onDelete?: (id: number) => void;
}

function DepartamentoCard({ departamento, empleados, onEdit, onDelete }: DepartamentoCardProps) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '20px' }}>{departamento.nombre}</h3>
        <span
          style={{
            background: '#dbeafe',
            color: '#1d4ed8',
            borderRadius: '999px',
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {empleados} empleados
        </span>
      </div>

      <div style={{ display: 'grid', gap: '8px', color: '#475569', fontSize: '14px' }}>
        <div><strong>Encargado:</strong> {departamento.encargado}</div>
        <div><strong>Ubicación:</strong> {departamento.ubicacion}</div>
        <div><strong>Presupuesto:</strong> {formatCurrency(departamento.presupuesto)}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
        <button
          onClick={() => onEdit?.(departamento)}
          style={{
            padding: '8px 12px',
            background: '#e0f2fe',
            color: '#0f766e',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete?.(departamento.id)}
          style={{
            padding: '8px 12px',
            background: '#fee2e2',
            color: '#b91c1c',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default DepartamentoCard;
