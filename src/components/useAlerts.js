import Swal from 'sweetalert2';

export const useAlerts = () => {

    const showConfirmAlert = (title, text, confirmButtonText, cancelButtonText) => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
        }).then((result) => {
            return result.isConfirmed;
        });
    };

    const showSuccessAlert = (title, text) => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            return result.isConfirmed;
        })
    }

    const showErrorAlert = (title, text) => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            confirmButtonText: 'OK'
        }).then((result) => {
            return result.isConfirmed;
        })
    }

    const showInfoAlert = (title, text) => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'info',
            confirmButtonText: 'OK'
        }).then((result) => {
            return result.isConfirmed;
        })
    }

    const showQuestionAlert = (title, text, confirmButtonText, cancelButtonText, confirmAction) => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        }).then((result) => {
            return result.isConfirmed;
        })
    }

    const showLoading = (title) => {
        Swal.fire({
            title: title,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
    }

    const closeLoading = () => {
        Swal.close()
    }

    const showLoginSuccessToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Ha iniciado sesión correctamente'
        })
    }

    const showLoginErrorToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Ha habido un error al iniciar sesión'
        })
    }

    const showLogoutSuccessToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Ha cerrado sesión correctamente'
        })
    }

    return {
        showConfirmAlert,
        showSuccessAlert,
        showErrorAlert,
        showInfoAlert,
        showQuestionAlert,
        showLoading,
        closeLoading,
        showLoginSuccessToast,
        showLoginErrorToast,
        showLogoutSuccessToast
    }
}