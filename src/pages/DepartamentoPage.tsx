
import StatsBadge from '../components/StatsBadge';
import { mockDepartamentos, mockEmployees } from '../utils/mockData';

function DepartamentoPage() {
  const totalDepartamentos = mockDepartamentos.length;
  const totalPresupuesto = mockDepartamentos.reduce((sum, dept) => sum + dept.presupuesto, 0);
  const promedioPresupuesto = Math.round(totalPresupuesto / totalDepartamentos);
  const departamentoConMasEmpleados = [...mockDepartamentos]
    .map(dept => ({
      ...dept,
      empleados: mockEmployees.filter(emp => emp.department === dept.nombre).length,
    }))
    .sort((a, b) => b.empleados - a.empleados)[0];

  const resumenDepartamentos = [
    { label: 'Departamentos', value: totalDepartamentos, color: '#dbeafe' },
    { label: 'Presupuesto total', value: `$${totalPresupuesto.toLocaleString()}`, color: '#dcfce7' },
    { label: 'Promedio', value: `$${promedioPresupuesto.toLocaleString()}`, color: '#fef3c7' },
    { label: 'Más empleados', value: departamentoConMasEmpleados?.nombre ?? 'N/A', color: '#fce7f3' },
  ];

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
            value={stat.value as number}
            color={stat.color}
          />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {mockDepartamentos.map((departamento) => {
          const empleados = mockEmployees.filter(emp => emp.department === departamento.nombre).length;

          return (
            <div
              key={departamento.id}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
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
                <div><strong>Presupuesto:</strong> ${departamento.presupuesto.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DepartamentoPage;