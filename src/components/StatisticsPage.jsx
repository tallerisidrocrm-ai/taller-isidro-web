import React, { useState, useEffect, useMemo } from 'react';
import { dataService } from '../services/dataService';
import SEO from './SEO';
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
    { id: 1, patente: 'ABC 123', cliente: 'Juan Perez', marca: 'Toyota', modelo: 'Corolla', seguro: 'Particular', estado: 'Pendiente', precioBase: 150000, calificacionCliente: 5, fechaInspeccion: new Date().toISOString().split('T')[0], tipo: 'Presupuesto' },
    { id: 2, patente: 'XYZ 789', cliente: 'Maria Garcia', marca: 'Ford', modelo: 'Fiesta', seguro: 'Fed. Patronal', estado: 'Inspecion', precioBase: 85000, calificacionCliente: 4, fechaInspeccion: new Date().toISOString().split('T')[0], tipo: 'Inspección' },
    { id: 3, patente: 'AA 111 BB', cliente: 'Carlos Ruiz', marca: 'Honda', modelo: 'Civic', seguro: 'Particular', estado: 'Aprobado', precioBase: 120000, calificacionCliente: 5, fechaInspeccion: new Date().toISOString().split('T')[0], tipo: 'Reparación' },
];

export default function StatisticsPage() {
    console.log("StatisticsPage v1.0.4 loaded - Debug Check");
    const [data, setData] = useState([]);
    const [summaryPeriod, setSummaryPeriod] = useState('monthly'); // 'daily', 'monthly', 'annual'
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
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
                    setFetchError(null);
                } else if (records === null) {
                    setFetchError('Error de conexión con el servidor de datos (CORS o Red).');
                    setData(MOCK_RECORDS);
                } else {
                    setData(records || []);
                    setFetchError(null);
                }
            } catch {
                setFetchError('Error al procesar los datos.');
                setData(MOCK_RECORDS);
            } finally {
                setLoading(false);
            }
        };
        loadData();

        const interval = setInterval(loadData, 30000); // Polling 30 seconds for live updates
        return () => clearInterval(interval);
    }, []);

    const stats = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        const currentMonth = filters.mes;
        const currentYear = filters.anio;

        const getPeriodData = (period) => {
            if (period === 'daily') {
                return data.filter(r => r.fechaInspeccion === today);
            }
            if (period === 'monthly') {
                return data.filter(r => {
                    const d = new Date(r.fechaInspeccion);
                    return d.getMonth().toString() === currentMonth && d.getFullYear().toString() === currentYear;
                });
            }
            if (period === 'annual') {
                return data.filter(r => new Date(r.fechaInspeccion).getFullYear().toString() === currentYear);
            }
            return data;
        };

        const targetData = getPeriodData(summaryPeriod);

        // Precise mapping aligned with USER's Airtable values
        const categories = {
            'En Reparación': { count: 0, revenue: 0 },
            'Presupuesto': { count: 0, revenue: 0 },
            'Inspección': { count: 0, revenue: 0 },
            'Finalizado': { count: 0, revenue: 0 },
            'Turno Asignado': { count: 0, revenue: 0 },
            'Pendiente de Repuesto': { count: 0, revenue: 0 },
            'Inspección final': { count: 0, revenue: 0 },
            'Sin estado definido': { count: 0, revenue: 0 }
        };

        targetData.forEach(r => {
            const estado = (r.estado || '').trim();
            const precio = Number(r.precioBase) || 0;

            // Match exact strings from Airtable
            if (estado === 'En Reparacion' || estado === 'En Reparación' || estado === 'En Proceso' || estado === 'Aprobado') {
                categories['En Reparación'].count++;
                categories['En Reparación'].revenue += precio;
            } else if (estado === 'Presupuesto' || estado.toLowerCase().includes('presupuesto')) {
                categories['Presupuesto'].count++;
                categories['Presupuesto'].revenue += precio;
            } else if (estado === 'Inspecion' || estado === 'Inspección' || estado.toLowerCase().includes('inspeccion') || estado.toLowerCase().includes('inspec')) {
                categories['Inspección'].count++;
                categories['Inspección'].revenue += precio;
            } else if (estado === 'Turno Asignado') {
                categories['Turno Asignado'].count++;
                categories['Turno Asignado'].revenue += precio;
            } else if (estado === 'Pendiente de Repuesto') {
                categories['Pendiente de Repuesto'].count++;
                categories['Pendiente de Repuesto'].revenue += precio;
            } else if (estado === 'Inspeccion final') {
                categories['Inspección final'].count++;
                categories['Inspección final'].revenue += precio;
            } else if (estado.toLowerCase() === 'finalizado' || estado.toLowerCase().includes('entregado')) {
                categories['Finalizado'].count++;
                categories['Finalizado'].revenue += precio;
            } else {
                categories['Sin estado definido'].count++;
                categories['Sin estado definido'].revenue += precio;
            }
        });

        // Consistency fix: Ensure todayStats uses the exact same logic as the main categories
        const todayData = data.filter(r => r.fechaInspeccion === today);
        const getStatsForSet = (resultSet) => {
            const tempCats = { insp: 0, rep: 0, pres: 0 };
            resultSet.forEach(r => {
                const est = (r.estado || '').trim();
                const estLower = est.toLowerCase();

                if (est === 'Inspecion' || estLower.includes('inspeccion') || estLower.includes('inspec')) tempCats.insp++;
                else if (est === 'En Reparacion' || estLower.includes('reparaci') || estLower === 'en proceso' || estLower === 'aprobado') tempCats.rep++;
                else if (estLower.includes('presupuesto')) tempCats.pres++;
            });
            return tempCats;
        };

        const todaySummary = getStatsForSet(todayData);

        // Insurer breakdown
        const insurers = {};
        targetData.forEach(r => {
            if (r.seguro && r.seguro !== 'Particular' && r.seguro !== 'S/D' && r.seguro !== 'N/A') {
                insurers[r.seguro] = (insurers[r.seguro] || 0) + 1;
            }
        });

        const insurersData = Object.entries(insurers)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        const originsData = [
            { name: 'Particulares', value: targetData.filter(r => r.seguro?.toLowerCase() === 'particular').length },
            ...insurersData
        ].filter(o => o.value > 0);

        const todayStats = {
            total: todayData.length,
            inspecciones: todaySummary.insp,
            reparaciones: todaySummary.rep,
            presupuestos: todaySummary.pres,
        };

        console.log("Categories:", categories);
        console.log("Insurers Data:", insurersData);
        console.log("Origins Data:", originsData);
        console.log("Today Stats:", todayStats);
        console.groupEnd();

        return {
            total: targetData.length,
            categories,
            insurersData,
            originsData,
            targetData,
            today: todayStats
        };
    }, [data, filters.mes, filters.anio, summaryPeriod]);

    const filteredTableData = useMemo(() => {
        let result = stats.targetData;
        if (filters.estado) result = result.filter(r => r.estado === filters.estado);
        if (filters.seguro) result = result.filter(r => r.seguro === filters.seguro);
        if (filters.marca) result = result.filter(r =>
            (r.marca && r.marca.toLowerCase().includes(filters.marca.toLowerCase())) ||
            (r.patente && r.patente.toLowerCase().includes(filters.marca.toLowerCase()))
        );
        return result.sort((a, b) => new Date(b.fechaInspeccion) - new Date(a.fechaInspeccion));
    }, [stats.targetData, filters.estado, filters.seguro, filters.marca]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <div className="stats-container" style={{ textAlign: 'center' }}>Cargando estadísticas en vivo...</div>;
    }

    const isAnnual = summaryPeriod === 'annual';

    return (
        <div className="stats-container">
            <SEO
                title="Estadísticas en Vivo"
                description="Panel de Control de Taller Isidro: Monitoreo en tiempo real de reparaciones, inspecciones y rendimiento operativo."
                image="/statistics-preview.png"
                noindex={false}
            />
            <div className="container">
                <header className="stats-header">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <div className="pulse-dot"></div>
                        <span style={{ fontSize: '0.8rem', color: '#00ff00', textTransform: 'uppercase', letterSpacing: '2px' }}>Airtable Live (v1.0.3)</span>
                    </div>
                    <h1 className="stats-title">Panel de Control Operativo</h1>
                    <p className="stats-subtitle">Gestión de unidades y reportes en tiempo real</p>

                    {fetchError && (
                        <div style={{
                            background: 'rgba(211, 47, 47, 0.1)',
                            color: '#D32F2F',
                            padding: '10px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            border: '1px solid #D32F2F',
                            fontSize: '0.9rem'
                        }}>
                            ⚠️ {fetchError} - Mostrando datos de respaldo.
                        </div>
                    )}
                </header>

                {/* Dashboard Period Tabs */}
                <div className="summary-tabs">
                    <button
                        className={`tab-btn ${summaryPeriod === 'daily' ? 'active' : ''}`}
                        onClick={() => setSummaryPeriod('daily')}
                    >Hoy</button>
                    <button
                        className={`tab-btn ${summaryPeriod === 'monthly' ? 'active' : ''}`}
                        onClick={() => setSummaryPeriod('monthly')}
                    >Mensual</button>
                    <button
                        className={`tab-btn ${summaryPeriod === 'annual' ? 'active' : ''}`}
                        onClick={() => setSummaryPeriod('annual')}
                    >Acumulado Anual</button>
                </div>

                {/* Period Selection Filters (Secondary) */}
                <div className="filters-dashboard-mini">
                    <div className="filter-group-row">
                        <select name="mes" className="filter-select-sm" value={filters.mes} onChange={handleFilterChange}>
                            {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                        </select>
                        <select name="anio" className="filter-select-sm" value={filters.anio} onChange={handleFilterChange}>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="stats-summary-section">
                    <span className="section-label">
                        {summaryPeriod === 'daily' ? `Actividad Hoy (${new Date().toLocaleDateString()})` :
                            summaryPeriod === 'monthly' ? `Resumen ${months[filters.mes]} ${filters.anio}` :
                                `Acumulado Consolidado ${filters.anio}`}
                    </span>
                    <div className="kpi-grid">
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.total}</div>
                            <div className="kpi-label">Unidades Totales</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.categories['En Reparación'].count}</div>
                            <div className="kpi-label">En Reparación</div>
                            <div className="kpi-revenue">${stats.categories['En Reparación'].revenue.toLocaleString()}</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.categories['Presupuesto'].count}</div>
                            <div className="kpi-label">Presupuestos</div>
                            <div className="kpi-revenue">${stats.categories['Presupuesto'].revenue.toLocaleString()}</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{stats.categories['Finalizado'].count}</div>
                            <div className="kpi-label">Finalizados</div>
                            <div className="kpi-revenue">${stats.categories['Finalizado'].revenue.toLocaleString()}</div>
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
                            <div className="stat-card-mini"><span>Presup:</span> <strong>{stats.today.presupuestos}</strong></div>
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
                                            data={stats.originsData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {stats.originsData.map((entry, index) => (
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
                                        ({((ins.value / stats.total) * 100).toFixed(1)}%)
                                    </small>
                                </div>
                            </div>
                        )) : (
                            <p style={{ padding: '20px', textAlign: 'center', color: 'var(--stat-text-muted)' }}>Sin datos de seguros en este periodo.</p>
                        )}
                    </div>

                    <div className="complex-card">
                        <h3>Detalle por Estado (Airtable)</h3>
                        {Object.entries(stats.categories).map(([name, data], i) => (
                            <div key={i} className="stat-row">
                                <span>{name}</span>
                                <div>
                                    <strong>{data.count}</strong>
                                    <small style={{ marginLeft: '10px', color: 'var(--stat-success)' }}>
                                        ${data.revenue.toLocaleString()}
                                    </small>
                                </div>
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

