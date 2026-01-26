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

const COLORS = ['#FFC107', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0'];

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

        // Polling for live updates every 5 minutes
        const interval = setInterval(loadData, 300000);
        return () => clearInterval(interval);
    }, []);

    const calculateAdvancedStats = (records) => {
        const today = new Date().toISOString().split('T')[0];

        const counts = {
            today: {
                total: 0,
                inspecciones: 0,
                reparaciones: 0,
                finalizados: 0
            },
            monthly: {
                total: records.length,
                inspecciones: records.filter(r => r.tipo === 'Inspección').length,
                reparaciones: records.filter(r => r.tipo?.includes('Reparación') || r.tipo?.includes('Mecánica') || r.tipo?.includes('Chapa')).length,
                finalizados: records.filter(r => r.estado === 'Finalizado').length,
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
            if (r.fechaInspeccion === today) {
                counts.today.total++;
                if (r.tipo === 'Inspección') counts.today.inspecciones++;
                if (r.tipo?.includes('Reparación')) counts.today.reparaciones++;
                if (r.estado === 'Finalizado') counts.today.finalizados++;
            }

            if (r.seguro && r.seguro !== 'Particular') {
                counts.insurers[r.seguro] = (counts.insurers[r.seguro] || 0) + 1;
            }
        });

        return counts;
    };

    const annualData = useMemo(() => {
        return data.filter(r => new Date(r.fechaInspeccion).getFullYear().toString() === filters.anio);
    }, [data, filters.anio]);

    const currentMonthData = useMemo(() => {
        if (filters.mes === 'all') return annualData;
        return annualData.filter(r => new Date(r.fechaInspeccion).getMonth().toString() === filters.mes);
    }, [annualData, filters.mes]);

    const stats = useMemo(() => calculateAdvancedStats(currentMonthData), [currentMonthData]);

    const filteredData = useMemo(() => {
        let result = currentMonthData;
        if (filters.estado) result = result.filter(r => r.estado === filters.estado);
        if (filters.seguro) result = result.filter(r => r.seguro === filters.seguro);
        if (filters.marca) result = result.filter(r =>
            r.marca && r.marca.toLowerCase().includes(filters.marca.toLowerCase())
        );
        return result;
    }, [currentMonthData, filters.estado, filters.seguro, filters.marca]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <div className="stats-container" style={{ textAlign: 'center' }}>Cargando estadísticas en vivo...</div>;
    }

    return (
        <div className="stats-container">
            <div className="container">
                <header className="stats-header">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <div className="pulse-dot"></div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--stat-accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>Datos en Vivo</span>
                    </div>
                    <h1 className="stats-title">Panel de Control Operativo</h1>
                    <p className="stats-subtitle">Estadísticas frescas por día y por mes</p>
                </header>

                {/* Daily Overview */}
                <div className="stats-summary-section">
                    <span className="section-label">Actividad de Hoy ({new Date().toLocaleDateString()})</span>
                    <div className="kpi-grid">
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.today.total}</div>
                            <div className="kpi-label">Ingresos Hoy</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.today.inspecciones}</div>
                            <div className="kpi-label">Inspecciones Hoy</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.today.reparaciones}</div>
                            <div className="kpi-label">Reparaciones Hoy</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.today.finalizados}</div>
                            <div className="kpi-label">Finalizados Hoy</div>
                        </div>
                    </div>
                </div>

                {/* Interactive Charts Section */}
                <div className="stats-summary-section">
                    <span className="section-label">Gráficos de Tendencia</span>
                    <div className="charts-grid">
                        <div className="chart-card">
                            <h3>Origen de Clientes</h3>
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
                            <h3>Distribución de Servicios</h3>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.servicesData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis dataKey="name" stroke="#888" fontSize={12} />
                                        <YAxis stroke="#888" fontSize={12} />
                                        <Tooltip contentStyle={{ backgroundColor: '#242424', border: '1px solid #333' }} />
                                        <Bar dataKey="value" fill="#FFC107" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Analysis */}
                <div className="stats-summary-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
                        <span className="section-label">Análisis Mensual: {filters.mes === 'all' ? filters.anio : months[filters.mes]}</span>
                        <div className="filters-inline">
                            <select name="mes" className="filter-input" value={filters.mes} onChange={handleFilterChange}>
                                <option value="all">Todo el año</option>
                                {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                            </select>
                            <select name="anio" className="filter-input" value={filters.anio} onChange={handleFilterChange}>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                            </select>
                        </div>
                    </div>

                    <div className="stats-grid-complex">
                        <div className="complex-card">
                            <h3>Operaciones Mensuales</h3>
                            <div className="stat-row"><span>Total Mes:</span> <strong>{stats.monthly.total}</strong></div>
                            <div className="stat-row"><span>Inspecciones:</span> <strong>{stats.monthly.inspecciones}</strong></div>
                            <div className="stat-row"><span>Reparaciones:</span> <strong>{stats.monthly.reparaciones}</strong></div>
                            <div className="stat-row"><span>Finalizados:</span> <strong>{stats.monthly.finalizados}</strong></div>
                        </div>

                        <div className="complex-card">
                            <h3>Detalle de Servicios</h3>
                            {stats.servicesData.map(s => (
                                <div key={s.name} className="stat-row"><span>{s.name}:</span> <strong>{s.value}</strong></div>
                            ))}
                        </div>

                        <div className="complex-card">
                            <h3>Origen de Clientes</h3>
                            {stats.clientTypesData.map(c => (
                                <div key={c.name} className="stat-row"><span>{c.name}:</span> <strong>{c.value}</strong></div>
                            ))}
                            <div style={{ marginTop: '15px' }}>
                                <small style={{ color: 'var(--stat-text-muted)', textTransform: 'uppercase' }}>Por Aseguradora:</small>
                                {Object.entries(stats.insurers).map(([name, count]) => (
                                    <div key={name} className="stat-row-mini"><span>{name}:</span> <span>{count}</span></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="filters-bar">
                    <div className="filter-group">
                        <label>Estado</label>
                        <select name="estado" className="filter-input" value={filters.estado} onChange={handleFilterChange}>
                            <option value="">Todos</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Aprobado">Aprobado</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Origen/Seguro</label>
                        <select name="seguro" className="filter-input" value={filters.seguro} onChange={handleFilterChange}>
                            <option value="">Todos</option>
                            <option value="Particular">Particular</option>
                            <option value="La Caja">La Caja</option>
                            <option value="Fed. Patronal">Fed. Patronal</option>
                            <option value="Mapfre">Mapfre</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Buscar Vehículo</label>
                        <input type="text" name="marca" placeholder="Patente o Marca..." className="filter-input" value={filters.marca} onChange={handleFilterChange} />
                    </div>
                </div>

                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Vehículo</th>
                                <th>Origen</th>
                                <th>Servicio</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? filteredData.map((row, i) => (
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
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No hay registros coincidentes.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
