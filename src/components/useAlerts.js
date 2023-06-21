import Swal from 'sweetalert2';

export const useAlerts = () => {

    const showConfirmAlert = (title, text, icon, confirmButtonText, cancelButtonText) => {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon,
            allowOutsideClick: true,
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
            title: 'Bienvenid@, no olvides cerrar sesión al salir'
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
            title: 'Verifique sus datos de acceso'
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
            title: 'Adiós, vuelve pronto 👋'
        })
    }


    const showToast = (icon, title, position, miliseconds, bg) => {
        if(miliseconds === undefined || miliseconds === null){
            miliseconds = 3000;
        }
        if(position === undefined || position === null){
            position = 'top-end';
        }
        const Toast = Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            background: bg,
            timer: miliseconds,
            timerProgressBar: true,
            grow: 'row',
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: icon,
            title: title
        })
    }

    const showLoadingToast = (title) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            grow: 'false',
            timerProgressBar: true,
        })

        Toast.fire({
            title: title,
            didOpen: () => {
                Swal.showLoading()
            }
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
        showLogoutSuccessToast,
        showToast,
        showLoadingToast
    }
}