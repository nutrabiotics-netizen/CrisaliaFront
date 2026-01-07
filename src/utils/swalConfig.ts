import Swal from 'sweetalert2';

// Configuración global para SweetAlert2 con los colores y fuentes de Crisal-IA
export const swalConfig = {
  // Configuración base para todos los alerts
  base: {
    customClass: {
      popup: 'font-poppins',
      title: 'font-ibrand text-crisal-azul',
      confirmButton: 'font-poppins-semibold',
      cancelButton: 'font-poppins-semibold'
    },
    confirmButtonColor: '#443c92',
    cancelButtonColor: '#6b7280',
    buttonsStyling: true,
    allowOutsideClick: false
  },

  // Toast para notificaciones rápidas
  toast: {
    toast: true,
    position: 'top-end' as const,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: 'font-poppins',
      title: 'font-poppins-semibold'
    }
  }
};

// Funciones helper para diferentes tipos de alertas
export const showSuccessToast = (message: string) => {
  return Swal.fire({
    ...swalConfig.toast,
    icon: 'success',
    title: '¡Éxito!',
    text: message
  });
};

export const showErrorToast = (message: string) => {
  return Swal.fire({
    ...swalConfig.toast,
    icon: 'error',
    title: 'Error',
    text: message,
    timer: 3000
  });
};

export const showInfoToast = (message: string) => {
  return Swal.fire({
    ...swalConfig.toast,
    icon: 'info',
    title: 'Información',
    text: message
  });
};

export const showWarningToast = (message: string) => {
  return Swal.fire({
    ...swalConfig.toast,
    icon: 'warning',
    title: 'Advertencia',
    text: message,
    timer: 3000
  });
};

export const showCopiedToast = (text: string) => {
  return Swal.fire({
    ...swalConfig.toast,
    icon: 'success',
    title: '¡Copiado!',
    text: text,
    timer: 1500
  });
};

// Función para confirmaciones
export const showConfirmDialog = async (
  title: string,
  text: string,
  confirmButtonText: string = 'Aceptar',
  cancelButtonText: string = 'Cancelar'
): Promise<boolean> => {
  const result = await Swal.fire({
    ...swalConfig.base,
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: '#443c92',
    cancelButtonColor: '#6b7280'
  });

  return result.isConfirmed;
};

// Función para solicitar motivo de cancelación
export const showCancelReasonDialog = async (
  title: string = 'Motivo de Cancelación',
  text: string = 'Por favor, indica el motivo de la cancelación'
): Promise<string | null> => {
  const { value } = await Swal.fire({
    ...swalConfig.base,
    icon: 'question',
    title,
    text,
    input: 'textarea',
    inputPlaceholder: 'Ej: Cambio de fecha, emergencia médica, etc.',
    inputAttributes: {
      'aria-label': 'Motivo de cancelación'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirmar Cancelación',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    inputValidator: (value) => {
      if (!value || value.trim() === '') {
        return 'Debes ingresar un motivo de cancelación';
      }
      if (value.trim().length < 10) {
        return 'El motivo debe tener al menos 10 caracteres';
      }
      return null;
    }
  });

  return value || null;
};

// Exportar Swal para uso directo cuando sea necesario
export { Swal };
