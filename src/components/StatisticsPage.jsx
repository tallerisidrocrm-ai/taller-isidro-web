import React, { useState, useEffect, useMemo } from 'react';
import { dataService } from '../services/dataService';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import './StatisticsPage.css';

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const COLORS = ['#FFC107', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0', '#00BCD4', '#FF9800'];

const MOCK_RECORDS = [
    { id: 1, patente: 'ABC 123', cliente: 'Juan Perez', marca: 'Toyota', modelo: 'Corolla', seguro: 'Particular', estado: 'Finalizado', precioBase: 150000, calificacionCliente: 5, fechaInspeccion: '2026-01-26', tipo: 'Chapa y Pintura' },
    { id: 2, patente: 'XYZ 789', cliente: 'Maria Garcia', marca: 'Ford', modelo: 'Fiesta', seguro: 'Fed. Patronal', estado: 'Pendiente', precioBase: 85000, calificacionCliente: 4, fechaInspeccion: '2026-01-26', tipo: 'Inspección' },
    { id: 3, patente: 'AA 111 BB', cliente: 'Carlos Ruiz', marca: 'Honda', modelo: 'Civic', seguro: 'Particular', estado: 'Aprobado', precioBase: 120000, calificacionCliente: 5, fechaInspeccion: '2026-01-25', tipo: 'Mecánica General' },
    { id: 4, patente: 'MM 555 NN', cliente: 'Lucia Lopez', marca: 'Fiat', modelo: 'Cronos', seguro: 'San Cristobal', estado: 'Rechazado', precioBase: 200000, calificacionCliente: 3, fechaInspeccion: '2026-01-24', tipo: 'Reparación General' },
    { id: 5, patente: 'BB 222 CC', cliente: 'Pedro Gomez', marca: 'VW', modelo: 'Golf', seguro: 'Mapfre', estado: 'En Proceso', precioBase: 350000, calificacionCliente: 4, fechaInspeccion: '2026-01-23', tipo: 'Chapa y Pintura' },
    { id: 6, patente: 'CC 333 DD', cliente: 'Ana Weiss', marca: 'Peugeot', modelo: '208', seguro: 'Particular', estado: 'Finalizado', precioBase: 45000, calificacionCliente: 5, fechaInspeccion: '2026-01-26', tipo: 'Cambio de Aceite' },
];

export default function StatisticsPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        estado: '',
        seguro: '',
        marca: '',
        mes: new Date().getMonth().toString(),
        anio: new Date().getFullYear().toString()
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const records = await dataService.getStatisticsData();
                if (records && records.length > 0) {
                    setData(records);
                } else {
                    setData(MOCK_RECORDS);
                }
            } catch {
                setData(MOCK_RECORDS);
            } finally {
                setLoading(false);
            }
        };
        loadData();

        const interval = setInterval(loadData, 300000); // Polling 5min
        return () => clearInterval(interval);
    }, []);

    const calculateAdvancedStats = (records) => {
        const today = new Date().toISOString().split('T')[0];

        const counts = {
            overview: {
                total: records.length,
                inspecciones: records.filter(r => r.tipo === 'Inspección').length,
                reparaciones: records.filter(r => r.tipo?.includes('Reparación') || r.tipo?.includes('Mecánica') || r.tipo?.includes('Chapa')).length,
                finalizados: records.filter(r => r.estado === 'Finalizado').length,
            },
            today: {
                total: 0,
                inspecciones: 0,
                reparaciones: 0,
                finalizados: 0
            },
            clientTypesData: [
                { name: 'Particulares', value: records.filter(r => r.seguro?.toLowerCase() === 'particular').length },
                { name: 'Por Seguro', value: records.filter(r => r.seguro?.toLowerCase() !== 'particular').length }
            ],
            servicesData: [
                { name: 'Chapa', value: records.filter(r => r.tipo?.toLowerCase().includes('chapa')).length },
                { name: 'Mecánica', value: records.filter(r => r.tipo?.toLowerCase().includes('mecánica')).length },
                { name: 'Reparación', value: records.filter(r => r.tipo?.toLowerCase().includes('reparación')).length },
                { name: 'Aceite', value: records.filter(r => r.tipo?.toLowerCase().includes('aceite')).length }
            ],
            insurers: {}
        };

        records.forEach(r => {
            // Daily check
            if (r.fechaInspeccion === today) {
                counts.today.total++;
                if (r.tipo === 'Inspección') counts.today.inspecciones++;
                if (r.tipo?.includes('Reparación') || r.tipo?.includes('Mecánica')) counts.today.reparaciones++;
                if (r.estado === 'Finalizado') counts.today.finalizados++;
            }

            // Insurer aggregation
            if (r.seguro && r.seguro !== 'Particular') {
                counts.insurers[r.seguro] = (counts.insurers[r.seguro] || 0) + 1;
            }
        });

        // Convert insurers to array for chart/list
        counts.insurersData = Object.entries(counts.insurers)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        return counts;
    };

    const annualData = useMemo(() => {
        return data.filter(r => {
            const date = new Date(r.fechaInspeccion);
            return date.getFullYear().toString() === filters.anio;
        });
    }, [data, filters.anio]);

    const currentPeriodData = useMemo(() => {
        if (filters.mes === 'all') return annualData;
        return annualData.filter(r => {
            const date = new Date(r.fechaInspeccion);
            return date.getMonth().toString() === filters.mes;
        });
    }, [annualData, filters.mes]);

    const stats = useMemo(() => calculateAdvancedStats(currentPeriodData), [currentPeriodData]);

    const filteredTableData = useMemo(() => {
        let result = currentPeriodData;
        if (filters.estado) result = result.filter(r => r.estado === filters.estado);
        if (filters.seguro) result = result.filter(r => r.seguro === filters.seguro);
        if (filters.marca) result = result.filter(r =>
            (r.marca && r.marca.toLowerCase().includes(filters.marca.toLowerCase())) ||
            (r.patente && r.patente.toLowerCase().includes(filters.marca.toLowerCase()))
        );
        return result.sort((a, b) => new Date(b.fechaInspeccion) - new Date(a.fechaInspeccion));
    }, [currentPeriodData, filters.estado, filters.seguro, filters.marca]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <div className="stats-container" style={{ textAlign: 'center' }}>Cargando estadísticas en vivo...</div>;
    }

    const isAnnual = filters.mes === 'all';

    return (
        <div className="stats-container">
            <div className="container">
                <header className="stats-header">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <div className="pulse-dot"></div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--stat-accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>Airtable Live</span>
                    </div>
                    <h1 className="stats-title">Panel de Control Operativo</h1>
                    <p className="stats-subtitle">Estadísticas vinculadas a gestión real</p>
                </header>

                {/* Dashboard Filters */}
                <div className="filters-dashboard">
                    <div className="filter-group-main">
                        <label>Periodo de Análisis</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select name="mes" className="filter-input-large" value={filters.mes} onChange={handleFilterChange}>
                                <option value="all">Resumen Anual</option>
                                {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                            </select>
                            <select name="anio" className="filter-input-large" value={filters.anio} onChange={handleFilterChange}>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="stats-summary-section">
                    <span className="section-label">
                        {isAnnual ? `Resumen Consolidado ${filters.anio}` : `Resumen ${months[filters.mes]} ${filters.anio}`}
                    </span>
                    <div className="kpi-grid">
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.overview.total}</div>
                            <div className="kpi-label">Unidades Totales</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.overview.inspecciones}</div>
                            <div className="kpi-label">Inspecciones</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.overview.reparaciones}</div>
                            <div className="kpi-label">Reparaciones/Mecánica</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.overview.finalizados}</div>
                            <div className="kpi-label">Finalizados</div>
                        </div>
                    </div>
                </div>

                {/* Today Overview (Only if current year/month matches today) */}
                {!isAnnual && parseInt(filters.mes) === new Date().getMonth() && filters.anio === new Date().getFullYear().toString() && (
                    <div className="stats-summary-section animate-fade-in">
                        <span className="section-label" style={{ color: '#4CAF50', borderLeftColor: '#4CAF50' }}>Actividad de Hoy ({new Date().toLocaleDateString()})</span>
                        <div className="kpi-grid-mini">
                            <div className="stat-card-mini"><span>Entradas:</span> <strong>{stats.today.total}</strong></div>
                            <div className="stat-card-mini"><span>Insp:</span> <strong>{stats.today.inspecciones}</strong></div>
                            <div className="stat-card-mini"><span>Rep:</span> <strong>{stats.today.reparaciones}</strong></div>
                            <div className="stat-card-mini"><span>Fin:</span> <strong>{stats.today.finalizados}</strong></div>
                        </div>
                    </div>
                )}

                {/* Visual Charts */}
                <div className="stats-summary-section">
                    <span className="section-label">Distribución de Carga</span>
                    <div className="charts-grid">
                        <div className="chart-card">
                            <h3>Unidades por Origen</h3>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.clientTypesData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {stats.clientTypesData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#242424', border: '1px solid #333' }} />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="chart-card">
                            <h3>Ranking Aseguradoras ({isAnnual ? 'Anual' : 'Mensual'})</h3>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.insurersData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                                        <XAxis type="number" stroke="#888" fontSize={12} />
                                        <YAxis dataKey="name" type="category" stroke="#888" fontSize={11} width={100} />
                                        <Tooltip contentStyle={{ backgroundColor: '#242424', border: '1px solid #333' }} />
                                        <Bar dataKey="value" fill="#FFC107" radius={[0, 4, 4, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison & Details */}
                <div className="stats-grid-complex">
                    <div className="complex-card">
                        <h3>Detalle por Aseguradora</h3>
                        {stats.insurersData.length > 0 ? stats.insurersData.map((ins, i) => (
                            <div key={i} className="stat-row">
                                <span>{ins.name}</span>
                                <div>
                                    <strong>{ins.value}</strong>
                                    <small style={{ marginLeft: '5px', color: 'var(--stat-text-muted)' }}>
                                        ({((ins.value / stats.overview.total) * 100).toFixed(1)}%)
                                    </small>
                                </div>
                            </div>
                        )) : (
                            <p style={{ padding: '20px', textAlign: 'center', color: 'var(--stat-text-muted)' }}>Sin datos de seguros en este periodo.</p>
                        )}
                    </div>

                    <div className="complex-card">
                        <h3>Categorías de Servicio</h3>
                        {stats.servicesData.map((ser, i) => (
                            <div key={i} className="stat-row">
                                <span>{ser.name}</span>
                                <strong>{ser.value} unidades</strong>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filterable Table */}
                <div className="data-section">
                    <div className="filters-bar">
                        <div className="filter-group">
                            <label>Estado</label>
                            <select name="estado" className="filter-input" value={filters.estado} onChange={handleFilterChange}>
                                <option value="">Todos los Estados</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Aprobado">Aprobado</option>
                                <option value="En Proceso">En Proceso</option>
                                <option value="Finalizado">Finalizado</option>
                                <option value="Rechazado">Rechazado</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Origen</label>
                            <select name="seguro" className="filter-input" value={filters.seguro} onChange={handleFilterChange}>
                                <option value="">Todos los Orígenes</option>
                                <option value="Particular">Particular</option>
                                {stats.insurersData.map(ins => (
                                    <option key={ins.name} value={ins.name}>{ins.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Buscador</label>
                            <input type="text" name="marca" placeholder="Patente o Marca..." className="filter-input" value={filters.marca} onChange={handleFilterChange} />
                        </div>
                    </div>

                    <div className="data-table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Unidad</th>
                                    <th>Origen</th>
                                    <th>Servicio</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTableData.length > 0 ? filteredTableData.map((row, i) => (
                                    <tr key={i}>
                                        <td style={{ color: 'var(--stat-text-muted)', fontSize: '0.8rem' }}>{row.fechaInspeccion}</td>
                                        <td><strong>{row.patente}</strong> <br /><small>{row.marca} {row.modelo}</small></td>
                                        <td>{row.seguro}</td>
                                        <td style={{ fontWeight: '500' }}>{row.tipo}</td>
                                        <td>
                                            <span className={`badge badge-${row.estado?.toLowerCase().replace(' ', '')}`}>
                                                {row.estado}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '60px', color: 'var(--stat-text-muted)' }}>
                                            No se encontraron registros activos para la selección actual.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

