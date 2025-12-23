import Swal, { type SweetAlertOptions, type SweetAlertResult } from 'sweetalert2'

export function useSwal() {
  const showAlert = async (options: SweetAlertOptions): Promise<SweetAlertResult> => {
    return await Swal.fire(options)
  }
  const showSuccess = async (message: string): Promise<SweetAlertResult> => {
    return await showAlert({
      icon: 'success',
      title: 'Success',
      text: message,
      position: 'center',
      showConfirmButton: false,
      timer: 1500,
    })
  }
  const showError = async (message: string): Promise<SweetAlertResult> => {
    return await showAlert({
      icon: 'error',
      title: 'Error Encountered!',
      text: message,
      position: 'center',
      showConfirmButton: false,
      timer: 1500,
    })
  }
  const showConfirm = async (message: string): Promise<SweetAlertResult> => {
    return await showAlert({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
  }
  return { showSuccess, showError, showConfirm }
}
