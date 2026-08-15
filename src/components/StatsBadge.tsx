// src/components/StatsBadge.tsx
interface StatsBadgeProps {
  label: string;
  value: number;
  color?: string;
}

function StatsBadge({ label, value, color = '#2563eb' }: StatsBadgeProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 20px',
      borderRadius: '8px',
      background: '#fff',
      border: `1px solid ${color}`,
      minWidth: '120px',
    }}>
      <span style={{ fontSize: '24px', fontWeight: 700, color }}>{value}</span>
      <span style={{ fontSize: '13px', color: '#64748b' }}>{label}</span>
    </div>
  );
}

export default StatsBadge;
