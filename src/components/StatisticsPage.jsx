import React, { useState, useEffect, useMemo } from 'react';
import { dataService } from '../services/dataService';
import './StatisticsPage.css';

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const MOCK_RECORDS = [
    { id: 1, patente: 'ABC 123', cliente: 'Juan Perez', marca: 'Toyota', modelo: 'Corolla', seguro: 'La Caja', estado: 'Finalizado', precioBase: 150000, calificacionCliente: 5, fechaInspeccion: '2026-01-10', tipo: 'Reparación' },
    { id: 2, patente: 'XYZ 789', cliente: 'Maria Garcia', marca: 'Ford', modelo: 'Fiesta', seguro: 'Fed. Patronal', estado: 'Pendiente', precioBase: 85000, calificacionCliente: 4, fechaInspeccion: '2026-01-15', tipo: 'Inspección' },
    { id: 3, patente: 'AA 111 BB', cliente: 'Carlos Ruiz', marca: 'Honda', modelo: 'Civic', seguro: 'Sura', estado: 'Aprobado', precioBase: 120000, calificacionCliente: 5, fechaInspeccion: '2026-01-05', tipo: 'Presupuesto' },
    { id: 4, patente: 'MM 555 NN', cliente: 'Lucia Lopez', marca: 'Fiat', modelo: 'Cronos', seguro: 'San Cristobal', estado: 'Rechazado', precioBase: 200000, calificacionCliente: 3, fechaInspeccion: '2025-12-20', tipo: 'Reparación' },
    { id: 5, patente: 'BB 222 CC', cliente: 'Pedro Gomez', marca: 'VW', modelo: 'Golf', seguro: 'Mapfre', estado: 'En Proceso', precioBase: 350000, calificacionCliente: 4, fechaInspeccion: '2026-01-18', tipo: 'Reparación' },
    { id: 6, patente: 'CC 333 DD', cliente: 'Ana Weiss', marca: 'Peugeot', modelo: '208', seguro: 'Allianz', estado: 'Pendiente', precioBase: 90000, calificacionCliente: 5, fechaInspeccion: '2026-01-02', tipo: 'Inspección' },
];

export default function StatisticsPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        estado: '',
        seguro: '',
        marca: '',
        mes: 'all', // Default to all year
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
    }, []);

    const calculateTotals = (records) => {
        return {
            inspecciones: records.filter(r => r.tipo === 'Inspección').length,
            reparaciones: records.filter(r => r.tipo === 'Reparación').length,
            presupuestos: records.filter(r => r.tipo === 'Presupuesto').length,
            total: records.length,
            income: records.filter(r => r.estado !== 'Rechazado').reduce((acc, curr) => acc + (curr.precioBase || 0), 0)
        };
    };

    // Annual Stats (Filtered by Year)
    const annualData = useMemo(() => {
        return data.filter(r => new Date(r.fechaInspeccion).getFullYear().toString() === filters.anio);
    }, [data, filters.anio]);

    const annualTotals = useMemo(() => calculateTotals(annualData), [annualData]);

    // Monthly Data (Filtered by Month and Year)
    const monthlyData = useMemo(() => {
        if (filters.mes === 'all') return annualData;
        return annualData.filter(r => new Date(r.fechaInspeccion).getMonth().toString() === filters.mes);
    }, [annualData, filters.mes]);

    const monthlyTotals = useMemo(() => calculateTotals(monthlyData), [monthlyData]);

    // Final Filtered Data for Table (includes all active filters)
    const filteredData = useMemo(() => {
        let result = monthlyData;
        if (filters.estado) result = result.filter(r => r.estado === filters.estado);
        if (filters.seguro) result = result.filter(r => r.seguro === filters.seguro);
        if (filters.marca) result = result.filter(r =>
            r.marca && r.marca.toLowerCase().includes(filters.marca.toLowerCase())
        );
        return result;
    }, [monthlyData, filters.estado, filters.seguro, filters.marca]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
    };

    if (loading) {
        return <div className="stats-container" style={{ textAlign: 'center' }}>Cargando estadísticas...</div>;
    }

    return (
        <div className="stats-container">
            <div className="container">
                <header className="stats-header">
                    <h1 className="stats-title">Panel de Control Operativo</h1>
                    <p className="stats-subtitle">Gestión estratégica de reparaciones e inspecciones</p>
                </header>

                {/* Annual Summary */}
                <div className="stats-summary-section">
                    <span className="section-label">Resumen Anual {filters.anio}</span>
                    <div className="kpi-grid">
                        <div className="kpi-card">
                            <div className="kpi-value">{annualTotals.presupuestos}</div>
                            <div className="kpi-label">Consultas Anuales</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{annualTotals.inspecciones}</div>
                            <div className="kpi-label">Inspecciones Totales</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{annualTotals.reparaciones}</div>
                            <div className="kpi-label">Reparaciones Realizadas</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-value">{formatCurrency(annualTotals.income)}</div>
                            <div className="kpi-label">Facturación Estimada</div>
                        </div>
                    </div>
                </div>

                {/* Monthly Summary & Filters */}
                <div className="stats-summary-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
                        <span className="section-label" style={{ marginBottom: 0 }}>Análisis Mensual</span>
                        <div className="filters-inline" style={{ display: 'flex', gap: '10px' }}>
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

                    <div className="kpi-grid">
                        <div className="kpi-card">
                            <div className="kpi-value" style={{ fontSize: '1.8rem' }}>
                                {filters.mes === 'all' ? `Consolidado ${filters.anio}` : months[filters.mes]}
                            </div>
                            <div className="kpi-label">Mes Seleccionado</div>
                            <div className="monthly-stats-grid">
                                <div className="stat-item">
                                    <span className="stat-item-value">{monthlyTotals.presupuestos}</span>
                                    <span className="stat-item-label">Presup.</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-item-value">{monthlyTotals.inspecciones}</span>
                                    <span className="stat-item-label">Insp.</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-item-value">{monthlyTotals.reparaciones}</span>
                                    <span className="stat-item-label">Repar.</span>
                                </div>
                            </div>
                        </div>
                        <div className="kpi-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div className="kpi-value" style={{ color: '#fff' }}>{formatCurrency(monthlyTotals.income)}</div>
                            <div className="kpi-label">Ingreso del Mes</div>
                        </div>
                    </div>
                </div>

                {/* Granular Filters & Table */}
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
                        <label>Seguro</label>
                        <select name="seguro" className="filter-input" value={filters.seguro} onChange={handleFilterChange}>
                            <option value="">Todos</option>
                            <option value="La Caja">La Caja</option>
                            <option value="Fed. Patronal">Fed. Patronal</option>
                            <option value="Sura">Sura</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Marca</label>
                        <input type="text" name="marca" placeholder="Buscar vehículo..." className="filter-input" value={filters.marca} onChange={handleFilterChange} />
                    </div>
                </div>

                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Patente</th>
                                <th>Vehículo</th>
                                <th>Tipo</th>
                                <th>Presupuesto</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? filteredData.map((row, i) => (
                                <tr key={i}>
                                    <td style={{ color: 'var(--stat-text-muted)', fontSize: '0.85rem' }}>{row.fechaInspeccion}</td>
                                    <td><strong>{row.patente}</strong></td>
                                    <td>{row.marca} {row.modelo}</td>
                                    <td style={{ fontWeight: '600' }}>{row.tipo}</td>
                                    <td>{formatCurrency(row.precioBase)}</td>
                                    <td>
                                        <span className={`badge badge-${row.estado?.toLowerCase().replace(' ', '')}`}>
                                            {row.estado}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>No hay registros para este período.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
