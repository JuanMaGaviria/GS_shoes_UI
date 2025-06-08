import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import api from '../../../services/api';

// // Datos simulados para el dashboard
// const inventarioData = {
//   // Artículos con stock bajo
//   stockBajo: [
//     { codigo: '#001', nombre: 'Nike Air Max 270', stock: 15, umbral: 20, porcentaje: 75, estado: 'critico' },
//     { codigo: '#002', nombre: 'Adidas Ultraboost', stock: 8, umbral: 15, porcentaje: 53, estado: 'medio' },
//     { codigo: '#003', nombre: 'Converse Chuck Taylor', stock: 12, umbral: 25, porcentaje: 48, estado: 'medio' },
//     { codigo: '#004', nombre: 'Vans Old Skool', stock: 5, umbral: 20, porcentaje: 25, estado: 'critico' },
//     { codigo: '#005', nombre: 'Nike Air Force 1', stock: 18, umbral: 30, porcentaje: 60, estado: 'medio' },
//     { codigo: '#006', nombre: 'Adidas Stan Smith', stock: 22, umbral: 35, porcentaje: 63, estado: 'medio' }
//   ],
  
//   // Datos para gráfica de tendencias de ventas
//   ventasTendencia: ,
// }

export default function Inicio() {
  const [inventarioData, setInventarioData] = useState({
    stockBajo: [],
    ventasTendencia: [
          { mes: 'Ene', ventas: 45, inventario: 320 },
          { mes: 'Feb', ventas: 52, inventario: 298 },
          { mes: 'Mar', ventas: 48, inventario: 315 },
          { mes: 'Abr', ventas: 61, inventario: 289 },
          { mes: 'May', ventas: 55, inventario: 305 },
          { mes: 'Jun', ventas: 67, inventario: 278 }
        ],
  });

  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleNavigateHome = () => {
    // Aquí puedes implementar la navegación según tu router
    console.log('Navegando al inicio');
  };


  // Función para obtener el color de la barra de progreso
  const getProgressColor = (porcentaje) => {
    if (porcentaje <= 30) return '#FF4757';
    if (porcentaje <= 60) return '#FFA502';
    return '#2ED573';
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="mb-4">
        <span className='breadcrum flex items-center text-gray-600'>
          <svg 
            style={{ cursor: 'pointer' }} 
            onClick={handleNavigateHome} 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" fillOpacity=".25" d="M5 14.059c0-1.01 0-1.514.222-1.945c.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601c.32 0 .601.2 1.162.601l4.163 2.973c.821.587 1.232.88 1.453 1.311c.222.43.222.935.222 1.944V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19z" />
            <path fill="currentColor" d="M3 12.387c0 .266 0 .4.084.441c.084.041.19-.04.4-.205l7.288-5.668c.59-.459.885-.688 1.228-.688c.343 0 .638.23 1.228.688l7.288 5.668c.21.164.316.246.4.205c.084-.041.084-.175.084-.441v-.409c0-.48 0-.72-.102-.928c-.101-.208-.291-.356-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688c-.343 0-.638.23-1.228.688l-7 5.445c-.379.294-.569.442-.67.65c-.102.208-.102.448-.102.928zM12.5 15h-1a2 2 0 0 0-2 2v3.85c0 .083.067.15.15.15h4.7a.15.15 0 0 0 .15-.15V17a2 2 0 0 0-2-2" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="mx-2">
            <path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z" />
          </svg>
          <span>Dashboard Inventario</span>
        </span>
      </div>

      <div className="bg-white cont_principal rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="gloria flex items-center font-semibold text-2xl" style={{ color: '#1a1a1a' }}>
            <span style={{ color: '#F09ECB' }}>D</span>ashboard de inventario
          </h1>
          <span className='text-sm text-gray-600 mt-2 block'>
            Panel de control para monitoreo de inventario de calzado
          </span>
        </div>

        {/* Alertas de Stock Bajo */}
      
        <div className="p-6" style={{padding: '24px'}}>
          {inventarioData.stockBajo.length > 0 && (
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 rounded" style={{padding: '16px', marginBottom: '24px'}}>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-orange-800 font-medium">Artículos por debajo del umbral permitido</span>
            </div>
          </div>
          )}

          {/* Grid de productos con stock bajo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" style={{ marginBottom: '32px' }}>
            {inventarioData.stockBajo.length === 0 ? (
              <div className="col-span-full text-center text-sm text-gray-600 p-4 bg-green-50 border border-green-200 rounded">
                <svg className="w-5 h-5 inline-block mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Todos los artículos están por encima del umbral mínimo de stock.
              </div>
            ) : (
              inventarioData.stockBajo.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm" style={{ padding: '16px' }}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <span className="text-xs text-gray-500 font-medium">{item.codigo}</span>
                      <h3 className="text-sm font-semibold text-gray-800 mt-1">{item.nombre}</h3>
                      <p className="text-xs text-gray-600 mt-1">Stock actual: {item.stock} / Umbral: {item.umbral}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.estado === 'critico' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.porcentaje}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${item.porcentaje}%`,
                        backgroundColor: getProgressColor(item.porcentaje)
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Gráficas de análisis */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6" style={{ marginBottom: '24px' }}>Gráficas de análisis</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfica de tendencias */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm" style={{ padding: '24px' }}>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Tendencia de Ventas vs Inventario</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={inventarioData.ventasTendencia}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="inventario" 
                    stroke="#4ECDC4" 
                    fill="#4ECDC4" 
                    fillOpacity={0.1}
                    name="Inventario"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="#FF6B6B" 
                    fill="#FF6B6B" 
                    fillOpacity={0.2}
                    name="Ventas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>


          {/* Resumen estadístico */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8" style={{ marginTop: '32px' }}>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg" style={{ padding: '24px' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Productos</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <div className="text-blue-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg" style={{ padding: '24px' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Stock Disponible</p>
                  <p className="text-2xl font-bold">8,456</p>
                </div>
                <div className="text-green-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg" style={{ padding: '24px' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Stock Bajo</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <div className="text-yellow-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg" style={{ padding: '24px' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Valor Inventario</p>
                  <p className="text-2xl font-bold">$2.8M</p>
                </div>
                <div className="text-purple-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}