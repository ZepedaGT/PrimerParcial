
import { useState } from 'react';
import StatsBadge from '../components/StatsBadge';
import DepartamentoCard from '../components/DepartamentoCard';
import FormField from '../components/FormField';
import type { Departamento } from '../types';
import { mockDepartamentos, mockEmployees } from '../utils/mockData';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    maximumFractionDigits: 0,
  }).format(value);

function DepartamentoPage() {
  const [departamentos, setDepartamentos] = useState<Departamento[]>(mockDepartamentos);
  const [editingDepartamento, setEditingDepartamento] = useState<Departamento | null>(null);
  const [editForm, setEditForm] = useState({
    nombre: '',
    encargado: '',
    ubicacion: '',
    presupuesto: '',
  });

  const totalDepartamentos = departamentos.length;
  const totalPresupuesto = departamentos.reduce((sum, dept) => sum + dept.presupuesto, 0);
  const promedioPresupuesto = totalDepartamentos ? Math.round(totalPresupuesto / totalDepartamentos) : 0;
  const departamentoConMasEmpleados = [...departamentos]
    .map((dept) => ({
      ...dept,
      empleados: mockEmployees.filter((emp) => emp.department === dept.nombre).length,
    }))
    .sort((a, b) => b.empleados - a.empleados)[0];

  const resumenDepartamentos = [
    { label: 'Departamentos', value: totalDepartamentos, color: '#dbeafe' },
    { label: 'Presupuesto total', value: formatCurrency(totalPresupuesto), color: '#dcfce7' },
    { label: 'Promedio', value: formatCurrency(promedioPresupuesto), color: '#fef3c7' },
    { label: 'Más empleados', value: departamentoConMasEmpleados?.nombre ?? 'N/A', color: '#fce7f3' },
  ];

  const handleDeleteDepartamento = (id: number) => {
    if (!window.confirm('¿Deseas eliminar este departamento?')) return;
    setDepartamentos((prev) => prev.filter((departamento) => departamento.id !== id));
  };

  const handleEditDepartamento = (departamento: Departamento) => {
    setEditingDepartamento(departamento);
    setEditForm({
      nombre: departamento.nombre,
      encargado: departamento.encargado,
      ubicacion: departamento.ubicacion,
      presupuesto: String(departamento.presupuesto),
    });
  };

  const handleSaveEdit = () => {
    if (!editingDepartamento) return;

    const presupuesto = Number(editForm.presupuesto);
    if (!editForm.nombre.trim() || !editForm.encargado.trim() || !editForm.ubicacion.trim() || !Number.isFinite(presupuesto)) {
      window.alert('Completa todos los campos y usa un presupuesto válido.');
      return;
    }

    setDepartamentos((prev) =>
      prev.map((item) =>
        item.id === editingDepartamento.id
          ? {
              ...item,
              nombre: editForm.nombre.trim(),
              encargado: editForm.encargado.trim(),
              ubicacion: editForm.ubicacion.trim(),
              presupuesto,
            }
          : item
      )
    );

    setEditingDepartamento(null);
    setEditForm({ nombre: '', encargado: '', ubicacion: '', presupuesto: '' });
  };

  const formFieldStyle = {
    padding: '8px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#1e293b',
    background: 'white',
    width: '100%',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#1e293b' }}>Departamentos</h2>
        <p style={{ margin: '6px 0 0', color: '#64748b' }}>
          Resumen general de la estructura organizacional
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {resumenDepartamentos.map((stat) => (
          <StatsBadge
            key={stat.label}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      {editingDepartamento && (
        <div style={{
          background: 'white',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
        }}>
          <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#1e293b' }}>
            Editar departamento
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <FormField label="Nombre *">
              <input
                type="text"
                value={editForm.nombre}
                onChange={(e) => setEditForm((prev) => ({ ...prev, nombre: e.target.value }))}
                style={formFieldStyle}
              />
            </FormField>

            <FormField label="Encargado *">
              <input
                type="text"
                value={editForm.encargado}
                onChange={(e) => setEditForm((prev) => ({ ...prev, encargado: e.target.value }))}
                style={formFieldStyle}
              />
            </FormField>

            <FormField label="Ubicación *">
              <input
                type="text"
                value={editForm.ubicacion}
                onChange={(e) => setEditForm((prev) => ({ ...prev, ubicacion: e.target.value }))}
                style={formFieldStyle}
              />
            </FormField>

            <FormField label="Presupuesto (Q) *">
              <input
                type="number"
                min="0"
                value={editForm.presupuesto}
                onChange={(e) => setEditForm((prev) => ({ ...prev, presupuesto: e.target.value }))}
                style={formFieldStyle}
              />
            </FormField>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button
              onClick={handleSaveEdit}
              style={{
                padding: '8px 16px',
                background: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Guardar cambios
            </button>
            <button
              onClick={() => setEditingDepartamento(null)}
              style={{
                padding: '8px 16px',
                background: '#e2e8f0',
                color: '#475569',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {departamentos.map((departamento) => {
          const empleados = mockEmployees.filter((emp) => emp.department === departamento.nombre).length;

          return (
            <DepartamentoCard
              key={departamento.id}
              departamento={departamento}
              empleados={empleados}
              onEdit={handleEditDepartamento}
              onDelete={handleDeleteDepartamento}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DepartamentoPage;