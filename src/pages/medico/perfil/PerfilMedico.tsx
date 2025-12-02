import { useState, useEffect } from 'react';
import { Medico } from '../../../types';
import { api } from '../../../services/api';

const PerfilMedico = () => {
  const [medico, setMedico] = useState<Medico | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implementar carga del perfil médico
    // const loadPerfil = async () => {
    //   try {
    //     const data = await api.get<Medico>('/medico/perfil');
    //     setMedico(data);
    //   } catch (error) {
    //     console.error('Error al cargar perfil:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // loadPerfil();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-crisal-turquesa border-crisal-azul mb-4"></div>
          <p className="font-poppins text-crisal-azul">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-ibrand text-xl">PM</span>
          </div>
          <div>
            <h1 className="text-3xl font-ibrand text-crisal-azul">Perfil Médico</h1>
            <p className="font-poppins text-crisal-azul opacity-70 mt-1">Gestiona tu información profesional</p>
          </div>
        </div>
        <div className="border-t border-crisal-gris pt-6">
          <p className="font-poppins text-crisal-azul">Formulario de perfil médico en desarrollo...</p>
        </div>
      </div>
    </div>
  );
};

export default PerfilMedico;

